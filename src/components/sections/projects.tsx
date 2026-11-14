import { Button, buttonVariants } from "@/components/ui/button"
import ProjectGrid, { type ProjectItem } from "@/components/shared/ProjectGrid"
import { ArrowRight } from "lucide-react"

export default function Projects({ items }: { items: ProjectItem[] }) {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="mx-auto max-w-5xl px-6 py-12"
    >
      <h2 id="projects-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Projects
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        A few things I’ve built, and the problems they solved.
      </p>

      <div className="mt-12">
        <ProjectGrid items={items} />
      </div>

      <div className="mt-10 flex justify-center">
        <a href="/projects">
          <Button variant="outline" size="lg">
            View all projects <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </a>
      </div>
    </section>
  )
}