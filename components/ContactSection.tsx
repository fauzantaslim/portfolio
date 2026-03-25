"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaEnvelope, FaLocationDot, FaLinkedin, FaGithub } from "react-icons/fa6";

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
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 4000);
    }, 1500);
  };

  const inputBase = `
    w-full bg-transparent border-b text-white text-sm py-3 outline-none
    transition-colors duration-200 placeholder:text-white/20
    font-mono
  `;

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-36 relative overflow-hidden">
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
          background: rgba(255,255,255,0.03);
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

      {/* Faint bg index */}
      <span
        aria-hidden="true"
        className="absolute right-0 top-1/2 -translate-y-1/2 text-[22vw] font-black text-white/[0.02] select-none leading-none pointer-events-none"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        05
      </span>

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="mb-14 md:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="contact-eyebrow font-mono text-xs tracking-[0.25em] uppercase text-primary">
              Get In Touch
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-primary/60" />
          </div>
          <h2 className="contact-headline text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
            Let&apos;s <span className="text-primary">connect</span><br />
            &amp; collaborate.
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start max-w-5xl">
          {/* Left: Info */}
          <div className="lg:col-span-5 space-y-10">
            <p className="text-white/55 leading-relaxed text-[0.95rem]">
              Whether you have a question about my QA processes, want to discuss a potential
              collaboration, or just want to say hi — my inbox is always open.
            </p>

            <div className="contact-links space-y-2">
              {contactLinks.map(({ icon: Icon, label, value, href, accent }) => {
                const inner = (
                  <div
                    className="contact-link-item flex items-center gap-4 p-3 rounded-lg border border-white/6 cursor-default"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: accent + "18", border: `1px solid ${accent}30` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: accent }} aria-hidden="true" />
                    </div>
                    <div>
                      <p
                        className="text-white/35 mb-0.5"
                        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
                      >
                        {label}
                      </p>
                      <p className="text-white text-sm font-medium">{value}</p>
                    </div>
                    {href && (
                      <span
                        className="ml-auto text-white/20 text-xs"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        ↗
                      </span>
                    )}
                  </div>
                );

                return href ? (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="block">
                    {inner}
                  </a>
                ) : (
                  <div key={label}>{inner}</div>
                );
              })}
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form-panel lg:col-span-7 p-8 rounded-2xl bg-white/[0.02] border border-white/8">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(29,205,159,0.12)", border: "1px solid rgba(29,205,159,0.3)" }}
                >
                  <span className="text-primary text-2xl">✓</span>
                </div>
                <p className="text-white font-bold text-lg">Message sent!</p>
                <p className="text-white/40 text-sm font-mono">I&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className={`field-label ${focused === "name" ? "text-primary" : "text-white/35"} transition-colors duration-200`}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className={`${inputBase} ${focused === "name" ? "border-primary" : "border-white/12"}`}
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
                  <label htmlFor="email" className={`field-label ${focused === "email" ? "text-primary" : "text-white/35"} transition-colors duration-200`}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className={`${inputBase} ${focused === "email" ? "border-primary" : "border-white/12"}`}
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
                  <label htmlFor="message" className={`field-label ${focused === "message" ? "text-primary" : "text-white/35"} transition-colors duration-200`}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    className={`${inputBase} resize-none border-b ${focused === "message" ? "border-primary" : "border-white/12"}`}
                    placeholder="What's on your mind?"
                    value={formState.message}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-btn w-full py-4 rounded-lg bg-primary text-black font-bold disabled:opacity-60"
                  aria-live="polite"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Sending...
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
