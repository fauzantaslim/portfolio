export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string[];
  highlights: string[];
  images: string[];   // index 0 = hero/thumbnail
  category: "Web" | "API" | "Manual Test" | "Automation Test" | "Bug Reporting";
  tags: string[];
  links: { github?: string; live?: string };
  role?: string;
  year?: string;
  status?: "Live" | "In Development" | "Archived";
};

export const projects: Project[] = [
  {
    slug: "articles-website",
    title: "Articles Website",
    role: "Full Stack Developer",
    year: "2025",
    status: "Live",
    shortDescription:
      "Build a web application for Islamic news articles with a focus on user experience and accessibility.",
    longDescription: [
      "This project is a full-featured Islamic news article platform built with Laravel, designed to provide a clean and accessible reading experience for Muslim readers across Indonesia.",
      "The platform supports article browsing by category, full-text search, and a responsive layout that works seamlessly across devices. Special attention was given to readability — typography choices, line spacing, and contrast ratios were optimized for long-form content consumption.",
      "The CMS backend allows editors to manage articles, categories, and media through an intuitive admin panel. Images are processed and served efficiently to maintain performance even on slower mobile connections.",
    ],
    highlights: [
      "Full CMS with role-based access for editors and admins",
      "Category-based browsing with dynamic filtering",
      "Full-text search across articles and categories",
      "Responsive layout optimized for mobile readers",
      "SEO-friendly URLs, meta tags, and structured data",
      "Image optimization pipeline for fast loading",
    ],
    images: ["/religi-id.png"],
    category: "Web",
    tags: ["Laravel", "PHP", "MySQL", "Tailwind CSS"],
    links: { live: "https://religi.id" },
  },
  {
    slug: "simaru-api",
    title: "SIMARU API",
    role: "Backend Developer",
    year: "2025",
    status: "Live",
    shortDescription:
      "RESTful API for a Hospital Asset Management System with focus on reliability and scalability.",
    longDescription: [
      "SIMARU (Sistem Informasi Manajemen Aset RS UMMI) is a comprehensive REST API built for RS UMMI Bogor's internal asset management operations. The system manages the full lifecycle of hospital assets — from procurement and registration to depreciation and disposal.",
      "The API is built with TypeScript and Express, backed by MySQL with Sequelize ORM. Database schema was carefully designed to support complex relationships between assets, departments, vendors, and maintenance records. The schema supports the entire asset management workflow without data redundancy.",
      "Security was a primary concern given the sensitive nature of hospital operations. The system implements JWT-based authentication, role-based access control (RBAC), and comprehensive audit logging for all write operations.",
      "Integration features include WhatsApp push notifications for procurement approvals, QR code generation for physical asset labeling, and Excel export for regulatory reporting.",
    ],
    highlights: [
      "Full asset lifecycle: procurement → registration → depreciation → disposal",
      "JWT authentication with fine-grained RBAC (6 roles)",
      "Automated depreciation calculation (straight-line & double-declining)",
      "WhatsApp notification integration for approval workflows",
      "QR code generation for physical asset tagging",
      "Excel export for financial and audit reporting",
      "Swagger/OpenAPI documentation",
      "Automated integration test suite",
    ],
    images: ["/simaru.png"],
    category: "API",
    tags: ["TypeScript", "Express", "MySQL", "Sequelize"],
    links: { github: "https://github.com/fauzantaslim/api-simaru" },
  },
  {
    slug: "asia-tiga-utama",
    title: "Asia Tiga Utama",
    role: "Full Stack Developer",
    year: "2026",
    status: "Live",
    shortDescription:
      "Company profile website for Asia Tiga Utama with services, blog, portfolio, and contact features.",
    longDescription: [
      "Asia Tiga Utama's company profile website was built to establish a professional digital presence for the company. The site communicates brand identity, service offerings, and company values through a modern and clean design.",
      "Key sections include company overview, detailed service pages, project portfolio gallery, team profiles, blog/news section, and a contact form with email integration. The admin panel (Filament) gives the team full control over all content without needing developer involvement.",
      "Performance was a priority — images are lazy-loaded and compressed, critical CSS is inlined, and the server is configured with Nginx caching for fast time-to-first-byte.",
    ],
    highlights: [
      "Responsive multi-section company profile layout",
      "Filament-powered CMS for non-technical content management",
      "Dynamic services, portfolio gallery, and blog sections",
      "Contact form with email notification",
      "SEO metadata and Open Graph tags per page",
      "Nginx + Laravel caching for performance",
    ],
    images: ["/asia-tiga-utama.png"],
    category: "Web",
    tags: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Filament"],
    links: {
      live: "https://evenly.fauzantaslim.biz.id/",
      github: "https://github.com/fauzantaslim/asia-tiga-utama-company-profile",
    },
  },
  {
    slug: "finance-tracker-api",
    title: "Finance Tracker API",
    role: "Backend Developer",
    year: "2026",
    status: "Live",
    shortDescription:
      "RESTful API for a Finance Tracker App with modular architecture and JWT auth.",
    longDescription: [
      "The Finance Tracker API powers a personal finance management application with a focus on clean architecture and developer experience. Built with TypeScript and Express, the API follows a layered architecture pattern with clear separation of controllers, services, and data access layers.",
      "Knex.js was chosen as the query builder for its flexibility and migration tooling, allowing the database schema to evolve safely over time. JWT authentication secures all endpoints, with refresh token rotation for session management.",
      "The API exposes endpoints for transaction management (income/expense), budget tracking, category management, and analytics aggregation — providing everything the frontend needs to render financial dashboards and reports.",
    ],
    highlights: [
      "Layered TypeScript architecture (controller → service → repository)",
      "JWT authentication with refresh token rotation",
      "Transaction management: income, expense, transfer",
      "Budget tracking with period-based limits",
      "Analytics endpoints for dashboard charts",
      "Knex.js migrations for schema versioning",
      "Input validation with detailed error responses",
    ],
    images: ["/finance-tracker.png"],
    category: "API",
    tags: ["TypeScript", "Express", "MySQL", "Knex"],
    links: {
      github:
        "https://github.com/fauzantaslim/finance-tracker-app/tree/main/backend-finance-tracker",
    },
  },
  {
    slug: "finance-tracker-web",
    title: "Finance Tracker Web",
    role: "Frontend Developer",
    year: "2026",
    status: "Live",
    shortDescription:
      "Finance Tracker App with transaction tracking, budget management, and expense visualization.",
    longDescription: [
      "The Finance Tracker web application gives users a clear, visual overview of their personal finances. Built with React and Tailwind CSS, the app connects to the Finance Tracker API to provide real-time transaction and budget data.",
      "The UI features interactive charts for expense breakdown by category, spending trends over time, and budget utilization meters. Framer Motion was used for smooth page transitions and micro-interactions that make the app feel polished and responsive.",
      "The dashboard is designed around the key user need: understanding where money goes at a glance. Card-based layouts, color-coded categories, and summary widgets provide immediate insight without cognitive overload.",
    ],
    highlights: [
      "Interactive pie and bar charts for spending analysis",
      "Budget vs actual spending progress indicators",
      "Transaction timeline with filter and search",
      "Animated transitions with Framer Motion",
      "Responsive layout for desktop and mobile",
      "Real-time updates via API polling",
    ],
    images: ["/finance-tracker.png"],
    category: "Web",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    links: {
      github:
        "https://github.com/fauzantaslim/finance-tracker-app/tree/main/finance-tracker-react",
    },
  },
  {
    slug: "manual-test-simaru",
    title: "Manual Test SIMARU Web",
    role: "QA Engineer",
    year: "2025",
    status: "Archived",
    shortDescription:
      "Comprehensive manual test case documentation for the SIMARU hospital asset management web app.",
    longDescription: [
      "This project encompasses the full manual testing effort for the SIMARU web application — the frontend interface of the hospital asset management system. The test plan covers all core modules: user management, asset registration, procurement workflow, stock opname (inventory audit), and financial reporting.",
      "Test cases were written following industry-standard formats, documenting preconditions, test steps, expected results, and actual results. Each test case is mapped to specific functional requirements to ensure complete coverage.",
      "Testing was conducted across multiple browsers and device types, with special attention to edge cases and boundary conditions that commonly cause failures in form-heavy enterprise applications.",
    ],
    highlights: [
      "100+ test cases across all SIMARU modules",
      "Requirement traceability matrix linking tests to specs",
      "Cross-browser testing (Chrome, Firefox, Edge)",
      "Boundary value analysis and equivalence partitioning",
      "Bug reports with severity classification and reproduction steps",
      "Test summary report with pass/fail metrics",
    ],
    images: ["/simaru.png"],
    category: "Manual Test",
    tags: ["Manual Test", "Test Case"],
    links: { live: "https://shorturl.at/smXcw" },
  },
  {
    slug: "axomock",
    title: "AxoMock",
    role: "Full Stack Developer",
    year: "2026",
    status: "Live",
    shortDescription:
      "Free API mocking platform for frontend developers — realistic mock data in seconds, no backend needed.",
    longDescription: [
      "AxoMock is a developer tool that eliminates the 'waiting for backend' bottleneck in frontend development. Frontend developers can immediately consume realistic, structured API responses without needing a running backend server.",
      "The platform provides ready-to-use REST endpoints for common data types: users, posts, comments, todos, and products — all returning properly structured JSON with realistic data. A visual Mock Builder lets developers configure custom response shapes through a point-and-click interface.",
      "Built with Node.js and Express, the platform is open-source and fully self-hostable. The documentation covers all available endpoints, query parameters, pagination, filtering, and response formats — making it immediately useful with minimal learning curve.",
    ],
    highlights: [
      "Pre-built endpoints: users, posts, comments, todos, products",
      "Visual Mock Builder for custom response schemas",
      "Pagination, filtering, and sorting support",
      "Open-source and self-hostable",
      "Full API documentation with code examples",
      "Zero configuration — ready to use immediately",
    ],
    images: ["/axomock.png"],
    category: "Web",
    tags: ["Node.js", "Express", "JavaScript", "EJS"],
    links: {
      github: "https://github.com/fauzantaslim/AxoMock",
      live: "https://axomock.fauzantaslim.biz.id/",
    },
  },
  {
    slug: "finlogy",
    title: "Finlogy",
    role: "Full Stack Developer",
    year: "2026",
    status: "Live",
    shortDescription:
      "Financial education media platform covering personal finance, investment, and financial planning for Indonesian readers.",
    longDescription: [
      "Finlogy is a financial literacy platform designed for Indonesian readers who want to improve their understanding of personal finance, investment, and long-term financial planning. The platform presents complex financial concepts in an accessible, editorial format.",
      "The content architecture features a multi-category article system with a curated featured post section, author profiles, and tag-based navigation. A dark/light mode toggle and clean typography choices prioritize reading comfort for long-form financial content.",
      "The CMS is built on Filament, giving the editorial team a powerful yet easy-to-use interface for managing articles, categories, and media. Social media sharing integrations drive organic content distribution.",
    ],
    highlights: [
      "Multi-category financial education article platform",
      "Featured post system with editorial curation",
      "Dark/light mode for reading comfort",
      "Author profiles and bylines",
      "Tag-based content navigation",
      "Social media sharing integration",
      "Filament CMS for editorial management",
    ],
    images: ["/finlogy.png"],
    category: "Web",
    tags: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Filament"],
    links: {
      live: "https://finlogy.fauzantaslim.biz.id/",
      github: "https://github.com/fauzantaslim/finlogy",
    },
  },
  {
    slug: "goalpedia",
    title: "Goalpedia",
    role: "Full Stack Developer",
    year: "2026",
    status: "Live",
    shortDescription:
      "Indonesian football news and statistics portal covering Timnas, club news, competitions, and live updates.",
    longDescription: [
      "Goalpedia is a comprehensive Indonesian football media portal, designed to be the go-to destination for fans of the national team (Timnas) and domestic leagues. The platform aggregates news, match updates, player profiles, and statistical data in one place.",
      "The editorial layout features a hot news ticker, featured story carousels, deep-dive insight articles, and structured statistics sections. Category navigation covers national team news, club news, competition brackets, and player profiles.",
      "Built with performance in mind — article pages load fast with proper image optimization and strategic caching. SEO was a core requirement, with structured data for sports articles and proper canonical URL management.",
    ],
    highlights: [
      "National team and club news coverage",
      "Live match update ticker",
      "Player profile pages with career stats",
      "Competition bracket and standings",
      "Featured story carousel for editorial control",
      "Sports-article structured data for Google",
      "Filament CMS for content management",
    ],
    images: ["/goalpedia.png"],
    category: "Web",
    tags: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Filament"],
    links: {
      live: "https://goalpedia.fauzantaslim.biz.id/",
      github: "https://github.com/fauzantaslim/goalpedia",
    },
  },
  {
    slug: "nusantara-tools",
    title: "NusantaraTools",
    role: "Full Stack Developer",
    year: "2026",
    status: "Live",
    shortDescription:
      "Free all-in-one productivity platform for Indonesian users: Split Bill, Pomodoro, Prayer Schedule, and more.",
    longDescription: [
      "NusantaraTools is a productivity toolkit built for the everyday needs of Indonesian students and workers. The platform bundles essential daily tools into a single, fast, and mobile-friendly web application.",
      "Current tools include a Split Bill calculator (for warung and group meals), a Pomodoro timer for focused work sessions, and a Prayer Schedule feature that uses GPS to fetch accurate prayer times for the user's location.",
      "Built with Next.js and TypeScript, the app prioritizes speed and offline capability. The interface is intentionally minimal — tools should get out of the way and let users focus on their task.",
    ],
    highlights: [
      "Split Bill calculator with custom per-person adjustments",
      "Pomodoro timer with work/break session tracking",
      "GPS-based prayer schedule (accurate for all Indonesian cities)",
      "Progressive Web App (PWA) installable on mobile",
      "Zero account required — all tools work instantly",
      "Works offline after first load",
    ],
    images: ["/nusantaratools.png"],
    category: "Web",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    links: {
      live: "https://nusantaratools.my.id/",
      github: "https://github.com/fauzantaslim/nusantara-tools",
    },
  },
  {
    slug: "warisanq",
    title: "WarisanQ",
    role: "Backend Engineer",
    year: "2026",
    status: "Live",
    shortDescription:
      "Islamic inheritance calculator (Faraidh & KHI) with automatic family tree diagram and transparent heir distribution.",
    longDescription: [
      "WarisanQ addresses a real and underserved need: accurate, transparent Islamic inheritance calculation that's accessible to ordinary Indonesian families. Islamic inheritance law (Faraidh) is notoriously complex — the distribution depends on which heirs are present, their gender, relationship to the deceased, and whether certain heirs block others.",
      "The calculator implements both Mazhab Syafi'i (traditional Islamic law) and the Indonesian Islamic Law Compilation (KHI), allowing users to compare results between the two frameworks. Calculation logic was carefully verified against established Faraidh references.",
      "The visual family tree diagram automatically generates based on the heirs the user declares, showing inheritance shares as fractions and percentages. The estate (tirkah) input lets users get actual Rupiah figures for each heir's portion.",
      "Built as an open-source project in collaboration with Resky89, the codebase is structured for extensibility — additional mazhab support and more complex estate scenarios can be added without architectural changes.",
    ],
    highlights: [
      "Supports Mazhab Syafi'i and KHI (Indonesian Islamic Law)",
      "Auto-generated visual family tree with share visualization",
      "Tirkah (estate value) input for real Rupiah calculation",
      "Transparent fraction and percentage breakdown per heir",
      "Hajb (blocking) rules correctly implemented",
      "Open-source and peer-reviewed calculation logic",
      "Mobile-first responsive design",
    ],
    images: ["/warisanq.png"],
    category: "Web",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    links: {
      live: "https://warisanq.web.id/",
      github: "https://github.com/Resky89/WarisanQ-2.0",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
