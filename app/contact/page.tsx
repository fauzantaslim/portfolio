export default function ContactPage() {
  return (
    <section className="space-y-6">
      <div className="retro-shell p-8 md:p-10">
        <p className="retro-chip w-fit">Contact</p>
        <h1 className="retro-title mt-4 text-3xl md:text-4xl">Let&apos;s Build Something</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 md:text-base">
          Halaman ini bisa kamu isi dengan email, nomor WhatsApp, atau link sosial media. Supaya
          cepat dipakai, aku isi dulu dengan template kontak yang nanti gampang kamu edit.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <article className="retro-panel p-5">
          <h2 className="retro-title text-base">Email</h2>
          <p className="mt-3 text-sm">yourname@email.com</p>
        </article>
        <article className="retro-panel p-5">
          <h2 className="retro-title text-base">LinkedIn</h2>
          <p className="mt-3 text-sm">linkedin.com/in/yourname</p>
        </article>
        <article className="retro-panel p-5">
          <h2 className="retro-title text-base">GitHub</h2>
          <p className="mt-3 text-sm">github.com/yourname</p>
        </article>
      </div>
    </section>
  );
}
