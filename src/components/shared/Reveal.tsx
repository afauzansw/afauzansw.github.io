import { motion, MotionConfig } from "motion/react"
import type { ReactNode } from "react"

type Props = { children: ReactNode; delay?: number; className?: string }

export default function Reveal({ children, delay = 0, className }: Props) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.75, ease: "easeOut", delay }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  )
}