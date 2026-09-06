import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/lib/projects-data";
import ProjectDetailClient from "./ProjectDetailClient";

/* ─── Static params for SSG ─────────────────────────────────── */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

/* ─── Dynamic SEO Metadata ───────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  const description = project.shortDescription;
  const ogImage = `https://fauzantaslim.my.id${project.images[0]}`;

  return {
    title: `${project.title} — Project · Fauzan Taslim Hidayat`,
    description,
    keywords: [
      project.title,
      ...project.tags,
      project.category,
      "Fauzan Taslim Hidayat",
      "Portfolio",
    ],
    openGraph: {
      title: `${project.title} — Fauzan Taslim Hidayat`,
      description,
      url: `https://fauzantaslim.my.id/projects/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: project.title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Fauzan Taslim Hidayat`,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: `https://fauzantaslim.my.id/projects/${slug}`,
    },
  };
}

/* ─── Page (Server Component) ────────────────────────────────── */
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  /* JSON-LD structured data */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.shortDescription,
    applicationCategory: project.category,
    author: {
      "@type": "Person",
      name: "Fauzan Taslim Hidayat",
      url: "https://fauzantaslim.my.id",
    },
    ...(project.links.live ? { url: project.links.live } : {}),
    ...(project.year ? { datePublished: project.year } : {}),
    keywords: project.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailClient project={project} slug={slug} />
    </>
  );
}
