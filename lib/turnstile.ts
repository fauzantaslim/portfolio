const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const EXPECTED_ACTION = "contact";
const MAX_TOKEN_LENGTH = 2048;
const TIMEOUT_MS = 5000;

/** Returns `true` only for a valid, fresh token. Fails closed on any problem. */
export async function verifyTurnstile(token: unknown, ip: string): Promise<boolean> {
  if (typeof token !== "string" || !token || token.length > MAX_TOKEN_LENGTH) return false;

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("[Turnstile] TURNSTILE_SECRET_KEY is not configured.");
    return false;
  }

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip !== "unknown") body.set("remoteip", ip);

    const res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      body,
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const result: { success?: boolean; action?: string; "error-codes"?: string[] } =
      await res.json();

    if (!result.success) {
      console.warn("[Turnstile] Verification failed:", result["error-codes"]);
      return false;
    }

    // Cloudflare's dummy testing keys always answer with action "test".
    if (process.env.NODE_ENV === "production" && result.action !== EXPECTED_ACTION) {
      console.warn("[Turnstile] Action mismatch:", result.action);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[Turnstile] siteverify request failed:", err);
    return false;
  }
}
