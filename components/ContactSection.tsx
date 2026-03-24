"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaEnvelope, FaLocationDot, FaPaperPlane, FaLinkedin, FaGithub } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".contact-title",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".contact-info",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".contact-grid",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".contact-form",
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".contact-grid",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="section-container relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="contact-title text-primary font-mono text-sm tracking-widest uppercase mb-3">
            Get In Touch
          </p>
          <h2 className="contact-title text-3xl md:text-5xl font-bold">
            Contact <span className="text-primary">Me</span>
          </h2>
        </div>

        <div className="contact-grid grid md:grid-cols-2 gap-12 lg:gap-24 items-start max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="contact-info space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Let&apos;s talk about your next project</h3>
              <p className="text-neutral-light leading-relaxed">
                Whether you have a question about my QA processes, want to discuss a potential
                collaboration, or just want to say hi, my inbox is always open.
              </p>
            </div>

            <div className="space-y-6">
              <a href="mailto:fauzantaslim123@gmail.com" className="group flex items-center gap-4 text-neutral-light hover:text-primary transition-colors" aria-label="Email me at hello@example.com">
                <div className="p-4 rounded-full bg-card-bg border border-card-border group-hover:border-primary/50 transition-colors">
                  <FaEnvelope className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-mono text-sm text-neutral-light/70 mb-1">Email</p>
                  <p className="text-lg">fauzantaslim123@gmail.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4 text-neutral-light group" aria-label="Located in Bogor, Indonesia">
                <div className="p-4 rounded-full bg-card-bg border border-card-border group-hover:border-primary/50 transition-colors">
                  <FaLocationDot className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-mono text-sm text-neutral-light/70 mb-1">Location</p>
                  <p className="text-lg">Bogor, Indonesia</p>
                </div>
              </div>
            </div>


          </div>

          {/* Contact Form */}
          <div className="contact-form p-8 rounded-2xl bg-card-bg border border-card-border shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-light mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black border border-card-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-white"
                  placeholder="Your Name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-light mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black border border-card-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-white"
                  placeholder="Your Email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-light mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-black border border-card-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-white resize-none"
                  placeholder="Your Message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group flex items-center justify-center gap-2 px-8 py-4 bg-primary text-black font-semibold rounded-lg hover:bg-primary-dark transition-all duration-300 disabled:opacity-70"
                aria-live="polite"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : isSubmitted ? (
                  "Message Sent!"
                ) : (
                  <>
                    Send Message
                    <FaPaperPlane className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
