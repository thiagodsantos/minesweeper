import { useEffect, useState } from 'react'

export function useGameTimer(isRunning: boolean) {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (!isRunning) return
    const timer = window.setInterval(() => setSeconds((current) => current + 1), 1000)
    return () => window.clearInterval(timer)
  }, [isRunning])

  return { seconds, resetTimer: () => setSeconds(0) }
}
