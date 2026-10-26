# Spec: Contact Form Protection (anti-bot, rate limit)

## Objective
Protect `POST /api/contact` (see `docs/spec-contact-email-api.md`) from spam bots and request floods so the Resend free quota (100 emails/day, 3,000/month) and the inbox stay usable for real visitors, without adding visible friction to the form.

## Context
- Host: **Vercel** (serverless). In-memory state does not survive between instances, so rate limiting needs an external store.
- Real risks, in order: quota exhaustion, inbox spam, Resend account reputation. Volumetric DDoS is the host's job (Vercel WAF), not this code's.
- The API key is server-side only, so the endpoint itself (open to any `curl`) is what needs guarding.
- Depends on: `spec-contact-email-api.md` tasks 1-3 done first (user decision: bump Next.js to a patched version before this feature).

## Decisions (settled, do not re-decide)
- **Layers**: honeypot + Cloudflare Turnstile + per-IP rate limit (Upstash). Not reCAPTCHA, not hCaptcha.
- **Turnstile UX**: invisible. Widget created in the Cloudflare dashboard as *Managed*, rendered with `appearance: "interaction-only"` so it only shows UI if Cloudflare decides the visitor is suspicious. Explicit rendering (`?render=explicit`) because the form lives in a client component and is replaced on success.
- **No wrapper library** for Turnstile; load `api.js` with `next/script` and call `turnstile.render` directly.
- **Rate limit**: `@upstash/ratelimit` + `@upstash/redis`, sliding window **3 requests / 1 hour / IP**, key prefix `contact`. IP from `x-forwarded-for` (first entry), fallback `x-real-ip`, fallback `"unknown"`.
- **Failure behavior**: Upstash unreachable or env vars absent -> **fail-open** (skip limit, `console.warn`). Turnstile token missing, invalid, expired, wrong `action`, or siteverify unreachable -> **fail-closed** (reject).
- **Honeypot**: hidden text input `website`, positioned off-screen (not `display:none`), `tabIndex={-1}`, `autoComplete="off"`, `aria-hidden`. If filled, the API returns `{ success: true }` **without sending**, so bots get no signal.
- **Check order in the route** (cheap first): parse -> honeypot -> field validation -> rate limit -> Turnstile siteverify -> Resend.
- **Turnstile action**: client sets `action: "contact"`, server rejects if `result.action !== "contact"`.
- **Subject injection**: strip `\r` and `\n` from `name` before it goes into the email subject.
- Error messages shown to the visitor stay generic (no internal detail). Status codes: 400 validation / bad token, 429 rate limited, 502 provider failure.

## Data shape
Request body to `POST /api/contact`:
```
{ name, email, message, website, turnstileToken }
```
- `website`: honeypot, must be empty for real users.
- `turnstileToken`: string from the widget callback, max 2048 chars (Cloudflare limit).

New env vars (add to `.env.example`, never commit real values):
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (client)
- `TURNSTILE_SECRET_KEY` (server only)
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (server only)

## Touch-points
- `app/api/contact/route.ts`: orchestrates the check order above.
- `lib/rate-limit.ts` (new): wraps Upstash, exposes `checkRateLimit(ip)`; owns fail-open logic.
- `lib/turnstile.ts` (new): `verifyTurnstile(token, ip)` calling siteverify with a timeout; owns fail-closed logic.
- `components/ContactSection.tsx`: honeypot input, Turnstile widget lifecycle, send `turnstileToken`, `turnstile.reset` after each attempt (tokens are single-use).
- `.env.example`, `README.md` (deploy checklist).

## Edge cases
- Token expires after 300 s while the visitor is still typing: widget fires `expired-callback`; clear stored token, re-render/reset; submit button shows a "verifying" state until a fresh token exists.
- Token is single-use: reset the widget after every submit, success or failure, otherwise the second attempt fails with `timeout-or-duplicate`.
- Visitor blocks third-party scripts (privacy extension): widget never loads, no token. Show a clear error ("Verification could not load, please refresh or email me directly") and keep the `mailto:` link visible in the left column.
- `localhost` must be an allowed hostname on the Turnstile widget, or use Cloudflare's testing keys for local dev.
- Mobile / reduced motion: widget is hidden unless interactive, nothing to adapt beyond not shifting layout when it appears (reserve no space; render it above the submit button).

## References
- Turnstile server validation: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/ (siteverify endpoint, `secret`/`response`/`remoteip`, error codes, 300 s single-use tokens, action/hostname checks)
- Turnstile embed (explicit rendering, `turnstile.render/reset/remove`, `appearance`, `expired-callback`): https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/
- Turnstile testing keys: https://developers.cloudflare.com/turnstile/troubleshooting/testing/
- `@upstash/ratelimit`: https://github.com/upstash/ratelimit-js (`Ratelimit.slidingWindow`, `Redis.fromEnv()`, `ratelimit.limit(id)`)
- Next.js in this repo (breaking-change version): `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/route.md`, `.../02-components/script.md`, `.../02-guides/environment-variables.md`
- Existing code: `app/api/contact/route.ts`, `components/ContactSection.tsx`

## Open questions
- Exact env var names injected by the Vercel Marketplace Upstash integration (`UPSTASH_REDIS_REST_*` vs `KV_REST_API_*`). Verify in the dashboard during task 2 and adjust `lib/rate-limit.ts` / `.env.example` to match; do not guess.

## Tasks
- [x] 1. Honeypot + subject sanitization: hidden `website` field in `ContactSection.tsx`, silent-success branch and newline stripping in `route.ts`. Done when: a request with `website` filled returns `{success:true}` and sends no email; a name containing `\n` produces a single-line subject.
- [x] 2. Per-IP rate limit: add `@upstash/ratelimit` + `@upstash/redis`, create `lib/rate-limit.ts`, wire into `route.ts` after validation, add env vars to `.env.example`. Done when: the 4th request within an hour from one IP gets 429 with a friendly message shown in the form's error banner; with Upstash env vars removed the form still works and a warning is logged.
- [x] 3. Turnstile end-to-end: create `lib/turnstile.ts`; in `ContactSection.tsx` load `api.js` with `next/script`, render the invisible widget, store the token, send `turnstileToken`, reset after each submit, handle expiry and script-blocked cases; `route.ts` verifies and rejects with 400 on failure. Done when: submit without a valid token is rejected, a normal submit (testing keys locally) succeeds and delivers email, and a second submit works (token reset).
- [x] 4. Deploy checklist: add a short section to `README.md` listing Vercel env vars, Turnstile hostname restriction to the production domain, enabling Vercel WAF / Bot Protection, and a post-deploy smoke test. Done when: the user has followed it once on the deployed site.
