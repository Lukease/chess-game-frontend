import { PlayerInfoChart } from './PlayerInfoChart'
import { WinLossesDrawsChart } from './WinLossesDrawsChart'
import React from 'react'
import { TPlayerStats } from './types/TPlayerStats'

export function PlayerStats({ playerInfo }: TPlayerStats) {
  return (
    <div className={'charts'}>
      <div className='player-info-chart__container'>
        <div className='player-info-chart__item'>
          <h4 className={'player-info-chart__title'}>Login:</h4>
          <div>{playerInfo.login}</div>
        </div>
        <div className='player-info-chart__item'>
          <h4 className={'player-info-chart__title'}>All games:</h4>
          <div>{playerInfo.allGames}</div>
        </div>
        <div className='player-info-chart__item'>
          <h4 className={'player-info-chart__title'}>Win Ratio:</h4>
          <div>{`${playerInfo.winRatio.toFixed(2)}%`}</div>
        </div>
      </div>
      <PlayerInfoChart playerInfo={playerInfo} />
      <WinLossesDrawsChart label={'Wins/Losses/Draws'}
                           values={[{ title: 'Draws', value: playerInfo.draws, color: '#4CAF50' }, {
                             title: 'Wins',
                             value: playerInfo.wins,
                             color: '#4CAF50',
                           }, { title: 'Losses', value: playerInfo.losses, color: '#F44336' }]
                           } />
    </div>
  )
}