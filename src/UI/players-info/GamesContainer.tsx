import React, { useContext } from 'react'
import { TGamesContainer } from './types/TGamesContainer'
import { ContextHistory } from '../context/contextUser'

export function GamesContainer({ games, title, isWhitePlayer }: TGamesContainer) {
  const historyService = useContext(ContextHistory)

  if (games.length === 0) {
    return <p>No games played as {title}.</p>
  }

  function setGame(gameId: number, playAsWhite: boolean) {
    historyService.setGameHistory(gameId, playAsWhite)
    window.location.href = 'http://localhost:3000/history'
  }

  return (
    <ul className='games-history__list'>
      <li className='games-history__item'>
        <div className='games-history__item-info games-history__item-info--title'>result</div>
        <div className='games-history__item-info games-history__item-info--title'>Per Player</div>
        <div className='games-history__item-info games-history__item-info--title'>fen</div>
        <div className='games-history__item-info games-history__item-info--title'>moves</div>
      </li>
      {games.map((game) => (
        <li key={game.id} className='games-history__item' onClick={() => game.id && setGame(game.id, isWhitePlayer)}>
          <div className='games-history__item-info'>{game.result}</div>
          <div className='games-history__item-info'>{`${game.timePerPlayerInSeconds} s`}</div>
          <div className='games-history__item-info'>{game.fen}</div>
          <div className='games-history__item-info'>{game.moves}</div>
        </li>
      ))}
    </ul>
  )
}