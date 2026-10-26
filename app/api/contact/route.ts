import { NextResponse } from "next/server";
import { Resend } from "resend";
import { checkRateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Payload must be a JSON object" },
        { status: 400 }
      );
    }

    const { name, email, message, website, turnstileToken } = body as Record<string, unknown>;

    // 1. Honeypot check: bots fill hidden "website" field. Real users leave it empty.
    // Return silent success without sending email so bots get no feedback signal.
    if (typeof website === "string" && website.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    // 2. Field validation
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    const trimmedMessage = typeof message === "string" ? message.trim() : "";

    if (!trimmedName || trimmedName.length > 100) {
      return NextResponse.json(
        { error: "Name is required and must be under 100 characters." },
        { status: 400 }
      );
    }

    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail) || trimmedEmail.length > 150) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!trimmedMessage || trimmedMessage.length > 5000) {
      return NextResponse.json(
        { error: "Message is required and must be under 5000 characters." },
        { status: 400 }
      );
    }

    // Extract client IP address
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // 3. Per-IP rate limiting (Upstash Redis, fail-open)
    const isAllowed = await checkRateLimit(ip);
    if (!isAllowed) {
      return NextResponse.json(
        { error: "You've sent too many messages recently. Please try again in an hour." },
        { status: 429 }
      );
    }

    // 4. Cloudflare Turnstile token verification (fail-closed)
    const isTurnstileValid = await verifyTurnstile(turnstileToken, ip);
    if (!isTurnstileValid) {
      return NextResponse.json(
        { error: "Security verification failed. Please refresh the page and try again." },
        { status: 400 }
      );
    }

    // 5. Send email via Resend
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service is temporarily unavailable (RESEND_API_KEY is not configured)." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const to = process.env.CONTACT_EMAIL_TO || "fauzantaslim123@gmail.com";
    const from = process.env.CONTACT_EMAIL_FROM || "Portfolio Contact <onboarding@resend.dev>";

    // Subject newline sanitization to prevent header/subject injection
    const sanitizedSubjectName = trimmedName.replace(/[\r\n]+/g, " ");

    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: trimmedEmail,
      subject: `Portfolio Message from ${sanitizedSubjectName}`,
      text: `Sender: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
          <h2 style="color: #0f172a; margin-top: 0; font-size: 20px;">New Portfolio Inquiry</h2>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
          <p style="margin: 8px 0; color: #334155;"><strong>From:</strong> ${escapeHtml(trimmedName)}</p>
          <p style="margin: 8px 0; color: #334155;"><strong>Email:</strong> <a href="mailto:${escapeHtml(trimmedEmail)}" style="color: #0284c7;">${escapeHtml(trimmedEmail)}</a></p>
          <p style="margin: 16px 0 8px; color: #334155;"><strong>Message:</strong></p>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #1e293b;">${escapeHtml(trimmedMessage)}</div>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0 12px;" />
          <p style="font-size: 12px; color: #94a3b8; margin: 0;">Sent via Portfolio Contact Form • ${new Date().toISOString()}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[Resend Error]:", error);
      return NextResponse.json(
        { error: error.message || "Failed to send message via email provider." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      id: data?.id,
    });
  } catch (err: unknown) {
    console.error("[Contact API Error]:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
