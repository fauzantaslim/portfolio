import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white selection:bg-primary/30 selection:text-white p-6 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary-dark/10 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="z-10 text-center flex flex-col items-center">
        <h1 className="text-8xl md:text-9xl font-bold text-primary mb-4 glow-text">
          404
        </h1>
        <h2 className="text-2xl md:text-4xl font-bold mb-6">
          Page Not <span className="text-primary">Found</span>
        </h2>
        <p className="text-neutral-light max-w-md mx-auto mb-10 text-lg">
          Oops! It seems like the page you are looking for has been moved, deleted,
          or never existed in the first place.
        </p>

        <Link
          href="/"
          className="group flex items-center gap-2 px-8 py-3.5 bg-primary text-black font-semibold rounded-full hover:bg-primary-dark transition-all duration-300 hover:shadow-[0_0_30px_rgba(29,205,159,0.3)]"
        >
          <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
