type Props = {
  items: { id: string; title: string; summary: string; stack: string[] }[]
}

export default function Hero({ items }: Props) {
  return (
    <section>
      Hero
    </section>
  )
}