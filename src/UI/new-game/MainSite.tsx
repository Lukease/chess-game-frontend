import React, { useContext, useEffect, useState } from 'react'
import { ContextGame } from '../context/contextUser'
import { Game } from '../../backend-service-connector/model/rest/game/Game'
import { GoBackNav } from '../navigation/GoBackNav'
import { GameItem } from './GameItem'
import { CreateNewGame } from './CreateGame'
import { Loader } from '../utils/Loader'
import { ErrorWindow } from '../utils/ErrorWindow'
import { CreateButton } from './CreateButton'

export function MainSite(): JSX.Element {
  const gameService = useContext(ContextGame)
  const [createdGames, setCreatedGames] = useState<Array<Game>>([])
  const [visibleCreate, setVisibleCreate] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('User not found!')

  const getCreatedGames = async (): Promise<Array<Game>> => {
    const response = await gameService.getAllCreatedGames()
    return response.map(res => {
      return {
        timePerPlayerInSeconds: res.timePerPlayerInSeconds,
        gameStatus: res.gameStatus,
        whitePlayer: res.whitePlayer,
        blackPlayer: res.blackPlayer,
        id: res.id,
        fen: '',
        moves: '',
        lastMoveWhite: undefined,
        lastMoveBlack: undefined,
        timeLeftBlack: res.timePerPlayerInSeconds,
        timeLeftWhite: res.timePerPlayerInSeconds,
        result: undefined,
      }
    })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getCreatedGames().then((response) => setCreatedGames(response))
    }, 5000)

    gameService.getActiveGameAndReturnMoves()
      .then((r) => {
        if (r.status !== 404 && r.status !== 400) {
          window.location.href = 'http://localhost:3000/game'
        }
      })
      .catch()
    return () => clearInterval(interval)
  }, [])


  async function enterGame(event: React.MouseEvent<HTMLDivElement, MouseEvent>, gameId: number, playerColor: string) {
    event.preventDefault()
    setIsLoading(true)

    await gameService.joinGame(gameId)
      .then(() => {
        gameService.setGameToLocalStorage({ pieceColor: playerColor })
        window.location.href = 'http://localhost:3000/game'
      })
      .catch(() => setError('Game not found, refresh page!'))
      .finally(() => setIsLoading(false))
  }

  const renderAllCreatedGames = () => {
    return createdGames ?
      createdGames.map((game, index) => {
        const user = game.whitePlayer ?? game.blackPlayer
        const playerColor = game.whitePlayer ? 'white' : 'black'

        return <GameItem
          id={game.id!}
          createdBy={user!}
          gameStatus={game.gameStatus!}
          timePerPlayerInSeconds={game.timePerPlayerInSeconds}
          key={index}
          enterGame={enterGame}
          playerColor={playerColor}
        />
      })
      : null
  }

  function ActiveGames() {
    return (
      <div className={'games__container'}>
        <div className={'games__navigation'} style={{ fontWeight: 'bold' }}>
          <p className={'games__navigation--item'}>Created By</p>
          <p className={'games__navigation--item'}>Game Status</p>
          <p className={'games__navigation--item'}>Time Per Player</p>
          <p className={'games__navigation--item'}>Color</p>
        </div>
        {
          createdGames ?
            renderAllCreatedGames()
            : null
        }
      </div>
    )
  }

  const closeError = () => {
    setError('')
  }

  return (
    <div
      className={'games'}
      // style={{ flexDirection: visibleCreate ? 'row' : 'column' }}
    >
      {
        isLoading
          ? <Loader />
          : null
      }
      {
        error
          ? null
          : <ErrorWindow message={error} sendDataToParent={closeError} />
      }
      <GoBackNav />
      <div className="about-app">
        <h2>About My App</h2>
        <p>
          Welcome to the Chess App! This app allows you to create and join chess games with other players.
          Good Luck and hava a fun!!
        </p>
      </div>
      <ActiveGames />
      {
        visibleCreate
          ?
          <CreateNewGame
            setIsLoading={setIsLoading}
            gameServiceBackend={gameService}
            setVisibleCreate={setVisibleCreate}
            setError={setError}
          />
          :
          <CreateButton setVisibleCreate={setVisibleCreate} />
      }
      <footer className='footer'>
        <div className='container'>
          <p className='footer__text'>&copy; 2023 Chess App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}