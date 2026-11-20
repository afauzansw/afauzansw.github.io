import { useCallback, useEffect, useRef, useState } from "react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ExperienceItem } from "@/data/experience"

const VISIBLE = 4     // jumlah peran yang tampil sebelum "Show earlier roles"
const READ_LINE = 0.5 // garis baca: 50% tinggi layar dari atas

// Notes to refactor: move expandable to shared component; fix get data from /data/experience.ts

export default function Experience({ items }: { items: ExperienceItem[] }) {
  const [showAll, setShowAll] = useState(false)
  const [open, setOpen] = useState<number[]>([])
  const [active, setActive] = useState<boolean[]>([])

  const listRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLSpanElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([])

  const shown = showAll ? items : items.slice(0, VISIBLE)

  const update = useCallback(() => {
    const list = listRef.current
    const track = trackRef.current
    const fill = fillRef.current
    const dots = dotRefs.current.filter((d): d is HTMLSpanElement => d !== null)
    if (!list || !track || !fill || dots.length === 0) return

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches

    // posisi tengah tiap titik relatif terhadap daftar
    const ys = dots.map(
      (d) => (d.parentElement as HTMLElement).offsetTop + d.offsetTop + d.offsetHeight / 2
    )
    const top = ys[0]
    const span = ys[ys.length - 1] - top

    track.style.top = `${top}px`
    track.style.height = `${span}px`
    fill.style.top = `${top}px`

    // jarak dari titik pertama ke garis baca; ujung garis biru berhenti tepat di garis baca
    const reach = window.innerHeight * READ_LINE - list.getBoundingClientRect().top - top
    fill.style.height = `${reduce ? 0 : Math.min(Math.max(reach, 0), span)}px`

    // titik aktif saat garis sudah sampai. Reduced motion: hanya peran terkini yang aktif
    const next = ys.map((y, i) => (reduce ? i === 0 : y - top <= reach))
    setActive((prev) =>
      prev.length === next.length && prev.every((v, i) => v === next[i]) ? prev : next
    )
  }, [])

  useEffect(() => {
    let raf = 0
    const schedule = () => {
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0
          update()
        })
      }
    }
    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    // tinggi daftar berubah saat baris dibuka atau "earlier roles" ditampilkan
    const ro = new ResizeObserver(schedule)
    if (listRef.current) ro.observe(listRef.current)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      ro.disconnect()
    }
  }, [update])

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

      <div ref={listRef} className="relative mt-10">
        <span
          ref={trackRef}
          aria-hidden="true"
          className="absolute left-[5px] w-0.5 rounded-full bg-border"
        />
        <span
          ref={fillRef}
          aria-hidden="true"
          className="absolute left-[5px] w-0.5 rounded-full bg-primary"
        />

        <ol>
          {shown.map((item, i) => {
            const expandable = Boolean(item.summary || item.stack?.length)
            const isOpen = open.includes(i)

            const headClass = cn(
              "grid w-full grid-cols-[1fr_auto] items-center gap-x-3 py-4 text-left",
              expandable ? "sm:grid-cols-[1fr_auto_auto]" : "sm:grid-cols-[1fr_auto]"
            )

            const head = (
              <>
                <span className="min-w-0">
                  <span
                    className={cn(
                      "block text-base font-semibold leading-5 tracking-tight transition-colors duration-200",
                      expandable && "group-hover:text-primary"
                    )}
                  >
                    {item.company}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">{item.role}</span>
                </span>

                <span className="col-span-2 row-start-2 mt-1 text-sm text-muted-foreground sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:mt-0">
                  {item.period}
                </span>

                {expandable && (
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
                    className={cn(
                      "col-start-2 row-start-1 text-muted-foreground transition-transform duration-300 sm:col-start-3",
                      isOpen && "rotate-180"
                    )}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                )}
              </>
            )

            return (
              <li key={`${item.company}-${item.period}`} className="relative pl-9">
                <span
                  ref={(el) => {
                    dotRefs.current[i] = el
                  }}
                  aria-hidden="true"
                  className={cn(
                    "absolute left-0 top-5 size-3 rounded-full ring-4 ring-background transition-colors duration-300",
                    active[i] ? "bg-primary" : "bg-foreground"
                  )}
                />

                {expandable ? (
                  <button
                    type="button"
                    id={`exp-h-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`exp-${i}`}
                    onClick={() => toggle(i)}
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
                    id={`exp-${i}`}
                    role="region"
                    aria-labelledby={`exp-h-${i}`}
                    inert={!isOpen}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      {item.summary && (
                        <p className="pb-3 text-sm leading-relaxed text-muted-foreground">
                          {item.summary}
                        </p>
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
              </li>
            )
          })}
        </ol>
      </div>

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