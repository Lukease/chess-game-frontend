import React, { useContext, useEffect, useState } from 'react'
import { GoBackNav } from '../navigation/GoBackNav'
import { PlayersInfoMenu } from './PlayersInfoMenu'
import { PlayerInfo } from '../../backend-service-connector/model/rest/user/PlayerInfo'
import { TPlayersInfo } from './types/TPlayersInfo'
import { ContextUser } from '../context/contextUser'

export function PlayersInfo({ gameService }: TPlayersInfo): JSX.Element {
  const userService = useContext(ContextUser)
  const [players, setPlayers] = useState<Array<PlayerInfo>>([])
  const [allPlayersDisplayed, setAllPlayersDisplayed] = useState<boolean>(true)

  useEffect(() => {
    // userService.getAllPlayerInfo().then(r => setPlayers(r))
  }, [])

  function renderPlayersInfo() {
    return players.map((player, index) => {
      return (
        <div className={'content__element'} key={player.login}>
          <div className={'content__element--nav'}>{index}</div>
          <div className={'content__element--nav'}>{player.login}</div>
          <div className={'content__element--nav'}>{player.email}</div>
          <div className={'content__element--nav'}>{player.allGames}</div>
          <div className={'content__element--nav'}>{player.wins}</div>
          <div className={'content__element--nav'}>{player.winRatio}</div>
          <div className={'content__element--nav'}>{player.losses}</div>
          <div className={'content__element--nav'}>{player.gamesAsWhite}</div>
          <div className={'content__element--nav'}>{player.gamesAsBlack}</div>
          <div className={'content__element--nav'}>{player.draws}</div>
        </div>
      )
    })
  }

  function handleMenuClick(isAllPlayerDisplayed: boolean) {
    setAllPlayersDisplayed(isAllPlayerDisplayed)
  }

  return (
    <div className={'players-info'}>
      <GoBackNav backToUrl={'game'} />
      <PlayersInfoMenu onMenuClick={handleMenuClick} />
      {
        allPlayersDisplayed ?
          <div className={'content'}>
            <div className={'content__container'}>
              <div className={'content__element'}>
                <div className={'content__element--nav'}>Lp.</div>
                <div className={'content__element--nav'}>Login</div>
                <div className={'content__element--nav'}>Email</div>
                <div className={'content__element--nav'}>Games</div>
                <div className={'content__element--nav'}>Win</div>
                <div className={'content__element--nav'}>Win %</div>
                <div className={'content__element--nav'}>Loss %</div>
                <div className={'content__element--nav'}>As white</div>
                <div className={'content__element--nav'}>As black</div>
                <div className={'content__element--nav'}>draws</div>
              </div>
              {
                renderPlayersInfo()
              }
            </div>
          </div>
          : null
      }
    </div>
  )
}