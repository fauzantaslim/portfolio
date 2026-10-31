"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { FaMagnifyingGlassPlus } from "react-icons/fa6";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { certificates, type Certificate } from "@/lib/certificates-data";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// CyberCard
// ─────────────────────────────────────────────────────────────────────────────

function CyberCard({ cert }: { cert: Certificate }) {
  return (
    <article className="cyber-card group relative rounded-2xl overflow-hidden h-full flex flex-col w-full">
      {/* Neon border glow layer */}
      <div className="cyber-card-border" aria-hidden="true" />

      {/* Corner brackets */}
      <span className="corner tl" aria-hidden="true" />
      <span className="corner tr" aria-hidden="true" />
      <span className="corner bl" aria-hidden="true" />
      <span className="corner br" aria-hidden="true" />

      {/* Scanline overlay */}
      <div className="scanlines" aria-hidden="true" />

      {/* Certificate image with Fancybox trigger */}
      <a
        href={cert.image}
        data-fancybox="certificates-gallery"
        data-caption={`<strong>${cert.title}</strong> &bull; <span style="color:#1DCD9F">${cert.issuer}</span>${cert.issueDate ? ` (${cert.issueDate})` : ""}`}
        className="block relative overflow-hidden aspect-[16/11] w-full bg-black/60 cursor-zoom-in group/img"
        title={`View ${cert.title}`}
      >
        <Image
          src={cert.image}
          alt={`${cert.title} certificate from ${cert.issuer}`}
          fill
          className="object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-[1.05]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
        />
        {/* Image vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 55%, rgba(8,8,8,0.95) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Hover zoom overlay badge */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"
          style={{ background: "rgba(0,0,0,0.45)" }}
          aria-hidden="true"
        >
          <span
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase text-primary border"
            style={{
              borderColor: "rgba(29,205,159,0.5)",
              background: "rgba(10,10,10,0.88)",
              boxShadow: "0 0 16px rgba(29,205,159,0.3)",
            }}
          >
            <FaMagnifyingGlassPlus className="text-sm" />
            <span>Enlarge</span>
          </span>
        </div>

        {/* Issuer badge */}
        <span
          className="absolute top-3 left-3 px-2.5 py-1 rounded-md z-10"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.52rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#1DCD9F",
            background: "rgba(8,8,8,0.75)",
            border: "1px solid rgba(29,205,159,0.35)",
            backdropFilter: "blur(6px)",
          }}
        >
          {cert.issuer}
        </span>
        {/* Date badge */}
        {cert.issueDate && (
          <span
            className="absolute top-3 right-3 px-2.5 py-1 rounded-md z-10"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.52rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              background: "rgba(8,8,8,0.75)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(6px)",
            }}
          >
            {cert.issueDate}
          </span>
        )}
      </a>

      {/* Card body */}
      <div
        className="relative px-5 pt-4 pb-5 flex flex-col flex-1"
        style={{ background: "rgba(10,10,10,0.98)" }}
      >
        {/* Neon accent line */}
        <div
          className="mb-3 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(29,205,159,0.4) 30%, rgba(29,205,159,0.4) 70%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        <h3
          className="text-foreground/90 font-semibold leading-snug mb-3 line-clamp-2 min-h-[2.5rem]"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.82rem",
            letterSpacing: "0.01em",
          }}
        >
          {cert.title}
        </h3>

        {/* Footer row */}
        <div className="mt-auto pt-2 flex items-center justify-between gap-3 min-h-[32px]">
          {/* Neon dot + issuer */}
          <div className="flex items-center gap-2">
            <span
              style={{
                display: "inline-block",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#1DCD9F",
                boxShadow: "0 0 8px #1DCD9F, 0 0 18px #1DCD9F55",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.55rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(29,205,159,0.65)",
              }}
            >
              {cert.issuer}
            </span>
          </div>

          {/* Verify link */}
          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-verify-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.55rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#1DCD9F",
                textDecoration: "none",
                padding: "5px 12px",
                border: "1px solid rgba(29,205,159,0.28)",
                borderRadius: "6px",
                background: "rgba(29,205,159,0.05)",
                transition: "all 0.2s ease",
              }}
            >
              Verify ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CertificatesSection
// ─────────────────────────────────────────────────────────────────────────────

export default function CertificatesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Bind Fancybox for certificate lightbox
    Fancybox.bind('[data-fancybox="certificates-gallery"]', {
      groupAttr: "data-fancybox",
      dragToClose: false,
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cert-eyebrow",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cert-eyebrow", start: "top 88%" },
        }
      );
      gsap.fromTo(
        ".cert-heading",
        { opacity: 0, y: 40, skewY: 2 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: { trigger: ".cert-heading", start: "top 88%" },
        }
      );
      gsap.fromTo(
        ".cert-card-item",
        { opacity: 0, y: 36, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: ".cert-grid", start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => {
      Fancybox.unbind('[data-fancybox="certificates-gallery"]');
      Fancybox.close();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="certificates"
      ref={sectionRef}
      aria-labelledby="certificates-heading"
      className="relative py-24 md:py-32 bg-background z-20"
    >
      <style>{`
        /* Card border */
        .cyber-card {
          background: rgba(10,10,10,0.98);
          border: 1px solid rgba(29,205,159,0.18);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.4s ease,
                      box-shadow 0.4s ease;
          will-change: transform;
        }
        .cyber-card:hover {
          transform: translateY(-6px);
          border-color: rgba(29,205,159,0.55);
          box-shadow:
            0 0 0 1px rgba(29,205,159,0.2),
            0 16px 45px rgba(0,0,0,0.8),
            0 0 35px rgba(29,205,159,0.18);
        }
        /* Corner brackets */
        .corner {
          position: absolute;
          width: 18px;
          height: 18px;
          z-index: 20;
          pointer-events: none;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .corner.tl { top: 10px; left: 10px; border-top: 2px solid rgba(29,205,159,0.4); border-left: 2px solid rgba(29,205,159,0.4); }
        .corner.tr { top: 10px; right: 10px; border-top: 2px solid rgba(29,205,159,0.4); border-right: 2px solid rgba(29,205,159,0.4); }
        .corner.bl { bottom: 10px; left: 10px; border-bottom: 2px solid rgba(29,205,159,0.4); border-left: 2px solid rgba(29,205,159,0.4); }
        .corner.br { bottom: 10px; right: 10px; border-bottom: 2px solid rgba(29,205,159,0.4); border-right: 2px solid rgba(29,205,159,0.4); }
        .cyber-card:hover .corner {
          border-color: rgba(29,205,159,0.95);
          filter: drop-shadow(0 0 8px #1DCD9F);
        }
        .cyber-card:hover .corner.tl { top: 8px; left: 8px; }
        .cyber-card:hover .corner.tr { top: 8px; right: 8px; }
        .cyber-card:hover .corner.bl { bottom: 8px; left: 8px; }
        .cyber-card:hover .corner.br { bottom: 8px; right: 8px; }
        /* Scanlines */
        .scanlines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 10;
          background-image: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(29,205,159,0.012) 3px,
            rgba(29,205,159,0.012) 4px
          );
        }
        /* Verify button */
        .cyber-verify-btn {
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cyber-verify-btn:hover {
          border-color: rgba(29,205,159,0.7);
          background: rgba(29,205,159,0.15);
          box-shadow: 0 0 16px rgba(29,205,159,0.3);
          transform: translateY(-1px);
        }
        /* Fancybox cyborg theme */
        .fancybox__container {
          --fancybox-accent-color: #1DCD9F;
          --fancybox-bg: rgba(5,5,5,0.96);
          z-index: 99999;
        }
        .fancybox__toolbar {
          background: rgba(10,10,10,0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(29,205,159,0.15);
        }
        .fancybox__caption {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.8);
          background: rgba(10,10,10,0.85);
          backdrop-filter: blur(8px);
          border-top: 1px solid rgba(29,205,159,0.15);
        }
        .fancybox__button--close:hover {
          color: #1DCD9F;
        }
      `}</style>

      {/* Ambient bg glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(29,205,159,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="cert-eyebrow font-mono text-xs tracking-[0.3em] uppercase text-primary">
              Credentials
            </span>
            <div className="h-px flex-1 max-w-[100px] bg-primary/40" />
          </div>
          <h2
            id="certificates-heading"
            className="cert-heading text-4xl md:text-7xl font-black leading-[1] tracking-tighter text-foreground"
          >
            Certificates &amp;{" "}
            <span className="text-primary">Credentials</span>
          </h2>
        </div>

        {/* Empty state */}
        {certificates.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-20 text-center border rounded-2xl"
            style={{
              borderColor: "rgba(29,205,159,0.15)",
              background: "rgba(29,205,159,0.03)",
            }}
          >
            <span
              className="text-primary/40 mb-3"
              style={{ fontSize: "2.5rem" }}
              aria-hidden="true"
            >
              📜
            </span>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
              }}
            >
              Certificates will appear here.
            </p>
          </div>
        )}

        {/* Card grid */}
        {certificates.length > 0 && (
          <ul
            className="cert-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
            role="list"
          >
            {certificates.map((cert) => (
              <li key={cert.id} className="cert-card-item h-full flex flex-col">
                <CyberCard cert={cert} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
