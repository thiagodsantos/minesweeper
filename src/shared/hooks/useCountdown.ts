import { useEffect, useState } from 'react'

const COUNTDOWN_SECONDS = 3

export function useCountdown() {
  const [countdown, setCountdown] = useState<number | null>(COUNTDOWN_SECONDS)
  const [countdownRun, setCountdownRun] = useState(0)

  useEffect(() => {
    if (countdown === null) return
    const timer = window.setTimeout(() => {
      setCountdown((current) => current === 1 ? null : current === null ? null : current - 1)
    }, 1000)
    return () => window.clearTimeout(timer)
  }, [countdown, countdownRun])

  function startCountdown() {
    setCountdown(COUNTDOWN_SECONDS)
    setCountdownRun((current) => current + 1)
  }

  return { countdown, startCountdown }
}
