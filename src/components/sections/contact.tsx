import type { ReactNode } from "react"
import { motion, MotionConfig, type Variants } from "motion/react"

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

const contacts = [
  {
    label: "Email",
    value: "affzn.dev@gmail.com",
    href: "mailto:affzn.dev@gmail.com",
    icon: (
      <Icon>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </Icon>
    ),
  },
  {
    label: "GitHub",
    value: "afauzansw",
    href: "https://github.com/afauzansw",
    icon: (
      <Icon>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </Icon>
    ),
  },
  {
    label: "LinkedIn",
    value: "afauzansw",
    href: "https://www.linkedin.com/in/afauzansw",
    icon: (
      <Icon>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </Icon>
    ),
  },
  {
    label: "Instagram",
    value: "affzn_",
    href: "https://www.instagram.com/affzn_",
    icon: (
      <Icon>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </Icon>
    ),
  },
]

// Daftar menjadwalkan tile satu per satu; tiap tile menjalankan ikon lalu teks
const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
}
const tile: Variants = { hidden: {}, show: {} }
const chip: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
}
const text: Variants = {
  hidden: { opacity: 0, x: -14, clipPath: "inset(0 100% 0 0)" },
  show: {
    opacity: 1,
    x: 0,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.75, ease: [0.2, 0.7, 0.2, 1], delay: 0.25 },
  },
}

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto max-w-5xl px-6 py-16 md:py-20"
    >
      <h2 id="contact-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Contact
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Have a project in mind, or just want to talk shop? Email is the fastest way to reach me.
      </p>

      <MotionConfig reducedMotion="user">
        <motion.ul
          className="mt-10 grid gap-3 md:grid-cols-2"
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          {contacts.map((c) => {
            const external = c.href.startsWith("http")
            return (
              <motion.li key={c.label} variants={tile}>
                <a
                  href={c.href}
                  {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-colors duration-200 hover:border-primary/50"
                >
                  <motion.span
                    variants={chip}
                    className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary text-foreground transition-colors duration-200 group-hover:text-primary"
                  >
                    {c.icon}
                  </motion.span>

                  <motion.span variants={text} className="min-w-0">
                    <span className="block text-xs text-muted-foreground">{c.label}</span>
                    <span className="block text-base font-semibold tracking-tight [overflow-wrap:anywhere]">
                      {c.value}
                    </span>
                  </motion.span>

                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="ml-auto shrink-0 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                  >
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </a>
              </motion.li>
            )
          })}
        </motion.ul>
      </MotionConfig>
    </section>
  )
}