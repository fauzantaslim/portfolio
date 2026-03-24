const projects = [
  {
    title: "Portfolio Website",
    stack: "Next.js, Tailwind, GSAP",
    description: "Personal branding website dengan visual retro dan page transition.",
  },
  {
    title: "Finance Tracker",
    stack: "React, TypeScript, Express",
    description: "Aplikasi pencatatan keuangan dengan dashboard ringkas dan laporan bulanan.",
  },
  {
    title: "QA Automation Suite",
    stack: "Playwright, Cucumber, Postman",
    description: "End-to-end testing dan API testing untuk mempercepat regression cycle.",
  },
];

export default function ProjectsPage() {
  return (
    <section className="space-y-6">
      <div className="retro-shell p-8 md:p-10">
        <p className="retro-chip w-fit bg-[var(--accent)] text-white">Projects</p>
        <h1 className="retro-title mt-4 text-3xl md:text-4xl">Things I Have Built</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 md:text-base">
          Halaman ini untuk menampilkan project unggulan kamu. Nanti bisa kamu isi link demo,
          repository, screenshot, dan impact dari setiap project.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {projects.map((project) => (
          <article key={project.title} className="retro-panel p-5">
            <h2 className="retro-title text-base">{project.title}</h2>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#118ab2]">
              {project.stack}
            </p>
            <p className="mt-3 text-sm leading-6">{project.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
