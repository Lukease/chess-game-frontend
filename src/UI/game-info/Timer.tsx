import React, { useState, useEffect } from 'react'
import { TTimer } from './types/TTimer'

export function Timer({ secondsLeft }: TTimer) {
  const [seconds, setSeconds] = useState(secondsLeft)

  useEffect(() => {
    if (seconds <= 0) {
      return
    }
    const interval = setInterval(() => {
      setSeconds(seconds => seconds - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [seconds])

  const formattedTime = new Date(seconds * 1000).toISOString().substr(14, 5)

  return <div>{formattedTime}</div>
}
