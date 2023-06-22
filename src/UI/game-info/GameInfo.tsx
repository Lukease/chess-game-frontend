import React from 'react';
import { TGameInfo } from './types/TGameInfo';
import { Timer } from './Timer';

export function GameInfo({ currentGame }: TGameInfo) {
  if (!currentGame) {
    return null
  }

  const { playerColor = 'white', whoseTurn = 'white', gameInfo } = currentGame
  const { timeLeftWhite, timeLeftBlack } = gameInfo || {}

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
