import React, { useContext, useEffect, useState } from 'react'
import { ContextGameBackend } from '../context/context'
import { Game } from '../../backend-service-connector/model/rest/game/Game'
import { GoBackNav } from '../navigation/GoBackNav'
import { GameItem } from './GameItem'
import { CreateButton } from './CreateButton'
import { CreateNewGame } from './CreateGame'
import { Loader } from "../utils/Loader";
import { ErrorWindow } from "../utils/ErrorWindow";

export function NewGamePanel(): JSX.Element {
  const gameServiceBackend = useContext(ContextGameBackend)
  const [createdGames, setCreatedGames] = useState<Array<Game> | null>(null)
  const [visibleCreate, setVisibleCreate] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('User not found!')

  const getCreatedGames = async () => {
    const response = await gameServiceBackend.getAllCreatedGames()

    return response.map(res => {
      return new Game(res.timePerPlayerInSeconds, res.gameStatus, res.whitePlayer,
        res.blackPlayer, res.id, '', undefined, undefined)
    })
  }

  useEffect(() => {
    getCreatedGames().then((response: Array<Game> | null) => setCreatedGames(response))
  }, [])

  const enterGame = async (event: any, gameId: number, playerColor: string) => {
    event.preventDefault()
    setIsLoading(true)

    await gameServiceBackend.joinGame(gameId)
      .then(() => {
        gameServiceBackend.setGameToLocalStorage({ pieceColor: playerColor })
        window.location.href = 'http://localhost:3000/game'
      })
      .catch(() => setError('Game not found, refresh page!'))
      .finally(() => setIsLoading(false))
  }

  const renderAllCreatedGames = () => {
    return createdGames?.map((game, index) => {
      const user = game.whitePlayer ? game.whitePlayer : game.blackPlayer
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
      style={{ flexDirection: visibleCreate ? 'row' : 'column' }}
    >
      {isLoading
        ? <Loader />
        : null
      }
      {
        error
          ? null
          : <ErrorWindow message={error} sendDataToParent={closeError} />
      }
      <GoBackNav backToUrl={'game'} />
      <ActiveGames />
      {
        visibleCreate
          ?
          <CreateNewGame
            setIsLoading={setIsLoading}
            gameServiceBackend={gameServiceBackend}
            setVisibleCreate={setVisibleCreate}
            setError={setError}
          />
          : <CreateButton setVisibleCreate={setVisibleCreate} />
      }
    </div>
  )
}