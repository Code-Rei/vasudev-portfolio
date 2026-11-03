export const portfolioData = {
  personalDetails: {
    name: "Vasudev Yadav",
    title: "AI-Native Product Owner & Technical Business Analyst",
    tagline: "Bridging Grassroots Financial Operations & AI-Accelerated Software Systems",
    location: "Kota, Rajasthan, India",
    phone: "+91 9983614557",
    email: "vasuy035@gmail.com",
    linkedin: "linkedin.com/in/vasu-dev-yadav",
    linkedinUrl: "https://linkedin.com/in/vasu-dev-yadav",
    github: "github.com/Code-Rei",
    githubUrl: "https://github.com/Code-Rei"
  },
  
  summary: "Pragmatic, AI-augmented Product Owner and Technical Business Analyst who pairs front-line operational leadership (previously directed 76 staff across 36 branches in microfinance lending) with hands-on product design and system execution. Experienced in wireframing in Figma, authoring BRD/PRD specifications, writing practical SQL to validate stored procedures, and guiding 4–6 developers to ship high-impact FinTech SaaS platforms. Leverages modern AI tools to rapidly prototype working MVPs (Go microservices, n8n bots, spatial routing engines) in hours, accelerating delivery 10x.",

  impactMetrics: [
    {
      value: "76 Staff",
      label: "Led Across 36 Branches",
      desc: "Directed microfinance operations, loan disbursements, and YES Bank BC regulatory compliance."
    },
    {
      value: ">40%",
      label: "Cycle Time Reduction",
      desc: "Cut insurance claim and KYC turnaround via automated forms and single-document re-uploads."
    },
    {
      value: "80%",
      label: "Fewer Dev Iterations",
      desc: "Accelerated development using high-fidelity Figma wireframes and visual user flows."
    },
    {
      value: "<350ms",
      label: "Dynamic Render Latency",
      desc: "Built headless browser pooling microservice powering autonomous social media bots."
    }
  ],

  skillCategories: [
    {
      category: "Product & UX Strategy",
      color: "#22C55E",
      skills: [
        "Figma (Wireframes & UI)",
        "BRD / FRD / PRD",
        "User Stories & Acceptance Criteria",
        "User Journey Mapping",
        "Agile / Scrum Sprints",
        "White-Label SaaS Architecture",
        "Developer Sprint Guidance (4-6 Devs)"
      ]
    },
    {
      category: "FinTech & Field Operations",
      color: "#F59E0B",
      skills: [
        "MFI & NBFC Lending Operations",
        "Banking Correspondent (YES Bank BC)",
        "Overdue (OD) & Delinquency Buckets",
        "Field Cash Logistics & Floating Limits",
        "Dynamic UPI QR Repayments",
        "AOCPV Field KYC Workflows",
        "Cashbook Reconciliation"
      ]
    },
    {
      category: "Technical Bridge & Data",
      color: "#38BDF8",
      skills: [
        "Practical SQL (Queries, Joins, Aggregations)",
        "Stored Procedure & Table Type Review",
        "RESTful API & Payload Design",
        "Postman API Testing",
        "IIS Server Hosting & SSL Basics",
        "Disaster Recovery SOP Testing"
      ]
    },
    {
      category: "AI-Native Prototyping",
      color: "#8B5CF6",
      skills: [
        "AI-Directed Engineering (Claude, GPT, Gemini)",
        "n8n Workflow Automation",
        "Multimodal Vision AI (Gemma / Krutrim)",
        "Valhalla TSP & Leaflet GIS",
        "SheetJS Excel Ingestion",
        "Docker & Coolify PaaS Basics"
      ]
    }
  ],

  experience: [
    {
      role: "Business Analyst / Product Owner",
      company: "Kamal Fincap Pvt. Ltd.",
      location: "Kota, Rajasthan",
      duration: "May 2024 – Present",
      type: "Full-Time",
      badge: "Current Role",
      highlights: [
        "Guided a cross-functional engineering pod of 4–6 developers and 1 QA across 11 core financial platforms.",
        "Conceptualized and designed Fieldmate+, a white-label field collection SaaS for NBFCs with Android LO app & Admin web panels.",
        "Authored comprehensive BRDs, PRDs, and user stories while designing high-fidelity wireframes in Figma, slashing UI rework by 80%.",
        "Designed Kamal Connect (Ensure Module), reducing death and hospitalization claim processing time by >40% through automated pre-filled claim forms.",
        "Formulated the business logic for Kamal Analytics (OD & X-Bucket tracker), eliminating manual Excel dependencies.",
        "Wrote practical SQL queries to inspect backend tables, validate stored procedures, and review REST API payload integrity."
      ]
    },
    {
      role: "Team Leader (Field Operations & YES Bank BC)",
      company: "Kamal Fincap Pvt. Ltd.",
      location: "Kota, Rajasthan",
      duration: "Jan 2024 – May 2024",
      type: "Full-Time",
      badge: "Leadership",
      highlights: [
        "Directed a high-performing field team of 76 staff across 36 branches, consistently meeting and exceeding monthly disbursement targets.",
        "Acted as the primary operational liaison with YES Bank Banking Correspondent (BC), ensuring rigorous regulatory compliance.",
        "Monitored delinquency trends and overdue (OD) customer buckets, resolving field roadblocks and managing cashbook closing.",
        "Authored daily operational MIS reports delivering actionable portfolio insights directly to senior executive management."
      ]
    },
    {
      role: "MIS Executive",
      company: "Adani Group (Ambuja Cements Ltd.)",
      location: "Kota, Rajasthan",
      duration: "Mar 2022 – Jan 2024",
      type: "Full-Time",
      badge: "Enterprise",
      highlights: [
        "Administered the SAP MM system to manage sales reporting, customer code creation, and purchase order (PO/PR) lifecycles.",
        "Streamlined procurement and vendor billing workflows, ensuring 100% financial precision in partnership with cross-functional finance teams.",
        "Automated recurring data entry and variance analysis using advanced Excel functions, eliminating administrative bottlenecks."
      ]
    }
  ],

  projects: [
    {
      id: "fieldmate",
      name: "Fieldmate+",
      category: "Enterprise FinTech",
      type: "White-Label Collection & Field Ops SaaS",
      badge: "Flagship Product",
      accent: "#22C55E",
      summary: "Scalable, multi-tenant B2B SaaS platform designed for NBFCs and MFIs to digitize loan servicing, field collections, and branch operations.",
      role: "Product Owner & UX Designer (Guided 4 Developers, 1 QA)",
      techStack: [".NET Core", "Angular", "React Native", "SQL Server", "AWS S3", "REST APIs"],
      highlights: [
        "Designed Loan Officer Android App with selfie-based geo-tagged attendance, center route mapping, and cash denomination tracking.",
        "Integrated dynamic UPI QR payments with real-time expiry countdowns and payment status webhooks to eliminate cash handling risk.",
        "Created Branch Manager & Admin web panels featuring automated cash-lock triggers when floating cash exceeds branch limits."
      ]
    },
    {
      id: "kamal-connect",
      name: "Kamal Connect & Ensure",
      category: "Enterprise FinTech",
      type: "Claims Automation & RegTech Platform",
      badge: ">40% Faster Claims",
      accent: "#38BDF8",
      summary: "Unified enterprise platform that digitized customer KYC verification (AOCPV) and post-credit claim processing (Death & Hospitalization).",
      role: "Product Owner & Systems Architect",
      techStack: [".NET Core", "Angular 19", "React Native", "SQL Server", "Firebase"],
      highlights: [
        "Cut overall claim resolution cycle times by over 40% through automated pre-filled claim forms and instant document routing.",
        "Engineered granular single-document re-upload workflow, ensuring field officers only re-submit rejected documents rather than entire bundles.",
        "Built AOCPV (App-Based On-Customer Personal Verification) with geo-fenced audits and automatic discrepancy re-routing."
      ]
    },
    {
      id: "gst-captcha",
      name: "GST Lookup & Vision AI CAPTCHA Solver",
      category: "AI Microservice",
      type: "GovTech / Vision AI Microservice",
      badge: "AI-Native Go Build",
      accent: "#8B5CF6",
      summary: "High-performance Go microservice and dark-mode glassmorphic dashboard that fetches real-time taxpayer data from services.gst.gov.in.",
      role: "Architect & AI Director (Conceptualized logic, directed AI, tested & deployed)",
      techStack: ["Go 1.22+", "Ola Krutrim Vision AI (Gemma 4)", "Docker", "Vanilla JS", "CookieJar"],
      highlights: [
        "Decodes official GST portal numeric CAPTCHAs automatically using multimodal Vision AI with intelligent auto-retry handling.",
        "Maintains HTTP session cookies (cookiejar) with zero-friction manual fallback mode and live image streaming.",
        "Ultra-lightweight, dependency-free architecture packaged into a sub-25MB multi-stage Alpine Docker container."
      ]
    },
    {
      id: "route-optimizer",
      name: "Route Optimizer & Navigation Dashboard",
      category: "Spatial Logistics",
      type: "TSP & Fuel Calculation Engine",
      badge: "Algorithmic Logistics",
      accent: "#F59E0B",
      summary: "Fleet management and Traveling Salesperson Problem (TSP) solver built to eliminate field collection route disputes and fuel mismatches.",
      role: "Product Designer & Frontend Lead",
      techStack: ["Angular 19", "Leaflet", "Valhalla TSP", "OSRM", "SheetJS (Excel)"],
      highlights: [
        "Balanced greedy clustering assigns collection stops to nearest employee branches, solving TSP for optimal visit order.",
        "Interactive drag-and-drop stop 'hot-shifting' between employee cards with instant real-time route recomputation.",
        "Multi-sheet Excel template generator and export engine detailing turn-by-turn navigation logs for fuel claim auditing."
      ]
    },
    {
      id: "kamal-skillup",
      name: "Kamal SkillUp & HRMS ATS",
      category: "Enterprise FinTech",
      type: "LMS & Automated Resume Bank",
      badge: "75% Faster Onboarding",
      accent: "#10B981",
      summary: "Dual-platform employee training and human resource automation system standardizing onboarding across all company branches.",
      role: "Product Lead & Business Architect",
      techStack: [".NET Core 8", "Angular 19", "React Native", "SQL Server"],
      highlights: [
        "Sequential training workflow engine (Lecture ➔ Quiz gating) reducing field staff onboarding training time from months to weeks.",
        "Conceived the Resume Bank ATS module with automated PDF parsing (name, mobile, designation) and blacklist duplicate warning.",
        "Guided cross-platform compatibility for Android 17 and iOS React Native New Architecture with selfie check-in verification."
      ]
    },
    {
      id: "autonomous-bots",
      name: "Autonomous Bot Suite & Headless Renderer",
      category: "AI Microservice",
      type: "Headless Content & Automation Engine",
      badge: "Sub-350ms Renders",
      accent: "#EC4899",
      summary: "Autonomous publishing ecosystem orchestrating Telegram and Instagram workflows with a high-throughput Playwright image engine.",
      role: "Automation Architect & Builder",
      techStack: ["n8n", "Node.js 22", "Fastify", "Playwright Chromium", "Groq / Ollama"],
      highlights: [
        "48-node Devegya Astro Bot and 35-node Quote Image Bot running scheduled daily cron pipelines with database logging.",
        "Headless HTML-to-image rendering microservice utilizing generic-pool browser tab pre-warming to deliver sub-350ms image renders.",
        "In-memory cached Tailwind CSS injection and spreadsheet-based anti-hallucination data deduplication."
      ]
    },
    {
      id: "kamal-analytics",
      name: "Kamal Analytics & OD Engine",
      category: "Enterprise FinTech",
      type: "Decision Intelligence & BI Platform",
      badge: "Zero Manual Excel",
      accent: "#6366F1",
      summary: "Real-time financial operational intelligence platform delivering role-specific drill-down dashboards for field collection recovery.",
      role: "Analytics Architect & Product Designer",
      techStack: [".NET Core", "Angular 19", "SQL Server", "REST APIs"],
      highlights: [
        "Delinquency trend analysis classifying overdue accounts into 1–30, 31–60, 61–90, and >90 day buckets (OD & X-Bucket).",
        "Hierarchical collection performance dashboards comparing total demand vs. actual collection down to individual loan officers.",
        "Automated report downloader eliminating business team dependency on backend developers for raw data extraction."
      ]
    },
    {
      id: "handmade-tale",
      name: "The Handmade Tale Product Studio",
      category: "Client System",
      type: "Serverless E-Commerce & Lookbook Studio",
      badge: "300 DPI A4 Lookbooks",
      accent: "#D97706",
      summary: "Serverless e-commerce catalog builder and luxury PDF lookbook generator engineered for artisanal craft businesses.",
      role: "Full-Stack Architect & Consultant",
      techStack: ["Google Apps Script", "Google Sheets/Drive", "HTML5 Canvas", "IndexedDB", "html2pdf.js"],
      highlights: [
        "1-Click high-resolution A4 PDF lookbook generator with custom serif typography and category multi-page chunking.",
        "Client-side offscreen Canvas photo downscaling (15MB camera photos ➔ 150KB JPEG), bypassing Google Apps Script upload limits.",
        "Role-based access control (RBAC) separating public catalog browsing with WhatsApp ordering from admin inventory management."
      ]
    }
  ],

  education: [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Modi Institute of Management & Technology",
      location: "Kota, Rajasthan",
      year: "2019 – 2022",
      badge: "Graduation"
    },
    {
      degree: "Senior Secondary (12th Grade)",
      institution: "Board of Secondary Education Rajasthan",
      location: "Kota, Rajasthan",
      year: "2019",
      badge: "Science & Tech"
    },
    {
      degree: "Secondary School (10th Grade)",
      institution: "Board of Secondary Education Rajasthan",
      location: "Kota, Rajasthan",
      year: "2017",
      badge: "Foundation"
    }
  ],

  collaboratorCursors: [
    {
      id: "vasudev",
      name: "Vasudev Yadav",
      role: "Product Owner",
      color: "#22C55E",
      status: "✏️ Designing User Flow in Figma",
      initialX: 15,
      initialY: 20
    },
    {
      id: "ai-copilot",
      name: "AI Co-pilot",
      role: "Vision & Automation",
      color: "#8B5CF6",
      status: "⚡ Solving CAPTCHA with Gemma AI",
      initialX: 75,
      initialY: 35
    },
    {
      id: "lead-dev",
      name: "Dev Lead",
      role: ".NET & SQL",
      color: "#38BDF8",
      status: "🗄️ Checking Stored Procedures",
      initialX: 82,
      initialY: 65
    },
    {
      id: "ux-designer",
      name: "UI/UX Designer",
      role: "Figma Tokens",
      color: "#F59E0B",
      status: "📐 Setting 24px Card Radii",
      initialX: 25,
      initialY: 75
    }
  ]
};
