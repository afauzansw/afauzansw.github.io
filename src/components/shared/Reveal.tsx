import { motion, MotionConfig } from "motion/react"
import type { ReactNode } from "react"
import { DISTANCE, DURATION, EASE, VIEWPORT } from "@/lib/motion"

type Props = { children: ReactNode; delay?: number; className?: string }

export default function Reveal({ children, delay = 0, className }: Props) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: DISTANCE.up }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: DURATION.reveal, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  )
}