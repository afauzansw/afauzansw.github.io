import { buttonVariants } from "@/components/ui/button"

const contacts = [
  { label: "Email", value: "affzn.dev@gmail.com", href: "mailto:affzn.dev@gmail.com" },
  { label: "GitHub", value: "afauzansw", href: "https://github.com/afauzansw" },
  { label: "LinkedIn", value: "afauzansw", href: "https://www.linkedin.com/in/afauzansw" },
  { label: "Instagram", value: "affzn_", href: "https://www.instagram.com/affzn_" },
]

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto max-w-5xl px-6 py-16 md:py-20"
    >
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h2 id="contact-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Contact
          </h2>
          <p className="mt-3 max-w-md text-muted-foreground">
            Have a project in mind, or just want to talk shop? Email is the fastest way to reach me.
          </p>
          <a
            href="mailto:affzn.dev@gmail.com"
            className={buttonVariants({ size: "lg", className: "mt-6" })}
          >
            Email me
          </a>
        </div>

        <dl className="divide-y divide-border border-y border-border">
          {contacts.map((c) => {
            const external = c.href.startsWith("http")
            return (
              <div key={c.label} className="relative flex items-center justify-between gap-4 py-4">
                <dt className="text-muted-foreground">{c.label}</dt>
                <dd>
                  <a
                    href={c.href}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="text-lg font-semibold tracking-tight transition-colors duration-200 after:absolute after:inset-0 hover:text-primary"
                  >
                    {c.value}
                  </a>
                </dd>
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}