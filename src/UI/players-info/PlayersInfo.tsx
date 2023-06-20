import React, { useEffect, useState } from 'react'
import { GoBackNav } from '../navigation/GoBackNav'
import { PlayersInfoMenu } from './PlayersInfoMenu'
import { PlayerInfo } from '../../backend-service-connector/model/rest/user/PlayerInfo'
import { PlayersInfoNavigation } from './PlayersInfoNavigation'
import { PlayerStats } from './PlayerStats'
import { GamesHistory } from './GamesHistory'
import { TPlayersInfo } from './types/TPlayersInfo'

export function PlayersInfo({ userService }: TPlayersInfo): JSX.Element {
  const [players, setPlayers] = useState<PlayerInfo[]>([])
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo | undefined>()
  const [location, setLocation] = useState<string>('all-users')

  useEffect(() => {
    async function fetchPlayers() {
      const allPlayers = await userService.getAllPlayerInfo()
      setPlayers(allPlayers)

      const currentUser = await userService.getPlayerInfo()
      setPlayerInfo(currentUser)
    }

    fetchPlayers()
  }, [userService])

  function handleMenuClick(locationName: string) {
    setLocation(locationName)
  }

  return (
    <div className='players-info'>
      <GoBackNav />
      <PlayersInfoMenu onMenuClick={handleMenuClick} />
      {location === 'all-users' ? (
        <PlayersInfoNavigation players={players} />
      ) : null}
      {location === 'player-stats' ?
        playerInfo && <PlayerStats playerInfo={playerInfo} /> : null
      }
      {location === 'history' ? <GamesHistory /> : null
      }
    </div>
  )
}
