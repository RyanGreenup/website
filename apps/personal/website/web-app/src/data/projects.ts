export interface Project {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  note?: string;
  /** When true, renders a Coming Soon badge instead of the note field. */
  comingSoon?: boolean;
  /** Surfaced on the home "selected work" strip. */
  featured?: boolean;
}

export const projects: Project[] = [
  // --- Featured (home strip) -------------------------------------------
  {
    slug: "lilium",
    title: "Lilium",
    description: `A knowledge management platform in TypeScript and solid-js,
currently under development and refactor. 

The spiritual successor to
Chalsedony.`,
    tech: ["TypeScript"],
    comingSoon: true,
    featured: true,
  },
  {
    slug: "chalsedony",
    title: "Chalsedony",
    description:
      "Qt desktop note-taking application with Joplin-compatible storage, full-text search, keyboard-centric navigation, and live Markdown preview. Installable as a standalone tool via uv.",
    tech: ["Python", "Qt", "SQLite", "Markdown"],
    github: "https://github.com/RyanGreenup/Chalsedony",
    note: "Active",
    featured: true,
  },
  {
    slug: "k8s-monorepo",
    title: "K8s GitOps Monorepo",
    description: `GitOps monorepo structure suitable for managing production (DOKS) and homelab (k0s)
deployments with Flux CD, SOPS, K3D + Zod dev loop, an in-cluster builder for the GitHub adverse and a type-safe, LSP friendly
TypeScript manifest generator with a CLI and TUI.`,
    tech: ["Kubernetes", "Flux", "OpenTofu", "TypeScript"],
    comingSoon: true,
    featured: true,
  },

  // --- Additional ---------------------------------------------------------
  {
    slug: "cadmus",
    title: "Cadmus",
    description: `A Shell toolkit for knowledge-management workflows. Cut my teeth on
shell scripting to wire up TMSU, Recoll, Pandoc, and ripgrep. Keyboard-centric
navigation, tag-based organisation, and full-text search across a plain-text
vault. Wasn't half bad for pure bash, published on AUR and the repo even 170+
stars.`,
    tech: ["Bash", "Recoll", "TMSU", "Pandoc"],
    github: "https://github.com/RyanGreenup/cadmus",
    live: "https://ryangreenup.github.io/cadmus/",
    note: "Archived",
  },
  {
    slug: "ai-tools",
    title: "AI Tools",
    description: `Python CLI for local LLM workflows via Ollama: conversational
chat, retrieval-augmented generation, semantic search, and embedding-space
visualisation over a personal note corpus.`,
    tech: ["Python", "Ollama", "FAISS", "RAG"],
    github: "https://github.com/RyanGreenup/ai-tools",
  },
  {
    slug: "qr-vcard",
    title: "QR vCard Generator",
    description: `Cross-platform desktop tool for generating business-contact QR codes.
Built with Rust and the egui immediate-mode GUI framework; ships as a single
static binary.`,
    tech: ["Rust", "egui"],
    github: "https://github.com/RyanGreenup/qr_contact_generator",
  },
  {
    slug: "personal-website",
    title: "Personal Website",
    description: `This site. Astro + SolidJS with a vanilla-extract design system,
editorial typography, and Markdown content collections. Zero client-side JS
except a theme toggle.`,
    tech: ["Astro", "SolidJS", "vanilla-extract", "TypeScript"],
    live: "https://ryangreenup.com.au",
    comingSoon: true,
  },
  {
    slug: "pi-coding-agent",
    title: "Pi Coding Config",
    description: `Terminal AI coding config with tools and mcp structured code navigation,
JSX structured decoding via Babel, type-checking, and architecture analysis.
Built on a Typescript API and CodeGraph index with PageRank-based error
triage.`,
    tech: ["TypeScript", "Bun", "SolidJS"],
    comingSoon: true,
  },
  {
    slug: "solid-primitives",
    title: "Solid Component Library",
    description: `Unstyled, SolidJS primitives to make it easier to pick up and go.
Storybook with styled variants adapting a common Vanilla Extract design
contract, test coverage and components including: Virtualized Data Tables, Tree,
Accordion, Calendar, Dialog, DataTable, Carousel, and more.`,
    tech: ["SolidJS", "TypeScript", "vanilla-extract", "Vitest"],
    comingSoon: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
