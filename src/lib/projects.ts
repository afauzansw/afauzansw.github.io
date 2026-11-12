import { getCollection } from "astro:content"
import { getImage } from "astro:assets"

export async function getProjectItems(limit?: number) {
  const entries = (await getCollection("projects")).sort((a, b) => Number(b.data.featured) - Number(a.data.featured) || b.data.year - a.data.year)
  const picked = limit ? entries.slice(0, limit) : entries

  return Promise.all(
    picked.map(async (p) => {
      const img = await getImage({ src: p.data.cover, width: 800, format: "webp" })
      return {
        id: p.id,
        title: p.data.title,
        summary: p.data.summary,
        stack: p.data.stack,
        year: p.data.year,
        link: p.data.link,
        repo: p.data.repo,
        cover: {
          src: img.src,
          width: img.attributes.width,
          height: img.attributes.height,
          alt: p.data.coverAlt,
        },
      }
    })
  )
}