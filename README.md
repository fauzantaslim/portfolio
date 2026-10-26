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
│   ├── api/
│   │   └── contact/
│   │       └── route.ts  # Contact Form API (Resend, Turnstile, Rate limit)
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
│   ├── ContactSection.tsx  # Contact form with Turnstile & honeypot
│   ├── Footer.tsx          # Footer
│   └── ui/
│       ├── icon-cloud.tsx  # Interactive 3D icon cloud
│       ├── lens.tsx        # Lens/magnifier UI effect
│       ├── particles.tsx   # Particle background animation
│       └── retro-grid.tsx  # Retro grid background
│
├── lib/
│   ├── rate-limit.ts       # Upstash Redis sliding window limiter
│   ├── turnstile.ts        # Cloudflare Turnstile token siteverify
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

### 🛡️ Production & Contact API Deployment Checklist

Before or right after deploying to production on Vercel, follow this security & configuration checklist:

1. **Configure Environment Variables in Vercel** (`Settings` → `Environment Variables`):
   - `RESEND_API_KEY`: Secret key from [resend.com/api-keys](https://resend.com/api-keys). *(Visibility: Secret)*
   - `CONTACT_EMAIL_TO`: Recipient inbox (`fauzantaslim123@gmail.com`). *(Visibility: Secret)*
   - `CONTACT_EMAIL_FROM`: `Portfolio Contact Form <onboarding@resend.dev>` (or your verified domain). *(Visibility: Secret)*
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: Client site key from Cloudflare Turnstile dashboard. *(Visibility: Plaintext / Config)*
   - `TURNSTILE_SECRET_KEY`: Server secret key from Cloudflare Turnstile dashboard. *(Visibility: Secret)*

2. **Connect Upstash Redis Rate Limiting** (1-Click via Vercel Storage):
   - Go to your Vercel Project → **Storage** → **Create Database** → Select **Upstash (Redis)**.
   - Choose *Singapore (Southeast)* on the Free plan and click **Connect**.
   - Vercel automatically links the database and injects the `UPSTASH_REDIS_REST_KV_REST_API_*` variables into your deployment.

3. **Cloudflare Turnstile Hostname Restriction**:
   - In Cloudflare Dashboard → **Turnstile** → Select your widget → **Settings**.
   - Under **Allowed Hostnames**, ensure only your production domains are listed (e.g., `fauzantaslim.my.id`, `*.vercel.app`).
   - Remove `localhost` from production widget settings (localhost uses Cloudflare's dummy testing keys).

4. **Enable Vercel Attack Challenge Mode / Bot Protection (WAF)**:
   - In Vercel Project Dashboard → **Security** tab.
   - Verify that Vercel WAF and DDoS mitigation are active to protect edge serverless invocations.

5. **Post-Deploy Smoke Test**:
   - Open your live site at `#contact` in an incognito window.
   - Send a test message with valid details and verify the success screen appears and the email arrives in your inbox.
   - Verify that multiple rapid submissions (>3 messages in an hour from the same IP) display the 429 rate limit warning.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
