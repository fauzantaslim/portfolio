"use client";

import Link from "next/link";
import {
  FaArrowLeft,
  FaArrowUpRightFromSquare,
  FaGithub,
  FaCalendarDays,
  FaTag,
  FaCircleDot,
} from "react-icons/fa6";
import { projects } from "@/lib/projects-data";
import type { Project } from "@/lib/projects-data";
import ProjectImageSlider from "@/components/ProjectImageSlider";

/* ─── Status badge colours ───────────────────────────────────── */
const statusConfig: Record<string, { color: string; bg: string; border: string }> = {
  Live:            { color: "#1DCD9F", bg: "rgba(29,205,159,0.12)", border: "rgba(29,205,159,0.3)" },
  "In Development":{ color: "#fb923c", bg: "rgba(251,146,60,0.12)",  border: "rgba(251,146,60,0.3)"  },
  Archived:        { color: "#888888", bg: "rgba(136,136,136,0.12)", border: "rgba(136,136,136,0.3)" },
};

const categoryColor: Record<string, string> = {
  Web:              "#22c55e",
  API:              "#38bdf8",
  "Manual Test":    "#a78bfa",
  "Automation Test":"#fb923c",
  "Bug Reporting":  "#f43f5e",
};

interface Props {
  project: Project;
  slug: string;
}

export default function ProjectDetailClient({ project, slug }: Props) {
  const accent = categoryColor[project.category] ?? "#1DCD9F";
  const status = project.status ? statusConfig[project.status] : null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <style>{`
        .detail-tag {
          font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
          font-size: 0.65rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 3px;
          font-weight: 700;
        }
        .highlight-item {
          position: relative;
          padding-left: 1.25rem;
        }
        .highlight-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.55em;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #1DCD9F;
        }
        .prose-p {
          line-height: 1.85;
          color: var(--text-dimmer);
        }
        .info-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-dim);
          display: block;
          margin-bottom: 0.25rem;
        }
        .info-value {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--foreground);
        }
        .back-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: all 0.2s ease;
          border: 1px solid var(--border-subtle);
        }
        .back-btn:hover {
          border-color: rgba(29,205,159,0.4);
          color: #1DCD9F;
          background: rgba(29,205,159,0.06);
        }
        .cta-primary {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: box-shadow 0.2s ease;
        }
        .cta-primary:hover {
          box-shadow: 0 0 24px rgba(29,205,159,0.35);
        }
        .cta-secondary {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: all 0.2s ease;
          border: 1px solid var(--border-subtle);
        }
        .cta-secondary:hover {
          border-color: rgba(29,205,159,0.4);
          background: rgba(29,205,159,0.06);
        }
        .section-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border-subtle), transparent);
        }
        .proj-nav-link {
          transition: border-color 0.2s ease, background-color 0.2s ease;
        }
        .proj-nav-link:hover {
          color: #1DCD9F;
        }
      `}</style>

      {/* ── Top nav bar ── */}
      <div className="sticky top-0 z-50 dark:bg-black/70 bg-white/80 backdrop-blur-xl border-b dark:border-white/8 border-black/8">
        <div className="section-container flex items-center justify-between h-14">
          <Link href="/#projects" className="back-btn inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-foreground/60">
            <FaArrowLeft className="w-3 h-3" />
            Back to Portfolio
          </Link>
          <span
            className="text-foreground/30 hidden sm:block"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.1em" }}
          >
            FAUZAN TASLIM · PROJECT
          </span>
        </div>
      </div>

      <div className="section-container py-12 md:py-20 max-w-6xl">
        {/* ── Hero header ── */}
        <header className="mb-10 md:mb-14">
          {/* Category + Status row */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span
              className="detail-tag"
              style={{ color: accent, backgroundColor: accent + "14", border: `1px solid ${accent}30` }}
            >
              {project.category}
            </span>
            {status && (
              <span
                className="detail-tag"
                style={{ color: status.color, backgroundColor: status.bg, border: `1px solid ${status.border}` }}
              >
                <FaCircleDot className="inline w-2 h-2 mr-1" />
                {project.status}
              </span>
            )}
            {project.year && (
              <span
                className="detail-tag"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "var(--text-muted)",
                  backgroundColor: "var(--border-faint)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <FaCalendarDays className="inline w-2.5 h-2.5 mr-1" />
                {project.year}
              </span>
            )}
          </div>

          {/* Title */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.0] mb-4"
            style={{ color: "var(--foreground)" }}
          >
            {project.title}
          </h1>

          {/* Short description */}
          <p
            className="text-lg md:text-xl max-w-3xl"
            style={{ lineHeight: 1.7, color: "var(--text-muted)" }}
          >
            {project.shortDescription}
          </p>
        </header>

        {/* ── Main grid ── */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: slider + description */}
          <div className="lg:col-span-7 space-y-10">
            {/* Slider */}
            <ProjectImageSlider images={project.images} title={project.title} />

            {/* Long description */}
            <article className="space-y-5">
              <h2
                className="text-xs tracking-[0.25em] uppercase text-primary"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                About This Project
              </h2>
              {project.longDescription.map((para, i) => (
                <p key={i} className="prose-p text-sm md:text-base">
                  {para}
                </p>
              ))}
            </article>
          </div>

          {/* Right: sidebar */}
          <aside className="lg:col-span-5 space-y-8 lg:sticky lg:top-20">
            {/* Info card */}
            <div className="p-6 rounded-2xl dark:bg-white/[0.02] bg-black/[0.02] dark:border dark:border-white/8 border border-black/8 space-y-5">
              {/* Quick info */}
              <div className="grid grid-cols-2 gap-5">
                {project.role && (
                  <div>
                    <span className="info-label">Role</span>
                    <span className="info-value text-sm">{project.role}</span>
                  </div>
                )}
                {project.year && (
                  <div>
                    <span className="info-label">Year</span>
                    <span className="info-value">{project.year}</span>
                  </div>
                )}
                <div>
                  <span className="info-label">Category</span>
                  <span className="info-value text-sm" style={{ color: accent }}>{project.category}</span>
                </div>
                {project.status && (
                  <div>
                    <span className="info-label">Status</span>
                    <span className="info-value text-sm" style={{ color: status?.color }}>{project.status}</span>
                  </div>
                )}
              </div>

              <div className="section-divider" />

              {/* Tags */}
              <div>
                <span className="info-label mb-3">
                  <FaTag className="inline w-2.5 h-2.5 mr-1.5" />
                  Tech Stack
                </span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="detail-tag"
                      style={{
                        color: accent,
                        backgroundColor: accent + "10",
                        border: `1px solid ${accent}25`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="section-divider" />

              {/* CTAs */}
              <div className="flex flex-col gap-2">
                {project.links.live && project.links.live !== "#" && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-primary inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-primary text-black font-bold"
                    aria-label={`Open ${project.title} live site`}
                  >
                    <FaArrowUpRightFromSquare className="w-3.5 h-3.5" />
                    View Live Site
                  </a>
                )}
                {project.links.github && project.links.github !== "#" && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-secondary inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg text-foreground/70"
                    aria-label={`Open ${project.title} GitHub repository`}
                  >
                    <FaGithub className="w-4 h-4" />
                    View on GitHub
                  </a>
                )}
              </div>
            </div>

            {/* Highlights card */}
            {project.highlights.length > 0 && (
              <div className="p-6 rounded-2xl dark:bg-white/[0.02] bg-black/[0.02] dark:border dark:border-white/8 border border-black/8">
                <h3
                  className="text-xs tracking-[0.25em] uppercase text-primary mb-5"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Key Highlights
                </h3>
                <ul className="space-y-3">
                  {project.highlights.map((item, i) => (
                    <li key={i} className="highlight-item text-sm" style={{ color: "var(--text-dimmer)" }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        {/* ── Bottom navigation — other projects ── */}
        <div className="mt-20 pt-10 border-t dark:border-white/8 border-black/8">
          <p
            className="text-xs tracking-[0.25em] uppercase text-primary mb-6"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Other Projects
          </p>
          <div className="flex flex-wrap gap-2">
            {projects
              .filter((p) => p.slug !== slug)
              .slice(0, 5)
              .map((p) => {
                const pAccent = categoryColor[p.category] ?? "#1DCD9F";
                return (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="proj-nav-link inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm dark:text-white/60 text-black/60"
                    style={{
                      border: `1px solid ${pAccent}20`,
                      backgroundColor: `${pAccent}06`,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: pAccent }}
                    />
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem" }}>
                      {p.title}
                    </span>
                  </Link>
                );
              })}
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border dark:border-white/10 border-black/10 text-sm dark:text-white/40 text-black/40 hover:text-primary hover:border-primary/30 transition-all duration-200"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem" }}
            >
              View all →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
