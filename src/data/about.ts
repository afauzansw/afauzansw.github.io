export type Skill = { name: string; note?: string }

export const about = {
  tagline: "Backend roots, frontend craft.",
  paragraphs: [
    "I started on the backend, building APIs and systems with Laravel and Go. Over time I moved closer to what people actually see, and today I build full web apps with React on the front.",
    "I care about the details that make software feel reliable: clear structure, fast pages, and interfaces that behave the way people expect.",
    "Lately I’ve been exploring AI engineering, with an eye on bringing models into real products.",
  ],
  // Urutan = urutan prioritas. Usahakan jumlahnya genap agar baris terakhir penuh.
  skills: [
    { name: "Laravel" },
    { name: "Go" },
    { name: "React" },
    { name: "Tailwind CSS" },
    { name: "Inertia.js" },
    { name: "TanStack" },
    { name: "shadcn/ui" },
    { name: "Nuxt" },
    { name: "Astro" },
    { name: "Git" },
    { name: "GitHub Actions" },
    { name: "AI engineering", note: "learning" },
  ] as Skill[],
}