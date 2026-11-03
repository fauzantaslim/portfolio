"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getImageProps } from "next/image";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import OrbitImages from "@/components/ui/orbit-images";
import { certificates, type Certificate } from "@/lib/certificates-data";

gsap.registerPlugin(ScrollTrigger);

const GALLERY = "certificates-gallery";

const orbitImages = certificates.map((cert) => ({
  src: getImageProps({ src: cert.image, alt: "", width: 256, height: 256 }).props.src,
  alt: `${cert.title} - ${cert.issuer}`,
}));

const ORBIT_DESKTOP = { radiusX: 430, radiusY: 105, itemSize: 150, rotation: -8 };
const ORBIT_MOBILE = { radiusX: 150, radiusY: 120, itemSize: 110, rotation: -6 };

function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (notify: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", notify);
      return () => mql.removeEventListener("change", notify);
    },
    [query]
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}

function lightboxCaption(cert: Certificate) {
  const verify = cert.credentialUrl
    ? ` &bull; <a href="${cert.credentialUrl}" target="_blank" rel="noopener noreferrer" style="color:var(--color-primary)">Verify &#8599;</a>`
    : "";
  const date = cert.issueDate ? ` &bull; ${cert.issueDate}` : "";
  return `<strong>${cert.title}</strong> &bull; <span style="color:var(--color-primary)">${cert.issuer}</span>${date}${verify}`;
}

function orbitItemOf(target: EventTarget) {
  return target instanceof HTMLElement ? target.closest<HTMLElement>("[data-orbit-item]") : null;
}

function InfoPanel({ cert }: { cert: Certificate | null }) {
  const mono = { fontFamily: "'JetBrains Mono', monospace" };

  if (!cert) {
    return (
      <div className="cert-info text-center" style={{ pointerEvents: "none" }} aria-hidden="true">
        <p
          className="text-primary font-black leading-none"
          style={{ ...mono, fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
        >
          {String(certificates.length).padStart(2, "0")}
        </p>
        <p
          className="mt-2 text-foreground/40"
          style={{ ...mono, fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase" }}
        >
          Credentials
        </p>
      </div>
    );
  }

  return (
    <div
      key={cert.id}
      className="cert-info text-center max-w-[220px] md:max-w-[340px]"
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      <p
        className="text-primary"
        style={{ ...mono, fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase" }}
      >
        {cert.issuer}
      </p>
      <h3 className="mt-2 text-foreground/90 font-semibold leading-snug line-clamp-3 text-sm md:text-lg">
        {cert.title}
      </h3>
      {cert.issueDate && (
        <p
          className="mt-2 text-foreground/35"
          style={{ ...mono, fontSize: "0.55rem", letterSpacing: "0.16em", textTransform: "uppercase" }}
        >
          {cert.issueDate}
        </p>
      )}
    </div>
  );
}

export default function CertificatesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const anchorRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const orbit = isMobile ? ORBIT_MOBILE : ORBIT_DESKTOP;

  useEffect(() => {
    Fancybox.bind(`[data-fancybox="${GALLERY}"]`, {
      groupAttr: "data-fancybox",
      dragToClose: false,
      modal: false,
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
        ".cert-orbit",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cert-orbit", start: "top 88%" },
        }
      );
    }, sectionRef);

    return () => {
      Fancybox.unbind(`[data-fancybox="${GALLERY}"]`);
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
        .cert-orbit { color: var(--color-primary); }
        .cert-orbit [data-orbit-item] > div {
          background: var(--surface);
          border: 1px solid rgba(29,205,159,0.35);
          transition: transform 450ms cubic-bezier(0.2, 0.8, 0.2, 1),
                      border-color 0.3s ease,
                      box-shadow 0.3s ease;
        }
        .cert-orbit [data-orbit-item] img { object-fit: contain; }
        .cert-orbit [data-orbit-item]:hover > div,
        .cert-orbit [data-orbit-item]:focus-visible > div {
          border-color: rgba(29,205,159,0.9);
          box-shadow: 0 0 28px rgba(29,205,159,0.35);
        }
        @media (prefers-reduced-motion: reduce) {
          .cert-orbit [data-orbit-item] > div { transition: none; }
        }
        .cert-info { animation: cert-info-in 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes cert-info-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fancybox__dialog {
          z-index: 99999;
        }
        .fancybox__container {
          --fancybox-accent-color: var(--color-primary);
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
        .fancybox__button--close:hover { color: var(--color-primary); }
      `}</style>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/[0.02] to-transparent pointer-events-none" aria-hidden="true" />

      <div className="section-container relative z-10">
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
              className="text-foreground/30"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Certificates will appear here.
            </p>
          </div>
        )}

        {certificates.length > 0 && (
          <div>
            <div aria-hidden="true" className="sr-only">
              {certificates.map((cert, i) => (
                <a
                  key={cert.id}
                  ref={(el) => {
                    anchorRefs.current[i] = el;
                  }}
                  href={cert.image}
                  data-fancybox={GALLERY}
                  data-caption={lightboxCaption(cert)}
                  tabIndex={-1}
                >
                  {cert.title}
                </a>
              ))}
            </div>

            <div
              className="cert-orbit relative z-[5]"
              onPointerOver={(e) => {
                const el = orbitItemOf(e.target);
                if (!el) return;
                const i = Number(el.dataset.orbitItem);
                el.dataset.cursorLabel = certificates[i].title;
                setActive(i);
              }}
              onPointerLeave={() => setActive(null)}
              onFocus={(e) => {
                const el = orbitItemOf(e.target);
                if (el) setActive(Number(el.dataset.orbitItem));
              }}
              onBlur={() => setActive(null)}
            >
              <OrbitImages
                images={orbitImages}
                shape="ellipse"
                radiusX={orbit.radiusX}
                radiusY={orbit.radiusY}
                rotation={orbit.rotation}
                itemSize={orbit.itemSize}
                duration={40}
                depth={0.6}
                showPath
                pathColor="rgba(29,205,159,0.28)"
                pathWidth={1.5}
                itemRadius={14}
                shadow={0.4}
                hoverScale={1.1}
                hoverSpeed={0.3}
                draggable
                clickToFront={false}
                onItemClick={(index) => anchorRefs.current[index]?.click()}
                intro
                centerContent={<InfoPanel cert={active === null ? null : certificates[active]} />}
              />
            </div>

            <p
              className="relative z-[5] mt-2 text-center text-foreground/40"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Drag to rotate · Click to enlarge
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
