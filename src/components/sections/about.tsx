import Reveal from "@/components/shared/Reveal"
import { STAGGER } from "@/lib/motion"
import type { Skill } from "@/data/about"

type Props = {
  tagline: string
  paragraphs: string[]
  skills: Skill[]
}

export default function About({ tagline, paragraphs, skills }: Props) {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto max-w-5xl px-6 py-16 md:py-20"
    >
      <h2 id="about-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
        About
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">{tagline}</p>

      <div className="mt-10 grid gap-10 md:grid-cols-[1.6fr_1fr] md:gap-16">
        <Reveal>
          <div className="space-y-4 leading-relaxed">
            {paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "text-lg" : "text-muted-foreground"}>
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={STAGGER}>
          <h3 className="text-sm text-muted-foreground">Skills</h3>
          <ul className="mt-3 grid grid-cols-2 border-b border-border">
            {skills.map((s) => (
              <li
                key={s.name}
                className="flex items-baseline gap-2 border-t border-border py-3 pr-3"
              >
                <span>{s.name}</span>
                {s.note && <span className="text-xs text-muted-foreground">{s.note}</span>}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}