export default function AboutPage() {
  return (
    <section className="space-y-6">
      <div className="retro-shell p-8 md:p-10">
        <p className="retro-chip w-fit bg-[var(--accent-3)] text-white">About</p>
        <h1 className="retro-title mt-4 text-3xl md:text-4xl">Who Am I?</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 md:text-base">
          Ini area untuk menceritakan latar belakang kamu, pengalaman, dan gaya kerja. Kamu
          bisa isi bagian ini dengan cerita singkat tentang perjalanan sebagai developer, tools
          favorit, dan tipe project yang paling kamu suka.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <article className="retro-panel p-5">
          <h2 className="retro-title text-base">Experience Snapshot</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6">
            <li>- Frontend projects for landing page & dashboard.</li>
            <li>- Building reusable component systems.</li>
            <li>- Performance tuning and UI animations.</li>
          </ul>
        </article>
        <article className="retro-panel p-5">
          <h2 className="retro-title text-base">Tools I Use</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6">
            <li>- Next.js / React</li>
            <li>- Tailwind CSS</li>
            <li>- GSAP for motion interactions</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
