"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaEnvelope,
  FaLocationDot,
  FaLinkedin,
  FaGithub,
  FaTriangleExclamation,
  FaCheck,
} from "react-icons/fa6";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          action?: string;
          appearance?: "always" | "execute" | "interaction-only";
          theme?: "light" | "dark" | "auto";
          callback?: (token: string) => void;
          "error-callback"?: (error: unknown) => void;
          "expired-callback"?: () => void;
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
      getResponse: (widgetId?: string) => string | undefined;
    };
  }
}

gsap.registerPlugin(ScrollTrigger);

const contactLinks = [
  {
    icon: FaEnvelope,
    label: "Email",
    value: "fauzantaslim123@gmail.com",
    href: "mailto:fauzantaslim123@gmail.com",
    accent: "#1DCD9F",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    value: "/in/fauzan-taslim-hidayat",
    href: "https://www.linkedin.com/in/fauzan-taslim-hidayat",
    accent: "#38bdf8",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    value: "github.com/fauzantaslim",
    href: "https://github.com/fauzantaslim",
    accent: "#a78bfa",
  },
  {
    icon: FaLocationDot,
    label: "Location",
    value: "Bogor, Indonesia",
    href: null,
    accent: "#fb923c",
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const [formState, setFormState] = useState({ name: "", email: "", message: "", website: "" });
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [turnstileStatus, setTurnstileStatus] = useState<"loading" | "ready" | "error">("loading");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  const renderTurnstile = () => {
    if (typeof window === "undefined" || !window.turnstile || !turnstileContainerRef.current) {
      return;
    }
    if (widgetIdRef.current) {
      return;
    }

    const siteKey =
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000BB";

    try {
      const id = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: siteKey,
        action: "contact",
        appearance: "interaction-only",
        theme: "auto",
        callback: (token: string) => {
          setTurnstileToken(token);
          setTurnstileStatus("ready");
        },
        "error-callback": (err: unknown) => {
          console.error("[Turnstile error]:", err);
          setTurnstileToken("");
          setTurnstileStatus("error");
        },
        "expired-callback": () => {
          setTurnstileToken("");
          if (widgetIdRef.current && window.turnstile) {
            window.turnstile.reset(widgetIdRef.current);
          }
        },
      });
      widgetIdRef.current = id;
    } catch (err) {
      console.error("[Turnstile render error]:", err);
      setTurnstileStatus("error");
    }
  };

  // Re-render Turnstile widget when reset from submitted state
  useEffect(() => {
    if (!isSubmitted && window.turnstile) {
      const timer = setTimeout(() => {
        renderTurnstile();
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  // Clean up Turnstile widget on unmount
  useEffect(() => {
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore
        }
        widgetIdRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-eyebrow",
        { opacity: 0, x: -24 },
        {
          opacity: 1, x: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-eyebrow", start: "top 88%" },
        }
      );

      gsap.fromTo(
        ".contact-headline",
        { opacity: 0, y: 50, skewY: 3 },
        {
          opacity: 1, y: 0, skewY: 0, duration: 0.9, ease: "expo.out",
          scrollTrigger: { trigger: ".contact-headline", start: "top 88%" },
        }
      );

      gsap.fromTo(
        ".contact-link-item",
        { opacity: 0, x: -24 },
        {
          opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: ".contact-links", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".contact-form-panel",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".contact-form-panel", start: "top 82%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setErrorMessage("Please fill out all fields before submitting.");
      return;
    }

    if (turnstileStatus === "error") {
      setErrorMessage(
        "Security verification could not load. If you use a script or ad blocker, please temporarily disable it or email me directly at fauzantaslim123@gmail.com."
      );
      return;
    }

    if (!turnstileToken) {
      setErrorMessage("Security verification is in progress. Please wait a moment and try again.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          website: formState.website,
          turnstileToken,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message. Please try again.");
      }

      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "", website: "" });
      setTurnstileToken("");
      widgetIdRef.current = null;
      setTimeout(() => setIsSubmitted(false), 6000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
      // Turnstile tokens are single-use: reset widget after every submit attempt
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
        setTurnstileToken("");
      }
    }
  };

  const inputBase = `
    w-full bg-transparent border-b text-foreground text-sm py-3 outline-none
    transition-colors duration-200 dark:placeholder:text-white/20 placeholder:text-black/30
    font-mono
  `;

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="relative min-h-[90vh] py-20 lg:py-32 overflow-hidden border-t dark:border-white/10 border-black/10 bg-background"
    >
      <style>{`
        .contact-form-panel {
          position: relative;
        }
        .contact-form-panel::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(29,205,159,0.4), transparent);
        }
        .contact-link-item {
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .contact-link-item:hover {
          background: var(--border-faint);
        }
        .field-label {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .submit-btn {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.2s ease;
        }
        .submit-btn:not(:disabled):hover {
          box-shadow: 0 0 24px rgba(29,205,159,0.35);
        }
        .submit-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.06);
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .submit-btn:not(:disabled):hover::after { opacity: 1; }
      `}</style>


      <div className="section-container relative z-10">
        {/* Header */}
        <div className="mb-14 md:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="contact-eyebrow font-mono text-xs tracking-[0.25em] uppercase text-primary">
              Get In Touch
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-primary/60" />
          </div>
          <h2 id="contact-heading" className="contact-headline text-4xl md:text-6xl font-black tracking-tight leading-[1.05] text-foreground">
            Let&apos;s <span className="text-primary">connect</span><br />
            &amp; collaborate.
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start max-w-5xl">
          {/* Left: Info */}
          <div className="lg:col-span-5 space-y-10">
            <p className="text-foreground/55 leading-relaxed text-[0.95rem]">
              Whether you want to discuss a project idea, a collaboration, or just want to say hi — my inbox is always open.
            </p>

            <div className="contact-links space-y-2">
              {contactLinks.map(({ icon: Icon, label, value, href, accent }) => {
                const inner = (
                  <div
                    className="contact-link-item flex items-center gap-4 p-3 rounded-lg dark:border dark:border-white/6 border border-black/6 cursor-default"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: accent + "18", border: `1px solid ${accent}30` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: accent }} aria-hidden="true" />
                    </div>
                    <div>
                      <p
                        className="text-foreground/35 mb-0.5"
                        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                      >
                        {label}
                      </p>
                      <p className="text-foreground text-sm font-medium">{value}</p>
                    </div>
                    {href && (
                      <span
                        className="ml-auto text-foreground/20 text-xs"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        ↗
                      </span>
                    )}
                  </div>
                );

                return href ? (
                  <a key={label} href={href} aria-label={`Send email or visit ${label} profile`} target="_blank" rel="noopener noreferrer" className="block">
                    {inner}
                  </a>
                ) : (
                  <div key={label}>{inner}</div>
                );
              })}
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form-panel lg:col-span-7 p-8 rounded-2xl dark:bg-white/[0.02] bg-black/[0.02] dark:border dark:border-white/8 border border-black/8">
            <div aria-live="polite" className="sr-only">
              {isSubmitted ? "Your message has been sent successfully. I will get back to you soon." : ""}
              {isSubmitting ? "Sending your message..." : ""}
            </div>
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(29,205,159,0.12)", border: "1px solid rgba(29,205,159,0.3)" }}
                >
                  <FaCheck className="text-primary text-xl" aria-hidden="true" />
                </div>
                <p className="text-foreground font-bold text-lg">Message sent!</p>
                <p className="text-foreground/40 text-sm font-mono">I&apos;ll get back to you soon.</p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-2 text-xs font-mono text-primary/70 hover:text-primary underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                {/* Honeypot field (hidden off-screen from real users, traps automated bots) */}
                <div
                  className="opacity-0 absolute -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden"
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  <label htmlFor="website" tabIndex={-1}>Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formState.website}
                    onChange={(e) => setFormState({ ...formState, website: e.target.value })}
                  />
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className={`field-label ${focused === "name" ? "text-primary" : "text-foreground/35"} transition-colors duration-200`}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className={`${inputBase} ${focused === "name" ? "border-primary" : "dark:border-white/12 border-black/12"}`}
                    placeholder="Your name"
                    value={formState.name}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className={`field-label ${focused === "email" ? "text-primary" : "text-foreground/35"} transition-colors duration-200`}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className={`${inputBase} ${focused === "email" ? "border-primary" : "dark:border-white/12 border-black/12"}`}
                    placeholder="your@email.com"
                    value={formState.email}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className={`field-label ${focused === "message" ? "text-primary" : "text-foreground/35"} transition-colors duration-200`}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    className={`${inputBase} resize-none border-b ${focused === "message" ? "border-primary" : "dark:border-white/12 border-black/12"}`}
                    placeholder="What's on your mind?"
                    value={formState.message}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  />
                </div>

                {/* Turnstile explicit loader */}
                <Script
                  src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
                  strategy="afterInteractive"
                  onReady={renderTurnstile}
                  onError={() => {
                    setTurnstileStatus("error");
                  }}
                />

                {/* Invisible Turnstile container (displays only if Cloudflare triggers challenge) */}
                <div ref={turnstileContainerRef} id="turnstile-container" className="my-1" />

                {/* Error Banner */}
                {errorMessage && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-mono flex items-start gap-2.5"
                  >
                    <FaTriangleExclamation className="shrink-0 text-sm mt-0.5 text-red-400" aria-hidden="true" />
                    <span className="leading-relaxed">{errorMessage}</span>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting || (!turnstileToken && turnstileStatus !== "error")}
                  className="submit-btn w-full py-4 rounded-lg bg-primary text-black font-bold disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
                  aria-live="polite"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : !turnstileToken && turnstileStatus !== "error" ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Verifying security...
                    </span>
                  ) : (
                    "Send Message ↗"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
