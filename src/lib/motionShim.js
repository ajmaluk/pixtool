import React from 'react'

const MOTION_PROPS = new Set([
  'initial',
  'animate',
  'exit',
  'transition',
  'variants',
  'whileHover',
  'whileTap',
  'whileInView',
  'viewport',
  'layout',
  'layoutId',
  'drag',
  'dragConstraints',
  'dragElastic',
  'dragMomentum',
  'onAnimationStart',
  'onAnimationComplete'
])

function stripMotionProps(props = {}) {
  const next = {}
  for (const key of Object.keys(props)) {
    if (!MOTION_PROPS.has(key)) {
      next[key] = props[key]
    }
  }
  return next
}

const elementCache = new Map()

function getMotionElement(tag) {
  if (elementCache.has(tag)) return elementCache.get(tag)

  const Component = React.forwardRef(function MotionShimComponent(props, ref) {
    return React.createElement(tag, { ...stripMotionProps(props), ref })
  })

  elementCache.set(tag, Component)
  return Component
}

export const motion = new Proxy(
  {},
  {
    get(_, tag) {
      return getMotionElement(tag)
    }
  }
)

export function AnimatePresence({ children }) {
  return React.createElement(React.Fragment, null, children)
}
