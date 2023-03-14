import { TGameItem } from './dto/TGameItem'
import React from 'react'

export function GameItem({ gameStatus, timePerPlayerInSeconds, id, createdBy, enterGame, playerColor }: TGameItem): JSX.Element {

  return (
    <div
      className={'games__navigation'}
      id={String(id)}
      onClick={(event) => enterGame(event, id,playerColor)}
    >
      <p className={'games__navigation--item'}>{createdBy.login}</p>
      <p className={'games__navigation--item'}>{gameStatus}</p>
      <p className={'games__navigation--item'}>{timePerPlayerInSeconds}</p>
      <p className={'games__navigation--item'}>{playerColor}</p>
    </div>
  )
}