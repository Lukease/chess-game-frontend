import React from 'react'
import { TPlayersInfoMenu } from './types/TPlayersInfoMenu'

export function PlayersInfoMenu({ onMenuClick }: TPlayersInfoMenu): JSX.Element {
  return (
    <div className={'menu'}>
      <div style={{ height: '10%' }}></div>
      <div className={'menu__button'} onClick={() => onMenuClick(true)}>All users</div>
      <div className={'menu__button'} onClick={() => onMenuClick(false)}>Player Stats</div>
    </div>
  )
}