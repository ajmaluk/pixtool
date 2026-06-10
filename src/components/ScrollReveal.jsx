import { motion } from 'framer-motion'

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 40,
  className,
  style,
  once = true,
  ...props
}) {
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    fade: { y: 0 },
    scale: { y: 20, scale: 0.95 },
  }

  const initial = { opacity: 0, ...directionMap[direction] || directionMap.up }

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  )
}
