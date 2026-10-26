# Spec: Contact Email API (Resend)

## Objective
Implement an API endpoint for sending emails via Resend and connect it to `ContactSection.tsx`, allowing visitors to send messages that land directly in the inbox (`fauzantaslim123@gmail.com`).

## Context
The contact form in `components/ContactSection.tsx` currently uses a mock `setTimeout` to simulate submission. Since this portfolio is built with Next.js App Router (16.2.1), we can create a native Route Handler at `app/api/contact/route.ts` powered by Resend. Resend provides a generous free tier (3,000 emails/month, 100/day) and first-class SDK support for modern React/Next.js.

## Requirements & Scope
- **Backend API**:
  - Endpoint: `POST /api/contact`
  - Request payload: `{ name: string, email: string, message: string }`
  - Server-side validation: ensure non-empty strings, valid email format, and reasonable length limits.
  - Integration with Resend (`resend` SDK) using `RESEND_API_KEY`.
  - Recipient: `fauzantaslim123@gmail.com`.
  - Environment variable template in `.env.example`.
- **Frontend Interaction**:
  - Update `handleSubmit` in `components/ContactSection.tsx` to `fetch('/api/contact')`.
  - Proper loading state (`isSubmitting`) with spinner.
  - Proper success state (`isSubmitted`) with auto-dismiss or reset.
  - Error state handling (`errorMessage`) so the user is informed if the request fails, with retry ability.
- **Security & Hygiene**:
  - Update `next` to a patched release (`16.4.3`) to resolve existing critical/high security advisories on server routes.
  - Avoid exposing API keys to the browser (keep `RESEND_API_KEY` server-side only).

## References
- `components/ContactSection.tsx`: Current contact form UI and state management.
- `app/api/contact/route.ts`: New Route Handler to create.
- `.env.example`: Template for required secrets.

## Tasks
- [x] 1. Install `resend` and create `app/api/contact/route.ts` with validation, Resend dispatch, and `.env.example`.
- [x] 2. Update `components/ContactSection.tsx` to call `/api/contact` with loading, success, and error UI states.
- [ ] 3. Bump Next.js to safe version (16.4.3) and verify build (`npm run build`).
