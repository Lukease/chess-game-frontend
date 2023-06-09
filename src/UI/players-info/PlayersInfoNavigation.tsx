import React, { useState } from 'react'
import { TPlayersInfoNavigation } from './types/TPlayersInfoNavigation'

export function PlayersInfoNavigation({ players }: TPlayersInfoNavigation) {
  const [sortType, setSortType] = useState('lp')
  const [isAscending, setIsAscending] = useState(true)

  const sortedPlayers = [...players].sort((a, b) => {
    let comparisonValue = 0
    switch (sortType) {
      case 'login':
        comparisonValue = a.login.localeCompare(b.login)
        break
      case 'email':
        comparisonValue = a.email.localeCompare(b.email)
        break
      case 'games':
        comparisonValue = b.allGames - a.allGames
        break
      case 'win':
        comparisonValue = b.wins - a.wins
        break
      case 'winRatio':
        comparisonValue = b.winRatio - a.winRatio
        break
      case 'loss':
        comparisonValue = b.losses - a.losses
        break
      case 'white':
        comparisonValue = b.gamesAsWhite - a.gamesAsWhite
        break
      case 'black':
        comparisonValue = b.gamesAsBlack - a.gamesAsBlack
        break
      case 'draws':
        comparisonValue = b.draws - a.draws
        break
      case 'lp':
      default:
        comparisonValue = players.indexOf(a) - players.indexOf(b)
        break
    }

    return isAscending ? comparisonValue : -comparisonValue
  })

  function handleSortClick(type: string) {
    setSortType(type)
    setIsAscending(prevAscending => type === sortType ? !prevAscending : true)
  }

  return (
    <div className='game-content'>
      <div className='charts__container'>
        <div className='charts__element'>
          <div
            className='charts__element--nav'
            onClick={() => handleSortClick('lp')}
          >
            Lp.
          </div>
          <div
            className='charts__element--nav'
            onClick={() => handleSortClick('login')}
          >
            Login
          </div>
          <div
            className='charts__element--nav'
            onClick={() => handleSortClick('email')}
          >
            Email
          </div>
          <div
            className='charts__element--nav'
            onClick={() => handleSortClick('games')}
          >
            Games
          </div>
          <div
            className='charts__element--nav'
            onClick={() => handleSortClick('win')}
          >
            Win
          </div>
          <div
            className='charts__element--nav'
            onClick={() => handleSortClick('winRatio')}
          >
            Win %
          </div>
          <div
            className='charts__element--nav'
            onClick={() => handleSortClick('loss')}
          >
            Loss %
          </div>
          <div
            className='charts__element--nav'
            onClick={() => handleSortClick('white')}
          >
            As white
          </div>
          <div
            className='charts__element--nav'
            onClick={() => handleSortClick('black')}
          >
            As black
          </div>
          <div
            className='charts__element--nav'
            onClick={() => handleSortClick('draws')}
          >
            Draws
          </div>
        </div>
        {sortedPlayers.map((player, index) => (
          <div className='charts__element' key={player.login}>
            <div className='charts__element--nav'>{index + 1}</div>
            <div className='charts__element--nav'>{player.login}</div>
            <div className='charts__element--nav'>{player.email}</div>
            <div className='charts__element--nav'>{player.allGames}</div>
            <div className='charts__element--nav'>{player.wins}</div>
            <div className='charts__element--nav'>{player.winRatio}</div>
            <div className='charts__element--nav'>{player.losses}</div>
            <div className='charts__element--nav'>{player.gamesAsWhite}</div>
            <div className='charts__element--nav'>{player.gamesAsBlack}</div>
            <div className='charts__element--nav'>{player.draws}</div>
          </div>
        ))}
      </div>
    </div>
  )
}