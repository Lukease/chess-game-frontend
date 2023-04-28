import React from 'react'
import { WinLossesDrawsChart } from './WinLossesDrawsChart'
import { PlayerInfo } from '../../backend-service-connector/model/rest/user/PlayerInfo'

export function PlayerInfoChart({ playerInfo }: { playerInfo: PlayerInfo }): JSX.Element {
  const winsChartValues = [
    { title: 'Wins', value: playerInfo.wins, color: '#0e7c31' },
    { title: 'Losses', value: playerInfo.losses, color: '#c91010' },
    { title: 'Draws', value: playerInfo.draws, color: '#d8a500' },
  ]

  const gamesChartValues = [
    { title: 'Games as White', value: playerInfo.gamesAsWhite, color: '#ffcdd2' },
    { title: 'Games as Black', value: playerInfo.gamesAsBlack, color: '#b2dfdb' },
  ]

  return (
    <div className='player-info-chart'>
      <WinLossesDrawsChart label='Wins, Losses, Draws' values={winsChartValues} />
      <WinLossesDrawsChart label='Games as White, Games as Black' values={gamesChartValues} />
    </div>
  )
}