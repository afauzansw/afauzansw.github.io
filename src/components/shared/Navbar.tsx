import { useEffect, useState } from "react"
import { buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const links = [
  { href: "/#projects", label: "Projects" },
  // { href: "/#experience", label: "Experience" },
  // { href: "/#skills", label: "Skills" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="sticky top-4 z-50 px-4">
      <nav
        aria-label="Main"
        className={cn(
          "mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border pl-5 pr-2 transition-all duration-200",
          scrolled
            ? "border-foreground/10 bg-background/60 shadow-lg shadow-black/20 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent"
        )}
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

            <ul className="flex flex-col gap-1 px-4">
              {[...links, { href: "/#contact", label: "Contact" }].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-lg transition-colors duration-200 hover:bg-accent"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}