# Fauzan Taslim Hidayat — Portfolio Website

Personal portfolio website built with **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**. Showcases my background as a Software Quality Engineer, including skills, experience, and projects — with smooth GSAP/Motion animations and a polished dark-themed UI.

🌐 **Live site:** [fauzantaslim.my.id](https://fauzantaslim.my.id)

---

## ✨ Features

- **Animated Preloader** — entrance animation before the page reveals
- **Responsive Navbar** — smooth scroll navigation with active-section tracking
- **Hero Section** — animated introduction with dynamic text
- **About Section** — personal background and role summary
- **Stack Section** — interactive icon cloud showcasing tech stack
- **Experience Section** — GSAP scroll-pinned career timeline
- **Projects Section** — highlighted work with descriptions and links
- **Contact Section** — email and social links
- **Footer** — clean footer with credits
- **SEO-ready** — OpenGraph, Twitter Card, JSON-LD structured data, `robots.ts`, `sitemap.ts`

---

## 🛠 Tech Stack

| Category        | Technology                            |
|-----------------|---------------------------------------|
| Framework       | [Next.js 16](https://nextjs.org) (App Router) |
| Language        | TypeScript 5                          |
| Styling         | Tailwind CSS v4                       |
| Animations      | [GSAP 3](https://gsap.com) + [Motion](https://motion.dev) |
| UI Components   | [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com) |
| Icons           | [React Icons](https://react-icons.github.io/react-icons/) |
| Fonts           | Geist Sans & Geist Mono (via `next/font`) |
| Utilities       | clsx, tailwind-merge, class-variance-authority |

---

## 📁 Project Structure

```
portofolio-website/
├── app/
│   ├── layout.tsx        # Root layout (metadata, fonts, preloader)
│   ├── page.tsx          # Home page — assembles all sections
│   ├── globals.css       # Global styles and CSS variables
│   ├── not-found.tsx     # Custom 404 page
│   ├── robots.ts         # robots.txt generation
│   └── sitemap.ts        # sitemap.xml generation
│
├── components/
│   ├── Preloader.tsx       # Page entrance animation
│   ├── Navbar.tsx          # Navigation bar
│   ├── HeroSection.tsx     # Hero / landing section
│   ├── AboutSection.tsx    # About me section
│   ├── StackSection.tsx    # Tech stack showcase (icon cloud)
│   ├── ExperienceSection.tsx # Career timeline
│   ├── ProjectsSection.tsx # Projects showcase
│   ├── ContactSection.tsx  # Contact information
│   ├── Footer.tsx          # Footer
│   └── ui/
│       ├── icon-cloud.tsx  # Interactive 3D icon cloud
│       ├── lens.tsx        # Lens/magnifier UI effect
│       ├── particles.tsx   # Particle background animation
│       └── retro-grid.tsx  # Retro grid background
│
├── lib/
│   └── utils.ts            # Utility functions (cn helper)
│
├── public/                 # Static assets (images, icons, SVGs)
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** (or yarn / pnpm / bun)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/fauzantaslim/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Available Scripts

| Script          | Description                            |
|-----------------|----------------------------------------|
| `npm run dev`   | Start the development server           |
| `npm run build` | Build for production                   |
| `npm run start` | Start the production server            |
| `npm run lint`  | Run ESLint                             |

---

## 🌍 Deployment

This project is optimized for deployment on **Vercel**.

1. Push your code to GitHub.
2. Import the repository at [vercel.com/new](https://vercel.com/new).
3. Vercel will auto-detect Next.js and deploy automatically.

> Make sure to update the `url` field in `app/page.tsx` (JSON-LD) and `app/layout.tsx` (OpenGraph) with your actual production domain before deploying.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
