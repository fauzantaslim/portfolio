export default function Home() {
  const skills = [
    "Javascript",
    "Typescript",
    "Express Js",
    "PHP",
    "Laravel",
    "Postman",
    "Playwright",
    "Cucumber",
    "Bug Reporting",
    "GIT",
    "SQL",
    "Docker",
  ];

  return (
    <section className="space-y-8">
      <div className="retro-shell p-8 md:p-10">
        <span className="retro-chip">Available for work</span>
        <h1 className="retro-title mt-4 text-3xl leading-tight md:text-5xl">
          Creative Developer with Retro Vibes
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 md:text-base">
          Halo! Ini template homepage portofolio kamu. Bagian ini cocok untuk intro singkat,
          positioning kamu, dan value utama yang ingin dilihat recruiter atau client.
        </p>
      </div>

      <div className="retro-panel p-6 md:p-8">
        <h2 className="retro-title text-xl md:text-2xl">Stack I Used Skills</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {skills.map((skill) => (
            <span
              key={skill}
              className="retro-link inline-flex items-center justify-center px-3 py-2 text-center text-xs font-bold uppercase md:text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
