import { useEffect, useRef, useState } from "react"
import { buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"

const links = [
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  // { href: "/#contacts", label: "Contacts" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = navRef.current
    if (!el) return
    let raf = 0

    const update = () => {
      raf = 0
      const p = Math.min(window.scrollY / 150, 1) // 0 sampai 1 selama 120px pertama
      el.style.setProperty("--p", p.toFixed(3))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <header className="drop sticky top-4 z-50 px-4">
      <nav
        ref={navRef}
        aria-label="Main"
        className="nav-glass mx-auto flex h-14 max-w-3xl items-center justify-between rounded-full border pl-5 pr-2"
      >
        <a href="/" className="font-semibold tracking-tight">
          Ahmad Fauzan
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="/#contact" className={buttonVariants({ size: "sm" })}>
              Contact
            </a>
          </li>
        </ul>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Open menu"
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "rounded-full md:hidden"
            )}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </SheetTrigger>

          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Navigate to a section of the page
              </SheetDescription>
            </SheetHeader>

            <ul className="mx-4 divide-y divide-border">
              {links.map((l, i) => (
                <li
                  key={l.href}
                  className="sheet-item"
                  style={{ "--i": i } as CSSProperties}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between py-4 text-lg font-medium transition-colors duration-200 hover:text-primary active:text-primary"
                  >
                    {l.label}
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
                      className="text-muted-foreground transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary group-active:translate-x-1"
                    >
                      <path d="m9 6 6 6-6 6" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>

            <div
              className="sheet-item mx-4 mt-6"
              style={{ "--i": links.length } as CSSProperties}
            >
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className={buttonVariants({ size: "lg", className: "w-full" })}
              >
                Contact
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}