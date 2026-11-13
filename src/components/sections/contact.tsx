

export default function Contact() {
  return (
    <section
      id="contacts"
      aria-labelledby="contacts-title"
      className="mx-auto max-w-5xl px-6 py-24"
    >
      <h2 id="contacts-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Contacts
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        A few things I’ve built, and the problems they solved.
      </p>

      <div className="mt-12 md:grid md:grid-cols-2 md:gap-6">
        <div>
          <h3 className="text-muted-foreground">Email</h3>
          <p className="mt-1 text-lg font-semibold tracking-tight">affzn.dev@gmail.com</p>
        </div>

        <div>
          <h3 className="text-muted-foreground">Github</h3>
          <p className="mt-1 text-lg font-semibold tracking-tight">afauzansw</p>
        </div>

        <div>
          <h3 className="text-muted-foreground">LinkedIn</h3>
          <p className="mt-1 text-lg font-semibold tracking-tight">afauzansw</p>
        </div>

        <div>
          <h3 className="text-muted-foreground">Instagram</h3>
          <p className="mt-1 text-lg font-semibold tracking-tight">affzn_</p>
        </div>
      </div>
    </section>
  )
}