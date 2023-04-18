import React, { useState, useEffect } from 'react'
import { TGameInfo } from './types/TGameInfo'
import { MakeMoveResponse } from '../../backend-service-connector/model/rest/game/MakeMoveResponse'
import { Timer } from './Timer'

export function GameInfo({ gameServiceBackend }: TGameInfo) {
  const [gameState, setGameState] = useState<MakeMoveResponse | null>(null)

  useEffect(() => {
    gameServiceBackend.getActiveGameAndReturnMoves().then(setGameState)
    const intervalId = setInterval(() => {
      gameServiceBackend.getActiveGameAndReturnMoves().then(setGameState)
    }, 5000)

    return () => clearInterval(intervalId)
  }, [gameServiceBackend])

  return (
    <div className="info">
      <p>Game Info:</p>
      {gameState && (
        <>
          <div className="info__container">
            <div className="info__container--title">Player color:</div>
            <div className="info__container--text">{gameState.playerColor}</div>
          </div>
          <div className="info__container">
            <div className="info__container--title">Whose turn:</div>
            <div className="info__container--text">{gameState.whoseTurn}</div>
          </div>
          <Timer secondsLeft={700} />
        </>
      )}
    </div>
  )
}