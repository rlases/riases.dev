import { useState } from 'react'

export function useTapSpin() {
  const [spins, setSpins] = useState(0)

  const onTap = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setSpins((s) => s + 1)
  }

  return {
    animate: { rotateY: spins * 360 },
    transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] },
    onTap,
  }
}
