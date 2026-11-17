import { getCollection } from "astro:content"

export async function getExperienceItems() {
  const entries = (await getCollection("experiences")).sort((a, b) => Number(b.data.start) - Number(a.data.start))  

  return Promise.all(
    entries.map(async (p) => {
      return {
        id: p.id,
        company: p.data.company,
        role: p.data.role,
        period: p.data.period,
        start: p.data.start,
        summary: p.data.summary,
        stack: p.data.stack,
      }
    })
  )
}