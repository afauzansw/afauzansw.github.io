import { buttonVariants } from "@/components/ui/button"
import Reveal from "@/components/shared/Reveal"

export type ProjectItem = {
  id: string
  title: string
  summary: string
  stack: string[]
  year: number
  link?: string
  repo?: string
  cover: { src: string; width?: number; height?: number; alt: string }
}

function ProjectCard({ p }: { p: ProjectItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-200 hover:border-primary/50">
      <div className="relative overflow-hidden">
        <img
          src={p.cover.src}
          width={p.cover.width}
          height={p.cover.height}
          alt={p.cover.alt}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-background/70 to-transparent" />
        <ul
          aria-label={`Technologies used in ${p.title}`}
          className="absolute inset-x-3 bottom-3 flex flex-wrap gap-1.5"
        >
          {p.stack.slice(0, 4).map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-white/15 bg-background/50 px-2.5 py-1 text-xs text-foreground backdrop-blur-md"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-baseline justify-between gap-3">
          <div className="relative inline-block group">
            <h3 className="text-lg font-semibold leading-snug tracking-tight">{p.title}</h3>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"></span>
          </div>
          <time dateTime={String(p.year)} className="text-sm text-muted-foreground">
            {p.year}
          </time>
        </div>
        <p className="text-xs text-muted-foreground">{p.summary}</p>

        {(p.link || p.repo) && (
          <div className="mt-auto flex gap-2 pt-2">
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live site of ${p.title}`}
                className={buttonVariants({ size: "sm" })}
              >
                Live site
              </a>
            )}
            {p.repo && (
              <a
                href={p.repo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View source code of ${p.title}`}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Source
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default function ProjectGrid({ items }: { items: ProjectItem[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p, i) => (
        <li key={p.id}>
          <Reveal delay={(i % 3) * 0.08} className="h-full">
            <ProjectCard p={p} />
          </Reveal>
        </li>
      ))}
    </ul>
  )
}