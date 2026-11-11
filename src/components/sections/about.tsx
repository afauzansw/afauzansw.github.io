type Props = {
  items: { id: string; title: string; summary: string; stack: string[] }[]
}

export default function About({ items }: Props) {
  return (
    <section>
      About
    </section>
  )
}