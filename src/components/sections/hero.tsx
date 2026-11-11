import { buttonVariants } from "@/components/ui/button"

const stack = ["Laravel", "Go", "React", "AI"]

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="mx-auto flex min-h-[90svh] max-w-5xl flex-col justify-center px-6 py-24"
    >
      <h1 id="hero-title">
        <span className="block font-sans text-base font-medium tracking-wide text-muted-foreground md:text-lg">
          Hi, I’m Ahmad Fauzan, a{" "}
          <span className="text-primary">Fullstack Developer</span>
        </span>
        <span className="mt-4 block text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
          I build reliable web apps with Laravel, Go, and React, now exploring AI.
        </span>
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        I turn complex backends into clean, fast interfaces.
      </p>

      <ul aria-label="Core technologies" className="mt-6 flex flex-wrap gap-2">
        {stack.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-border bg-secondary px-3 py-1 text-sm text-secondary-foreground"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap gap-3">
        <a href="#projects" className={buttonVariants({ size: "lg" })}>
          View projects
        </a>
        <a
          href="#contact"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          Contact me
        </a>
      </div>
    </section>
  )
}