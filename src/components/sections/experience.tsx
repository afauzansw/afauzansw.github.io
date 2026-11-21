import { useEffect, useRef, useState } from "react"
import {
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ExperienceItem } from "@/data/experience"

const VISIBLE = 4 // jumlah peran yang tampil sebelum "Show earlier roles"

// Durasi tiap tahap (detik). Urutan: titik -> teks -> garis -> baris berikutnya
const T = { dot: 0.25, text: 0.55, line: 0.4 }

const row: Variants = { hidden: {}, show: {} }

const dotV: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1, transition: { duration: T.dot, ease: "easeOut" } },
}
const textV: Variants = {
  hidden: { opacity: 0, x: -14, clipPath: "inset(0 100% 0 0)" },
  show: {
    opacity: 1,
    x: 0,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: T.text, ease: [0.2, 0.7, 0.2, 1], delay: T.dot },
  },
}
const fadeV: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut", delay: T.dot + 0.15 },
  },
}
const lineV: Variants = {
  hidden: { scaleY: 0 },
  show: {
    scaleY: 1,
    transition: { duration: T.line, ease: "easeInOut", delay: T.dot + T.text },
  },
}

type RowProps = {
  item: ExperienceItem
  index: number
  hasLine: boolean   // garis ke titik berikutnya (semua baris kecuali yang terakhir)
  allowed: boolean   // semua baris sebelumnya sudah selesai
  open: boolean
  onToggle: () => void
  onDone: () => void
}

function Row({ item, index, hasLine, allowed, open, onToggle, onDone }: RowProps) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" })
  const play = inView && allowed
  const expandable = Boolean(item.summary || item.stack?.length)

  // setelah seluruh urutan baris ini selesai, izinkan baris berikutnya mulai
  useEffect(() => {
    if (!play) return
    const id = setTimeout(onDone, (T.dot + T.text + T.line) * 1000)
    return () => clearTimeout(id)
  }, [play]) // eslint-disable-line react-hooks/exhaustive-deps

  const headClass = cn(
    "grid w-full grid-cols-[1fr_auto] items-center gap-x-3 py-4 text-left",
    expandable ? "sm:grid-cols-[1fr_auto_auto]" : "sm:grid-cols-[1fr_auto]"
  )

  const head = (
    <>
      <motion.span variants={textV} className="min-w-0">
        <span
          className={cn(
            "block text-base font-semibold leading-5 tracking-tight transition-colors duration-200",
            expandable && "group-hover:text-primary"
          )}
        >
          {item.company}
        </span>
        <span className="mt-0.5 block text-sm text-muted-foreground">{item.role}</span>
      </motion.span>

      <motion.span
        variants={fadeV}
        className="col-span-2 row-start-2 mt-1 text-sm text-muted-foreground sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:mt-0"
      >
        {item.period}
      </motion.span>

      {expandable && (
        <motion.svg
          variants={fadeV}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={cn(
            "col-start-2 row-start-1 text-muted-foreground transition-transform duration-300 sm:col-start-3",
            open && "rotate-180"
          )}
        >
          <path d="m6 9 6 6 6-6" />
        </motion.svg>
      )}
    </>
  )

  return (
    <motion.li
      ref={ref}
      className="relative pl-9"
      variants={row}
      initial="hidden"
      animate={play ? "show" : "hidden"}
    >
      {/* garis dari titik ini ke titik berikutnya (tinggi = tinggi baris) */}
      {hasLine && (
        <motion.span
          variants={lineV}
          aria-hidden="true"
          className="absolute left-[5px] top-[26px] h-full w-0.5 origin-top rounded-full bg-primary"
        />
      )}

      <motion.span
        variants={dotV}
        aria-hidden="true"
        className="absolute left-0 top-5 z-10 size-3 rounded-full bg-primary ring-4 ring-background"
      />

      {expandable ? (
        <button
          type="button"
          id={`exp-h-${index}`}
          aria-expanded={open}
          aria-controls={`exp-${index}`}
          onClick={onToggle}
          className={cn(
            headClass,
            "group cursor-pointer rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          )}
        >
          {head}
        </button>
      ) : (
        <div className={headClass}>{head}</div>
      )}

      {expandable && (
        <div
          id={`exp-${index}`}
          role="region"
          aria-labelledby={`exp-h-${index}`}
          inert={!open}
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            {item.summary && (
              <p className="pb-3 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
            )}
            {item.stack && item.stack.length > 0 && (
              <ul
                aria-label={`Technologies used at ${item.company}`}
                className="flex flex-wrap gap-1.5 pb-4"
              >
                {item.stack.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-border bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </motion.li>
  )
}

export default function Experience({ items }: { items: ExperienceItem[] }) {
  const reduce = Boolean(useReducedMotion())
  const [showAll, setShowAll] = useState(false)
  const [open, setOpen] = useState<number[]>([])
  const [done, setDone] = useState(0) // jumlah baris yang urutannya sudah selesai

  const shown = showAll ? items : items.slice(0, VISIBLE)

  const toggle = (i: number) =>
    setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]))

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="mx-auto max-w-5xl px-6 py-16 md:py-20"
    >
      <h2 id="experience-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Experience
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Where I’ve worked, and what I built along the way.
      </p>

      <MotionConfig reducedMotion="user">
        <ol className="mt-10">
          {shown.map((item, i) => (
            <Row
              key={`${item.company}-${item.period}`}
              item={item}
              index={i}
              hasLine={i < items.length - 1}
              allowed={reduce || done >= i}
              open={open.includes(i)}
              onToggle={() => toggle(i)}
              onDone={() => setDone((d) => Math.max(d, i + 1))}
            />
          ))}
        </ol>
      </MotionConfig>

      {items.length > VISIBLE && (
        <div className="mt-2 pl-9">
          <button
            type="button"
            aria-expanded={showAll}
            onClick={() => setShowAll((v) => !v)}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            {showAll ? "Show fewer roles" : `Show earlier roles (${items.length - VISIBLE})`}
          </button>
        </div>
      )}
    </section>
  )
}