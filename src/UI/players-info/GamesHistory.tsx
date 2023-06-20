import React, { useContext, useEffect, useState } from 'react'
import { Game } from '../../backend-service-connector/model/rest/game/Game'
import { GamesContainer } from './GamesContainer'
import { ContextHistory } from '../context/contextUser'

export function GamesHistory(): JSX.Element {
  const [gamesAsBlack, setGamesAsBlack] = useState<Array<Game>>([])
  const [gamesAsWhite, setGamesAsWhite] = useState<Array<Game>>([])
  const historyService = useContext(ContextHistory)

  useEffect(() => {
    historyService.getAllPlayerGames().then(response => {
      setGamesAsBlack(response.gamesAsBlack)
      setGamesAsWhite(response.gamesAsWhite)
    })
  }, [historyService])

  return (
    <div className='games-history'>
      <div className='games-history__container'>
        <h2 className='games-history__title' style={{ color: 'black' }}>
          Games as Black
        </h2>
        <GamesContainer games={gamesAsBlack} title={'Black'} isWhitePlayer={false}/>
      </div>
      <div className='games-history__container'>
        <h2 className='games-history__title'>Games as White</h2>
        <GamesContainer games={gamesAsWhite} title={'White'} isWhitePlayer={true}/>
      </div>
    </div>
  );
}
