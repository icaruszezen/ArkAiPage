/*
 * English: the default language. Shape: Copy in src/content.ts.
 */
import { supportEmail, type Copy } from "../content.ts";

const en: Copy = {
  meta: {
    title: "ArkAI | Enterprise LLM Services, AI Agents and Computer Vision",
    description:
      "ArkAI builds AI solutions for businesses: LLM services, AI agent design and computer vision, with private deployment and support from discovery and prototyping to delivery and operations.",
  },

  nav: {
    home: "Home",
    solutions: "Solutions",
    approach: "Approach",
    cases: "Use cases",
    process: "Process",
    faq: "FAQ",
    contact: "Contact",
  },

  ui: {
    skip: "Skip to content",
    mainNav: "Main navigation",
    homeLink: "ArkAI home",
    menuTitle: "ArkAI navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    toDark: "Switch to dark theme",
    toLight: "Switch to light theme",
    backToTop: "Back to top",
    consult: "Contact us",
    consultShort: "Contact",
    language: "Language",
    colon: ": ",
    carousel: {
      label: "carousel",
      slide: "slide",
      previous: "Previous",
      next: "Next",
      place: (index: number, count: number) => `Slide ${index} of ${count}`,
    },
  },

  hero: {
    meta: "// ARKAI · AI SOLUTIONS",
    titleLines: ["Put AI", "to work"],
    lead: "ArkAI builds end-to-end AI solutions for businesses. From LLM services and AI agent design to computer vision, we work with your team to turn an idea into a system that runs every day.",
    actionsLabel: "Get started",
    explore: "Explore solutions",
    contact: "Talk to us",
    dockLabel: "Our services",
  },

  solutions: {
    title: "What we build",
    meta: (count: number) => `// SOLUTIONS · ${count} SERVICE AREAS`,
    intro: "AI solutions for businesses, currently in three areas.",
    tabsLabel: "Our services",
    deliveryName: "Delivery",
    scenariosName: "Typical uses",
    capabilitiesHeading: "What we do",
    consult: "Ask about this",
    more: "Have an AI need outside these three areas, or not sure where to start? Let's talk.",
    moreAction: "Tell us what you need",
    items: [
      {
        key: "llm",
        code: "01",
        title: "LLM Services",
        short: "LLM",
        summary:
          "We help businesses choose, use and manage large language models. Whether you call models in the cloud or deploy them privately in your own data center, we design a solution that fits the use case.",
        capabilities: [
          "Model selection and evaluation",
          "Private deployment and inference acceleration",
          "Domain fine-tuning and alignment",
          "RAG knowledge bases and enterprise search",
          "API gateway and usage cost control",
        ],
        delivery: "On-premises / Hybrid cloud / API",
        scenarios: "Customer service, knowledge Q&A, content generation",
      },
      {
        key: "agent",
        code: "02",
        title: "AI Agent Design",
        short: "Agent",
        summary:
          "Hand repetitive, cross-system work to agents. We design each agent around your business process: what it should look at, what it can call, and when it must hand back to a person.",
        capabilities: [
          "Process mapping and task breakdown",
          "Tool calling and system integration",
          "Multi-agent orchestration",
          "Evaluation, monitoring and observability",
          "Human-in-the-loop and permission boundaries",
        ],
        delivery: "Custom build / Platform setup",
        scenarios:
          "Operations automation, data analysis, engineering productivity",
      },
      {
        key: "vision",
        code: "03",
        title: "AI Vision Solutions",
        short: "Vision",
        summary:
          "We teach machines to understand images and video. From production-line inspection to document recognition, we own the whole chain, from data and models to edge deployment.",
        capabilities: [
          "Industrial defect detection",
          "OCR and document understanding",
          "Structured video analysis",
          "Multimodal image and text search",
          "Edge deployment and acceleration",
        ],
        delivery: "Edge deployment / Cloud service",
        scenarios:
          "Quality inspection, site inspection, invoice and contract processing",
      },
    ],
  },

  approach: {
    title: "How we run AI projects",
    meta: (count: number) => `// APPROACH · ${count} PRINCIPLES`,
    intro:
      "When AI projects fail, it's rarely because the model isn't strong enough. It's because nobody pinned down what to solve, how to measure it, or who looks after it once it's live. These four principles apply to every project we take on.",
    principles: [
      {
        latin: "Value First",
        title: "Start with the value",
        text: "Find the use case worth doing and the metric that measures it, then decide which model to use and what to spend.",
      },
      {
        latin: "Data Stays",
        title: "Your data stays yours",
        text: "Private deployment and access isolation mean sensitive data never has to leave your environment.",
      },
      {
        latin: "Measurable",
        title: "Results you can measure",
        text: "Every delivery ships with an evaluation set and launch metrics, so the data tells you whether it works.",
      },
      {
        latin: "Long Run",
        title: "Launch is only the start",
        text: "After launch we keep monitoring quality, iterating and upgrading models as your business changes.",
      },
    ],
  },

  cases: {
    title: "Where AI fits",
    meta: (count: number) => `// USE CASES · ${count} COMMON SCENARIOS`,
    intro: "Common scenarios, and which of our services fit each one.",
    listLabel: "Use cases",
    galleryLabel: "Use case illustrations",
    slideTitle: (tag: string, title: string) => `${tag} · ${title}`,
    items: [
      {
        tag: "Factory",
        title: "Visual inspection on the line",
        solutions: ["vision"],
        text: "Vision models take over manual inspection, catching scratches, missing parts and misassembly in real time and feeding results back into your quality system.",
      },
      {
        tag: "Docs",
        title: "Contract and policy review",
        solutions: ["llm", "agent"],
        text: "Compare contracts against internal policies, flag risky clauses with the source text attached, and pass them to a person for final review.",
      },
      {
        tag: "Service",
        title: "Customer service and knowledge base",
        solutions: ["llm"],
        text: "Answer customer questions from product documentation and service history, and hand off to a person with the full context when needed.",
      },
      {
        tag: "Data",
        title: "Business analytics assistant",
        solutions: ["agent"],
        text: "Ask questions in plain language. The agent queries your data, builds charts and explains what changed behind the numbers.",
      },
    ],
  },

  process: {
    title: "How we work together",
    meta: (count: number) => `// PROCESS · ${count} STEPS`,
    intro:
      "Every step ends with something you can review, so you see the results before deciding whether and how to take the next one.",
    steps: [
      {
        title: "Discovery",
        text: "Understand your business and data, and find the use cases worth doing first.",
      },
      {
        title: "Solution design",
        text: "Settle the technical approach, the scope and the evaluation metrics.",
      },
      {
        title: "Prototype",
        text: "Test quality and cost with a small prototype, then decide whether to roll it out.",
      },
      {
        title: "Delivery",
        text: "Engineer the system, integrate it with what you already run, and go live.",
      },
      {
        title: "Operate and improve",
        text: "Monitor quality in production, keep optimizing and upgrade models as needed.",
      },
    ],
  },

  faq: {
    title: "Common questions",
    meta: (count: number) => `// FAQ · ${count} QUESTIONS`,
    intro: "Didn't find your question? Just tell us about your situation.",
    action: "Contact us",
    items: [
      {
        question: "Will our data be used to train other models?",
        answer:
          "How your data is used, where it is stored and how long it is kept are all written into the contract and data agreement. For sensitive use cases we can deploy privately, so the data never leaves your environment.",
      },
      {
        question: "How long does a project take?",
        answer:
          "It depends on the scope. A prototype usually takes weeks and a full delivery takes months. You get a concrete schedule after discovery.",
      },
      {
        question: "We don't have an AI team. Can we still do this?",
        answer:
          "Yes. We can take care of everything from design and development to operations after launch, and hand over what your team needs to use and maintain the system.",
      },
      {
        question: "Which models do you support?",
        answer:
          "Most mainstream open-source and commercial LLMs can be integrated. We help you choose based on quality, cost and compliance requirements, and several models can be combined.",
      },
    ],
  },

  contact: {
    title: "Talk to us",
    meta: "// CONTACT",
    intro:
      "Tell us about your business and the problem you want AI to solve, even if it's just an idea. We'll help you judge whether it's worth doing and where to start.",
    emailLabel: "Email",
    formLabel: "Consultation form",
    note: `Submitting opens your email app with everything filled in, ready to send to ${supportEmail}.`,
    requiredBefore: "Fields marked",
    requiredAfter: "are required.",
    name: "Name",
    namePlaceholder: "e.g. Alex Chen",
    company: "Company or organization",
    need: "Area of interest",
    other: "Other",
    message: "What you need",
    messageHelp:
      "Your use case, the data you have, when you'd like to launch. Write as much or as little as you like.",
    submit: "Send by email",
    errors: {
      name: "Please tell us your name so we know how to address you.",
      need: "Please choose an area. Not sure? Pick “Other”.",
    },
    ready: {
      title: "Your email is ready",
      body: `If your email app didn't open, write to us directly at ${supportEmail}.`,
    },
    mail: {
      subject: (need: string, name: string) =>
        `ArkAI inquiry: ${need} (${name})`,
      name: "Name",
      company: "Company",
      need: "Area of interest",
      message: "Details",
    },
  },

  footer: {
    tagline: "AI SOLUTIONS FOR REAL WORK",
    copyright: "© 2026 ArkAI",
  },
};

export default en;
