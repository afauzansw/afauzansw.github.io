import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import Reveal from "@/components/shared/Revealdd"

export type ProjectItem = {
  id: string
  title: string
  summary: string
  stack: string[]
  year: number
  featured?: boolean
  link?: string
  repo?: string
}

export default function Projects({ items }: { items: ProjectItem[] }) {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="mx-auto max-w-5xl px-6 py-24"
    >
      <p className="text-sm font-medium uppercase tracking-widest text-primary">
        Selected work
      </p>
      <h2
        id="projects-title"
        className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl"
      >
        Projects
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        A few things I’ve built, and the problems they solved.
      </p>

      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {items.map((p, i) => (
          <li key={p.id} className={p.featured ? "md:col-span-2" : undefined}>
            <Reveal delay={i * 0.08} className="h-full">
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className={p.featured ? "text-primary" : undefined}>
                      {p.featured ? "Featured" : "Project"}
                    </span>
                    <time dateTime={String(p.year)}>{p.year}</time>
                  </div>
                  <h3
                    className={`font-semibold leading-snug tracking-tight ${
                      p.featured ? "text-2xl md:text-3xl" : "text-xl"
                    }`}
                  >
                    {p.title}
                  </h3>
                </CardHeader>

                <CardContent className="flex flex-col gap-4">
                  <p className="text-muted-foreground">{p.summary}</p>
                  <ul aria-label={`Technologies used in ${p.title}`} className="flex flex-wrap gap-2">
                    {p.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </CardContent>

                {(p.link || p.repo) && (
                  <CardFooter className="gap-3">
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
                  </CardFooter>
                )}
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}