# Spec: Add Project — Semplak Barat Adventure (Rafting Online Booking)

Add a new web project entry to Fauzan's portfolio for the community service (PKM) project: **Semplak Barat Adventure (Sistem Booking Online Wisata Rafting)**.

## Project Background & Overview

- **Project Name:** Semplak Barat Adventure
- **Full Title / Subtitle:** Sistem Booking Online Wisata Rafting (BUMDes Semplak Barat)
- **Initiative:** Program Pengabdian Kepada Masyarakat (PKM)
- **Target Partner:** BUMDes Semplak Barat, Kemang, Kabupaten Bogor
- **Role:** Full Stack Developer
- **Category:** `Web`
- **Core Value:** Digitizes the manual booking workflow of community river rafting tourism into a unified web reservation system, handling customer booking, slot management across guides & boats, Midtrans payment gateway, and dedicated dashboards for administrators and river guides (*pemandu*).

## Data Schema & Content (`lib/projects-data.ts`)

```typescript
{
  slug: "semplak-barat-adventure",
  title: "Semplak Barat Adventure",
  role: "Full Stack Developer",
  year: "2025",
  status: "Live",
  shortDescription:
    "Web-based online reservation and scheduling system for river rafting tourism under BUMDes Semplak Barat, Bogor.",
  longDescription: [
    "Semplak Barat Adventure is a web-based reservation platform developed as a Community Service (PKM) initiative to empower local river rafting tourism under BUMDes Semplak Barat in Kemang, Bogor.",
    "The system streamlines the booking process for tourists and management alike: visitors can explore rafting packages (5 KM family route or 12 KM adventure route), select dates and times, check boat and guide slot availability, and proceed to secure online payment via Midtrans.",
    "For operational efficiency, the platform provides dedicated multi-role portals: an Admin Dashboard to manage boats, river guides, tour packages, website content, and monitor revenue trends, plus a Guide Portal where river guides view daily assignments and trip schedules."
  ],
  highlights: [
    "End-to-end tourist reservation flow with automated boat and guide slot availability check",
    "Dynamic package selection (5 KM & 12 KM routes) with real-time price calculation",
    "Secure payment gateway integration with Midtrans for automated transaction verification",
    "Centralized Admin Management Portal for fleet, guides, packages, and web content",
    "Admin analytics dashboard monitoring booking trends, revenue, and order status",
    "Dedicated Guide (Pemandu) Portal for viewing daily rafting schedules and assignment history",
    "Responsive design optimized for both mobile tourist bookings and desktop management"
  ],
  images: [
    "/rafting-1.jpg",
    "/rafting-2.jpg",
    "/rafting-3.jpg",
    "/rafting-4.jpg"
  ],
  category: "Web",
  tags: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Midtrans"],
  links: {}
}
```

## Asset Strategy

The images have already been placed in `public/`:
1. `/rafting-1.jpg` (Hero / Landing Page)
2. `/rafting-2.jpg` (Booking & Midtrans Checkout)
3. `/rafting-3.jpg` (Admin Dashboard & Analytics)
4. `/rafting-4.jpg` (Pemandu Schedule Dashboard)

## Component Touch-points

- `lib/projects-data.ts`: Added the new `Project` object to the `projects` array.
- `components/ProjectsSection.tsx`: Automatically renders the new card in the stack under the `"All"` and `"Web"` category filters.
- `app/projects/[slug]/page.tsx`: Statically generates the detail route `/projects/semplak-barat-adventure`.
- `app/projects/[slug]/ProjectDetailClient.tsx`: Displays details, highlights, tags, and renders `ProjectImageSlider`.
- `components/ProjectImageSlider.tsx`: Renders all 4 screenshots in an interactive carousel with Fancybox lightbox support.

## References

- [`lib/projects-data.ts`](file:///c:/Users/fauza/Documents/About%20Me/portfolio/lib/projects-data.ts)
- [`components/ProjectsSection.tsx`](file:///c:/Users/fauza/Documents/About%20Me/portfolio/components/ProjectsSection.tsx)
- [`app/projects/[slug]/page.tsx`](file:///c:/Users/fauza/Documents/About%20Me/portfolio/app/projects/%5Bslug%5D/page.tsx)
- [`components/ProjectImageSlider.tsx`](file:///c:/Users/fauza/Documents/About%20Me/portfolio/components/ProjectImageSlider.tsx)

## Tasks

- [x] 1. Add `semplak-barat-adventure` entry to `lib/projects-data.ts` using `/rafting-1.jpg` to `/rafting-4.jpg`.
- [x] 2. Verify static generation, type safety (`tsc --noEmit`), and carousel display on `/projects/semplak-barat-adventure`.
