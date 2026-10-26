import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let limiter: Ratelimit | null | undefined;

function getLimiter(): Ratelimit | null {
  if (limiter !== undefined) return limiter;

  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.UPSTASH_REDIS_REST_KV_REST_API_URL ||
    process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN ||
    process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    console.warn("[Rate Limit] Upstash env vars not set, rate limiting is disabled.");
    limiter = null;
    return limiter;
  }

  limiter = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(3, "1 h"),
    prefix: "contact",
  });
  return limiter;
}

/** Returns `true` when the request may proceed. Fails open if Upstash is unavailable. */
export async function checkRateLimit(ip: string): Promise<boolean> {
  const rateLimiter = getLimiter();
  if (!rateLimiter) return true;

  try {
    const { success } = await rateLimiter.limit(ip);
    return success;
  } catch (err) {
    console.warn("[Rate Limit] Upstash unreachable, skipping limit:", err);
    return true;
  }
}
