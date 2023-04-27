import React, { useState, useEffect } from 'react'
import { TGameInfo } from './types/TGameInfo'
import { MakeMoveResponse } from '../../backend-service-connector/model/rest/game/MakeMoveResponse'
import { Timer } from './Timer'

export function GameInfo({ gameService, makeMoveResponse }: TGameInfo) {
  const [gameState, setGameState] = useState<MakeMoveResponse | null>(null);

  useEffect(() => {
    if (makeMoveResponse) {
      setGameState(makeMoveResponse)
    }
  }, [makeMoveResponse])

  if (!gameState) {
    return null
  }

  const { playerColor, whoseTurn, gameInfo } = gameState
  const { timeLeftWhite, timeLeftBlack } = gameInfo ?? {}

  return (
    <div className='info'>
      <p>Game Info:</p>
      <div className='info__container'>
        <div className='info__container--title'>Player color:</div>
        <div className='info__container--text'>{playerColor}</div>
      </div>
      <div className='info__container'>
        <div className='info__container--title'>Whose turn:</div>
        <div className='info__container--text'>{whoseTurn}</div>
      </div>
      {timeLeftWhite && timeLeftBlack && (
        <Timer
          whiteTimeLeft={timeLeftWhite}
          blackTimeLeft={timeLeftBlack}
          whoseTour={whoseTurn}
        />
      )}
    </div>
  )
}