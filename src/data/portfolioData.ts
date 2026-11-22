import { Project, ExperienceItem, SkillCategory } from '../types';

export const personalInfo = {
  name: "Hassan Kazmi",
  role: "AI & Machine Learning Engineer",
  headline: "Building Intelligent Systems & AI-Powered Applications.",
  intro:
    "I work across artificial intelligence, machine learning and software systems, building practical applications that turn complex ideas into useful solutions.",
  currentRole: {
    status: "Active Engineering",
    title: "AI & Machine Learning Engineer",
    organization: "COMSATS University Islamabad",
    location: "Lahore, Pakistan",
  },
  email: "hassankazmi2004@gmail.com",
  github: "https://github.com/hassanaleee",
  linkedin: "https://www.linkedin.com/in/hassan-kazmi-544892340/",
  location: "Lahore, Pakistan",
  codeDeclaration: `const hassan = {
  name: "Hassan Kazmi",
  role: "AI & Machine Learning Engineer",
  focus: ["Intelligent Systems", "RAG Pipelines", "Multimodal AI", "Applied ML"],
  skills: {
    "AI & Machine Learning": [
      "Machine Learning", "Deep Learning", "NLP", "Computer Vision",
      "RAG Pipelines", "LLMs", "Vector Embeddings", "Evaluation"
    ],
    "Languages & Frameworks": [
      "Python", "TypeScript", "FastAPI", "React", "Next.js",
      "Node.js", "C / C++", "RESTful APIs"
    ],
    "Tools, Databases & Cloud": [
      "PostgreSQL", "pgvector", "Docker", "Redis", "SQLite",
      "MongoDB Atlas", "Git & GitHub", "Vercel", "Tailwind CSS"
    ]
  },
  projects: {
    MockAI: "Multimodal AI interview evaluation (Speech, NLP & Emotion detection)",
    IntelligenceOS: "Multi-tenant private RAG platform with hybrid search & pgvector",
    Zeploy: "Cloud infrastructure & automated deployment console",
    StockSync: "Full-stack inventory reconciliation & order workflow platform"
  },
  services: [
    "AI-powered applications",
    "RAG & LLM-based systems",
    "Backend systems",
    "Web applications",
    "Workflow automation"
  ],
  email: "hassankazmi2004@gmail.com",
  github: "https://github.com/hassanaleee",
  linkedin: "https://www.linkedin.com/in/hassan-kazmi-544892340/",
  world: {
    name: "World of Hassan",
    concept: "Interactive playground exploring neural architectures & distributed systems",
    status: "Playable foundation at /world"
  }
};

export default function Portfolio() {
  return <main>
    <header><h1>{hassan.name}</h1><p>{hassan.role}</p></header>
    <section><h2>About</h2><p>{hassan.headline}</p></section>
    <section><h2>Tech Stack</h2>{Object.keys(hassan.skills).join(", ")}</section>
    <section><h2>Featured Projects</h2>{Object.keys(hassan.projects).join(", ")}</section>
    <footer><a href={"mailto:" + hassan.email}>Let's talk.</a></footer>
  </main>;
}`,
};

export const skillCategories: SkillCategory[] = [
  {
    title: "AI & Machine Learning",
    subtitle: "RAG Pipelines, Embeddings & Semantic Search, Multimodal AI",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "Computer Vision",
      "Speech-to-Text Processing",
      "Facial Emotion Analysis",
      "RAG Pipelines",
      "Vector Embeddings",
      "Prompt Engineering",
      "Reciprocal Rank Fusion",
    ],
  },
  {
    title: "Languages & Frameworks",
    subtitle: "FastAPI, Modern React, TypeScript & Scalable System Architecture",
    skills: [
      "Python",
      "TypeScript",
      "JavaScript",
      "FastAPI",
      "Flask",
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "C & C++",
      "C# / .NET",
      "RESTful APIs",
    ],
  },
  {
    title: "Tools, Databases & Cloud",
    subtitle: "Containerization, Vector Databases & Relational Storage",
    skills: [
      "PostgreSQL",
      "pgvector",
      "Redis",
      "SQLite",
      "MongoDB Atlas",
      "Docker & Compose",
      "Git & GitHub",
      "Alembic",
      "SQLAlchemy 2.0",
      "Tailwind CSS",
      "Vite",
      "Vercel",
    ],
  },
];

export const projects: Project[] = [
  {
    id: "mockai",
    title: "MockAI",
    shortDescription:
      "Research-oriented multimodal interview evaluation platform leveraging speech-to-text, NLP scoring, and real-time facial emotion detection to assess confidence and technical communication.",
    category: "Multimodal AI & Speech Processing",
    companyOrContext: "Final Year Project (FYP) · Active Development",
    technologies: [
      "Python",
      "FastAPI",
      "React",
      "Whisper",
      "OpenCV",
      "DeepFace",
      "NLP Transformers",
      "Tailwind CSS",
    ],
    githubUrl: "https://github.com/hassanaleee/MOCK-AI",
    image: "/projects/mockai_Screenshot_2026-05-04_112518.png",
    secondaryScreenshots: [
      {
        label: "Dashboard & Performance Metrics",
        url: "/projects/mockai_Screenshot_2026-05-04_112518.png",
      },
      {
        label: "Candidate Evaluation & Confidence Results",
        url: "/projects/mockai_Screenshot_2026-05-04_112607.png",
      },
      {
        label: "Interview Sessions Management",
        url: "/projects/mockai_Screenshot_2026-05-04_112554.png",
      },
    ],
    caseStudy: {
      overview:
        "Final Year Project designed to simulate real technical and behavioral interviews. Instead of relying solely on verbal transcripts, MockAI combines automated speech recognition with facial expression and body telemetry to evaluate candidate readiness holistically.",
      challenge:
        "Job seekers and university students frequently struggle with interview anxiety and unstructured communication. Standard mock interview platforms only transcribe text, ignoring critical non-verbal signals such as eye contact consistency, emotional sentiment, and speech cadence.",
      approach: [
        {
          step: "01",
          title: "Multimodal Pipeline Architecture",
          description:
            "Architected decoupled ingestion pipelines for audio streams and video frames, routing audio to Whisper for speech-to-text and video frames through OpenCV/DeepFace for emotion classification.",
        },
        {
          step: "02",
          title: "NLP Semantic Evaluation",
          description:
            "Implemented question-answer semantic similarity scoring using transformer embeddings to evaluate technical accuracy, completeness, and structured formatting.",
        },
        {
          step: "03",
          title: "Real-Time Feedback UI",
          description:
            "Designed a focused React interview cockpit with camera stream telemetry, question prompt orchestration, and immediate post-session evaluation dashboards.",
        },
        {
          step: "04",
          title: "Benchmarking & Verification",
          description:
            "Conducted latency profiling on frame extraction and audio slicing to ensure responsive evaluations without overwhelming user hardware.",
        },
      ],
      impact: {
        summary:
          "Transforms fragmented interview preparation into an objective, data-driven simulation with instant verbal and visual feedback.",
        metrics: [
          {
            label: "Evaluation Modalities",
            before: "Text only",
            after: "Audio + Video + Text",
            note: "Multimodal assessment",
          },
          {
            label: "Feedback Turnaround",
            before: "Human coach days",
            after: "< 15 seconds",
            note: "Instant post-interview report",
          },
        ],
      },
      contribution:
        "Lead developer and architect: engineered the end-to-end system workflow, multimodal pipelines, FastAPI endpoints, and React frontend.",
    },
  },
  {
    id: "intelligence-os",
    title: "Intelligence OS",
    shortDescription:
      "Enterprise-grade private RAG platform built with strict multi-tenant data isolation, hybrid vector + full-text search with Reciprocal Rank Fusion, and asynchronous document parsing.",
    category: "Generative AI & Enterprise RAG",
    companyOrContext: "Independent Systems Architecture",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL 16",
      "pgvector (HNSW)",
      "Redis 7",
      "SQLAlchemy AsyncPG",
      "TikToken",
      "Docker Compose",
      "Alembic",
    ],
    githubUrl: "https://github.com/hassanaleee/intelligence-os",
    image: "/projects/intelligence-os-dashboard.png",
    secondaryScreenshots: [
      {
        label: "Enterprise RAG Workspace",
        url: "/projects/intelligence-os-dashboard.png",
      },
    ],
    caseStudy: {
      overview:
        "Private RAG infrastructure platform providing guaranteed multi-tenant data boundary isolation, hybrid vector + keyword search, and context-preserving token chunking for production knowledge retrieval.",
      challenge:
        "Most open-source RAG tutorials overlook multi-tenancy, risk data leakage between client organizations, and rely purely on vector search, which regularly fails on exact product SKUs, acronyms, and technical jargon.",
      approach: [
        {
          step: "01",
          title: "Strict Multi-Tenant Scoping",
          description:
            "Every database entity (User, Document, DocumentChunk, Conversation) is strictly scoped to organization IDs, extracted directly from cryptographic JWT claims and verified at database foreign key boundaries.",
        },
        {
          step: "02",
          title: "Hybrid Search with RRF",
          description:
            "Executed concurrent vector search using pgvector HNSW indexing and keyword search via PostgreSQL tsvector full-text search, fused dynamically using Reciprocal Rank Fusion (k=60).",
        },
        {
          step: "03",
          title: "Context-Preserving Chunking",
          description:
            "Engineered document ingestion with heading detection and tiktoken cl100k_base tokenization to preserve contextual boundaries across complex technical PDF documents.",
        },
        {
          step: "04",
          title: "Containerized Microservices",
          description:
            "Packaged PostgreSQL 16 (pgvector) and Redis 7 into resilient Docker Compose configurations with Alembic async migrations and automated auth verification test suites.",
        },
      ],
      impact: {
        summary:
          "Achieved robust multi-tenant security and significantly higher retrieval recall on domain-specific vocabulary compared to standard dense-only vector databases.",
        metrics: [
          {
            label: "Search Precision",
            before: "Vector only (missed keywords)",
            after: "Dense + Sparse RRF",
            note: "Superior hybrid retrieval",
          },
          {
            label: "Tenant Isolation",
            before: "Application filter only",
            after: "JWT + DB Foreign Key Cascade",
            note: "100% zero data leakage",
          },
        ],
      },
      contribution:
        "Designed and implemented the complete backend, database migrations, hybrid search algorithms, and comprehensive automated test suites.",
    },
  },
  {
    id: "zeploy",
    title: "Zeploy",
    shortDescription:
      "Modern cloud infrastructure and deployment management interface built for automated project deployment, environment configurations, and streamlined developer workflows.",
    category: "Cloud Tooling & Developer Infrastructure",
    companyOrContext: "Web & Infrastructure Application",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "TanStack",
      "Node.js",
      "RESTful APIs",
    ],
    githubUrl: "https://github.com/hassanaleee/Zeploy---Website",
    image: "/zeploy-screenshot.png",
    secondaryScreenshots: [
      {
        label: "Deployment Console Interface",
        url: "/zeploy-screenshot.png",
      },
      {
        label: "Platform Presentation Overview",
        url: "/projects/zeploy_banner.png",
      },
    ],
    caseStudy: {
      overview:
        "Web-based cloud deployment console and company platform presenting a modern developer-first environment for deploying applications with high visibility and minimal setup friction.",
      challenge:
        "Developers often face convoluted cloud consoles that require dozens of steps just to configure environment variables, connect git repositories, and monitor deployment health.",
      approach: [
        {
          step: "01",
          title: "Developer-First UX",
          description:
            "Built a high-performance dark-mode user interface using Next.js and TypeScript, designed around clear deployment metrics and clean typography.",
        },
        {
          step: "02",
          title: "Modular Route Architecture",
          description:
            "Implemented file-based routing and decoupled component hierarchies to allow seamless navigation across project environments and deployment statuses.",
        },
        {
          step: "03",
          title: "Environment & Log Visualization",
          description:
            "Structured live build logs and terminal feedback views to provide transparent deployment diagnostics for developers.",
        },
      ],
      impact: {
        summary:
          "Delivered an ergonomic, modern interface that simplifies cloud deployment management and developer infrastructure monitoring.",
      },
      contribution:
        "Built the web application frontend, component design system, and API integration interfaces.",
    },
  },
  {
    id: "stocksync",
    title: "StockSync",
    shortDescription:
      "Full-stack inventory and order fulfillment management system for online merchants featuring atomic stock reconciliation, supplier workflows, and visual sales analytics.",
    category: "Full-Stack Web Development",
    companyOrContext: "Full-Stack Web Application",
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "SQLite",
      "Recharts",
      "JWT Authentication",
      "Tailwind CSS",
    ],
    githubUrl: "https://github.com/hassanaleee/STOCKSYNC",
    image: "/stocksync-dashboard.png",
    secondaryScreenshots: [
      {
        label: "Inventory & Fulfillment Dashboard",
        url: "/stocksync-dashboard.png",
      },
      {
        label: "Stock Item Grid & Low Stock Alerts",
        url: "/projects/stocksync_inventory-preview.png",
      },
      {
        label: "Sales Trajectory & Monthly Analytics",
        url: "/stocksync-reports.png",
      },
    ],
    caseStudy: {
      overview:
        "A complete full-stack inventory and order management system created for small-to-mid merchants to replace fragile spreadsheets with transactional database integrity and real-time stock alerts.",
      challenge:
        "Manual inventory tracking in spreadsheets leads to human errors, overselling during order spikes, and missed replenishment deadlines with suppliers.",
      approach: [
        {
          step: "01",
          title: "Atomic Inventory Workflows",
          description:
            "Implemented transactional stock deductions when orders shift from Pending to Processing, with automatic stock restitution if orders are cancelled.",
        },
        {
          step: "02",
          title: "Supplier & Purchase Orders",
          description:
            "Built end-to-end purchase order state machines (Draft -> Ordered -> Received), with automatic stock increments only upon confirmed physical receipt.",
        },
        {
          step: "03",
          title: "Visual Analytics & Reporting",
          description:
            "Integrated Recharts for monthly revenue trajectories, order status distributions, top SKU breakdowns, and automated CSV export.",
        },
      ],
      impact: {
        summary:
          "Eliminated overselling issues with automated low-stock warnings and provided instant order fulfillment tracking.",
        metrics: [
          {
            label: "Stock Reconciliation",
            before: "Manual spreadsheet updates",
            after: "Automatic on order status",
            note: "Zero manual calculation",
          },
          {
            label: "Low Stock Detection",
            before: "Discovered after stockout",
            after: "Automated threshold alerts",
            note: "Proactive reordering",
          },
        ],
      },
      contribution:
        "Architected and implemented both client and server: database schema, REST API routes, JWT security, and interactive React dashboard.",
    },
  },
  {
    id: "gym-management",
    title: "Gym Management System",
    shortDescription:
      "Desktop and relational database administration system engineered for fitness facilities to manage membership tiers, attendance telemetry, trainer scheduling, and fee reconciliation.",
    category: "Software Systems & Database Management",
    companyOrContext: "Verified Desktop & Database Application",
    technologies: [
      "C# / .NET",
      "SQL Server",
      "WPF",
      "Database Normalization",
      "LINQ",
      "UI Design",
    ],
    githubUrl: "https://github.com/hassanaleee/Gym-Management-System",
    image: "/projects/gym_management_screenshot.png",
    secondaryScreenshots: [
      {
        label: "Management Dashboard Interface",
        url: "/projects/gym_management_screenshot.png",
      },
    ],
    caseStudy: {
      overview:
        "A desktop and relational database administration system built for fitness club owners to automate member registrations, subscription renewals, check-in tracking, and financial reconciliation.",
      challenge:
        "Gym facilities often struggle with paper ledgers or inconsistent spreadsheets for tracking member subscription expirations, leading to revenue loss, unauthorized entries, and chaotic trainer scheduling.",
      approach: [
        {
          step: "01",
          title: "Normalized Database Schema",
          description:
            "Engineered a 3NF relational database schema in SQL Server with referential integrity constraints across members, packages, trainers, and payment transactions.",
        },
        {
          step: "02",
          title: "Subscription Expiration & Access Control",
          description:
            "Implemented automated status triggers flagging overdue memberships and restricting entry clearance upon badge lookup.",
        },
        {
          step: "03",
          title: "WPF Desktop Interface",
          description:
            "Designed an intuitive modern desktop GUI with responsive search grids, quick-action check-in buttons, and automated receipt generation.",
        },
      ],
      impact: {
        summary:
          "Streamlined daily gym administration with zero paperwork, accurate member tracking, and instant revenue visibility.",
        metrics: [
          {
            label: "Member Check-In Time",
            before: "Manual clipboard (~45s)",
            after: "< 2 seconds",
            note: "Instant badge lookup",
          },
          {
            label: "Membership Expiration Tracking",
            before: "Manual ledger auditing",
            after: "Automated status alerts",
            note: "Zero missed renewals",
          },
        ],
      },
      contribution:
        "Sole architect and developer: designed relational database schema, written backend SQL queries, and implemented full C# / .NET desktop application.",
    },
  },
];

export const experienceItems: ExperienceItem[] = [
  {
    id: "svype",
    role: "Software Developer Intern",
    organization: "SVYPE",
    location: "Remote",
    period: "2025",
    type: "work",
    description:
      "Software Developer Intern at SVYPE, working on software development activities and technology implementations.",
  },
  {
    id: "zeploy-tech",
    role: "Managing Partner",
    organization: "Zeploy Tech",
    location: "Lahore, Pakistan",
    period: "July 2026 – Present",
    statusBadge: "Current Role",
    type: "work",
    description:
      "Managing Partner at Zeploy Tech, involved in the company's software development activities, operations and building practical technology solutions.",
  },
];

export const educationData = {
  degree: "Bachelor of Science in Computer Science",
  institution: "COMSATS University Islamabad, Lahore Campus",
  period: "March 2023 – Expected July 2027",
  regNo: "SP23-BCS-151",
  description:
    "Undergraduate computer science program focusing on Data Structures & Algorithms, Artificial Intelligence, Database Systems, Software Engineering, and Operating Systems.",
  coursework: [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Structures & Algorithms",
    "Database Systems",
    "Operating Systems",
    "Software Engineering",
  ],
};

export const freelanceServices = [
  {
    title: "AI-Powered Applications",
    description:
      "End-to-end intelligent applications combining custom AI models, multimodal processing, and responsive user experiences.",
  },
  {
    title: "RAG & LLM-Based Systems",
    description:
      "Production-ready Retrieval-Augmented Generation with vector embeddings, hybrid search, and domain-specific knowledge retrieval.",
  },
  {
    title: "Backend Systems & APIs",
    description:
      "Scalable RESTful services built with FastAPI, Node.js, PostgreSQL, and Redis, focusing on data isolation and throughput.",
  },
  {
    title: "Modern Web Applications",
    description:
      "High-performance frontend and full-stack web platforms engineered with Next.js, React, TypeScript, and Tailwind CSS.",
  },
  {
    title: "Workflow Automation",
    description:
      "Eliminating manual overhead through scripted pipelines, automated reconciliation, and bespoke administrative tools.",
  },
];

export const worldOfHassan = {
  title: "World of Hassan",
  subtitle: "Systems, Neural Architectures & Interactive Engineering",
  description:
    "Beyond software engineering for client projects, I explore applied AI research, distributed data pipelines, and interactive computing environments.",
  status: "Experimental Foundation",
  concept:
    "An interactive canvas and architectural sandbox showcasing live neural network visualization, RAG query vector spaces, and experimental computing prototypes.",
  quote:
    "Engineering intelligent systems isn't just about calling external APIs—it's about understanding data representations, latency boundaries, and user experience.",
};
