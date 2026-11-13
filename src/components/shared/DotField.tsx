import { useEffect, useRef, useState } from "react"

const SPACING = 32    // jarak antar titik (samakan dengan --s di CSS)
const RADIUS = 1.2    // jari-jari titik
const ALPHA = 0.45    // keterangan titik
const INFLUENCE = 110 // jangkauan efek dari kursor
const PUSH = 8        // pergeseran maksimum titik
const SHRINK = 0.6    // titik mengecil hingga 60% di pusat efek

export default function DotField() {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!root || !canvas || !ctx) return

    // <astro-island> memakai display: contents (tanpa ukuran),
    // jadi cari induk pertama yang punya kotak sungguhan
    let found: HTMLElement | null = root.parentElement
    while (found && getComputedStyle(found).display === "contents") {
      found = found.parentElement
    }
    if (!found) return
    const host: HTMLElement = found

    const color =
      getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() || "#2E90FF"
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches
    const interactive = finePointer && !reduce

    let w = 0
    let h = 0
    let dpr = 1
    let tx = 0, ty = 0 // posisi kursor sebenarnya
    let cx = 0, cy = 0 // posisi kursor yang sudah dihaluskan
    let target = 0     // 1 saat kursor di dalam hero, 0 saat keluar
    let strength = 0   // kekuatan efek (naik dan turun halus)
    let raf = 0
    let visible = true

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      ctx.globalAlpha = ALPHA
      ctx.fillStyle = color
      ctx.beginPath()

      const half = SPACING / 2
      const rows = Math.ceil(h / half) + 1
      const cols = Math.ceil(w / SPACING) + 1

      for (let r = 0; r < rows; r++) {
        const y0 = r * half
        const offset = (r % 2) * half // baris ganjil bergeser setengah jarak
        for (let c = 0; c < cols; c++) {
          let x = c * SPACING + offset
          let y = y0
          let rad = RADIUS

          if (strength > 0.001) {
            const dx = x - cx
            const dy = y - cy
            const d = Math.hypot(dx, dy)
            if (d < INFLUENCE && d > 0.001) {
              const f = (1 - d / INFLUENCE) ** 2 * strength
              const k = (f * PUSH) / d
              x += dx * k
              y += dy * k
              rad = RADIUS * (1 - SHRINK * f)
            }
          }
          ctx.moveTo(x + rad, y)
          ctx.arc(x, y, rad, 0, Math.PI * 2)
        }
      }
      ctx.fill()
    }

    const tick = () => {
      cx += (tx - cx) * 0.18
      cy += (ty - cy) * 0.18
      strength += (target - strength) * 0.12
      draw()

      const moving = Math.hypot(tx - cx, ty - cy) > 0.3
      const fading = Math.abs(target - strength) > 0.002
      if (visible && (moving || fading)) {
        raf = requestAnimationFrame(tick)
      } else {
        raf = 0
        if (target === 0) {
          strength = 0
          draw()
        }
      }
    }
    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = root.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      draw()
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      const rect = root.getBoundingClientRect()
      tx = e.clientX - rect.left
      ty = e.clientY - rect.top
      if (target === 0) {
        cx = tx
        cy = ty
      }
      target = 1
      start()
    }
    const onLeave = () => {
      target = 0
      start()
    }

    const ro = new ResizeObserver(resize)
    ro.observe(root)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && target === 1) start()
    })
    io.observe(root)

    if (interactive) {
      host.addEventListener("pointermove", onMove)
      host.addEventListener("pointerleave", onLeave)
    }

    resize()
    setReady(true)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      host.removeEventListener("pointermove", onMove)
      host.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="dots-fade dots-mask pointer-events-none absolute inset-0 -z-10"
    >
      {!ready && <div className="hero-dots absolute inset-0" />}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}