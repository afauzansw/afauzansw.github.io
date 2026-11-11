type Props = {
  items: { id: string; title: string; summary: string; stack: string[] }[]
}

export default function Projects({ items }: Props) {
  return (
    <section>
      Projects
    </section>
  )
}