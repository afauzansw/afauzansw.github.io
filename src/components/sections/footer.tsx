export default function Footer() {
  return (
    <div className="mx-auto px-6 py-6 border-t text-center text-sm text-muted-foreground">
      <p>&copy; {new Date().getFullYear()} Ahmad Fauzan Setyo Wicaksono. Built with Astro, React, and Tailwind CSS.</p>
    </div>
  )
}