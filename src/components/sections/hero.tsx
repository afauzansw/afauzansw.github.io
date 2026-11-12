import type { CSSProperties } from "react"
import { buttonVariants } from "@/components/ui/button"

const stack = ["Laravel", "Go", "React", "AI"]
const step = (i: number) => ({ "--i": i }) as CSSProperties

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="mx-auto flex min-h-[90svh] max-w-5xl flex-col justify-center px-6 py-24"
    >
      <h1 id="hero-title">
        <span
          className="rise block text-base font-medium text-muted-foreground md:text-lg"
          style={step(0)}
        >
          Hi, I’m Ahmad Fauzan, a <span className="text-primary">Software Engineer</span>
        </span>
        <span
          className="rise mt-4 block text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl"
          style={step(1)}
        >
          I build reliable web apps with Laravel, Go, and React, now exploring AI.
        </span>
      </h1>

      <p className="rise mt-6 max-w-2xl text-lg text-muted-foreground" style={step(2)}>
        I turn complex backends into clean, fast interfaces.
      </p>

      <ul aria-label="Core technologies" className="rise mt-6 flex flex-wrap gap-2" style={step(3)}>
        {stack.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-border bg-secondary px-3 py-1 text-sm text-secondary-foreground"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="rise mt-10 flex flex-wrap gap-3" style={step(4)}>
        <a href="#projects" className={buttonVariants({ size: "lg" })}>View projects</a>
        <a href="#contact" className={buttonVariants({ variant: "outline", size: "lg" })}>Contact me</a>
      </div>
    </section>
  )
}