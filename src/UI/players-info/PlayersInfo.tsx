import React, { useContext, useEffect, useState } from 'react'
import { GoBackNav } from '../navigation/GoBackNav'
import { PlayersInfoMenu } from './PlayersInfoMenu'
import { PlayerInfo } from '../../backend-service-connector/model/rest/user/PlayerInfo'
import { ContextUser } from '../context/contextUser'
import { PlayersInfoNavigation } from './PlayersInfoNavigation'
import { PlayerStats } from './PlayerStats'

export function PlayersInfo(): JSX.Element {
  const userService = useContext(ContextUser)
  const [players, setPlayers] = useState<PlayerInfo[]>([])
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo | undefined>()
  const [isAllPlayersDisplayed, setIsAllPlayersDisplayed] = useState<boolean>(true)

  useEffect(() => {
    async function fetchPlayers() {
      const allPlayers = await userService.getAllPlayerInfo()
      setPlayers(allPlayers)

      const currentUser = await userService.getPlayerInfo()
      setPlayerInfo(currentUser)
    }
    fetchPlayers()
  }, [userService])

  function handleMenuClick(isAllPlayersDisplayed: boolean) {
    setIsAllPlayersDisplayed(isAllPlayersDisplayed)
  }

  return (
    <div className="players-info">
      <GoBackNav backToUrl="game" />
      <PlayersInfoMenu onMenuClick={handleMenuClick} />
      {isAllPlayersDisplayed ? (
        <PlayersInfoNavigation players={players} />
      ) : (
        playerInfo && <PlayerStats playerInfo={playerInfo} />
      )}
    </div>
  )
}
