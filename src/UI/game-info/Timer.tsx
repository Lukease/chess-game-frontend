import React, { useState, useEffect } from 'react'
import { TTimer } from './types/TTimer'

export function Timer({ whiteTimeLeft, blackTimeLeft, whoseTour }: TTimer) {
  const [whitePlayerSeconds, setWhitePlayerSeconds] = useState(whiteTimeLeft)
  const [blackPlayerSeconds, setBlackPlayerSeconds] = useState(blackTimeLeft)

  useEffect(() => {
    if (whoseTour === 'white' && whitePlayerSeconds > 0) {
      const interval = setInterval(() => {
        setWhitePlayerSeconds(whitePlayerSeconds => whitePlayerSeconds - 1)
      }, 1000)
      return () => clearInterval(interval)
    } else if (whoseTour === 'black' && blackPlayerSeconds > 0) {
      const interval = setInterval(() => {
        setBlackPlayerSeconds(blackPlayerSeconds => blackPlayerSeconds - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [whitePlayerSeconds, blackPlayerSeconds, whoseTour])

  const whiteFormattedTime = new Date(whitePlayerSeconds * 1000).toISOString().substr(14, 5)
  const blackFormattedTime = new Date(blackPlayerSeconds * 1000).toISOString().substr(14, 5)

  return (
    <div>
      <div>{`Time Black: ${blackFormattedTime}`}</div>
      <div>{`Time White: ${whiteFormattedTime}`}</div>
    </div>
  )
}
