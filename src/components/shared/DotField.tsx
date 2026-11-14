import { useEffect, useRef, useState } from "react"

const SPACING = 32    // jarak antar titik (samakan dengan --s di CSS)
const RADIUS = 1.2    // jari-jari titik
const ALPHA = 0.55    // keterangan titik
const INFLUENCE = 150 // jangkauan efek kursor
const PUSH = 8        // pergeseran maksimum titik oleh kursor
const SHRINK = 0.6    // titik mengecil hingga 60% di pusat efek
const DRIFT = 8       // kecepatan aliran (px/detik di tiap sumbu), diagonal sekitar 8,5 px/detik
const DRIFT_ON_TOUCH = true // true = titik ikut mengalir di HP dan tablet

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
    const drifting = !reduce && (finePointer || DRIFT_ON_TOUCH)

    const half = SPACING / 2

    let w = 0
    let h = 0
    let dpr = 1
    let tx = 0, ty = 0 // posisi kursor sebenarnya
    let cx = 0, cy = 0 // posisi kursor yang sudah dihaluskan
    let target = 0     // 1 saat kursor di dalam hero, 0 saat keluar
    let strength = 0   // kekuatan efek kursor (naik dan turun halus)
    let phase = 0      // geseran pola akibat aliran (px), berulang tiap `half`
    let last = 0       // waktu frame sebelumnya
    let raf = 0
    let visible = true

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      ctx.globalAlpha = ALPHA
      ctx.fillStyle = color
      ctx.beginPath()

      const rows = Math.ceil(h / half) + 1
      const cols = Math.ceil(w / SPACING) + 1

      // mulai dari -1 agar tidak ada celah di kiri dan atas saat pola bergeser
      for (let r = -1; r <= rows; r++) {
        const rowOffset = (r & 1) * half // baris ganjil bergeser setengah jarak
        for (let c = -1; c <= cols; c++) {
          let x = c * SPACING + rowOffset + phase
          let y = r * half + phase
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

    const tick = (now: number) => {
      // dt dibatasi agar tidak melompat setelah tab kembali aktif
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0
      last = now

      if (drifting) phase = (phase + dt * DRIFT) % half
      cx += (tx - cx) * 0.18
      cy += (ty - cy) * 0.18
      strength += (target - strength) * 0.12
      draw()

      const moving = Math.hypot(tx - cx, ty - cy) > 0.3
      const fading = Math.abs(target - strength) > 0.002
      if (visible && (drifting || moving || fading)) {
        raf = requestAnimationFrame(tick)
      } else {
        raf = 0
        last = 0
        if (target === 0) {
          strength = 0
          draw()
        }
      }
    }
    const start = () => {
      if (!raf) {
        last = 0
        raf = requestAnimationFrame(tick)
      }
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

    // animasi hanya berjalan saat hero terlihat di layar
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && (drifting || target === 1)) start()
    })
    io.observe(root)

    if (interactive) {
      host.addEventListener("pointermove", onMove)
      host.addEventListener("pointerleave", onLeave)
    }

    resize()
    setReady(true)
    if (drifting) start()

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