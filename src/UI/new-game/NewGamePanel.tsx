import React, { useContext, useEffect, useState } from 'react'
import { ContextGameBackend } from '../context/context'
import { Game } from '../../backend-service-connector/model/rest/game/Game'
import { GoBackNav } from '../navigation/GoBackNav'
import { GameItem } from './GameItem'
import { CreateButton } from './CreateButton'
import { CreateNewGame } from './CreateGame'
import { Loader } from '../utils/Loader'
import { ErrorWindow } from '../utils/ErrorWindow'

export function NewGamePanel(): JSX.Element {
  const gameServiceBackend = useContext(ContextGameBackend)
  const [createdGames, setCreatedGames] = useState<Array<Game> | null>(null)
  const [visibleCreate, setVisibleCreate] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('User not found!')

  const getCreatedGames = async (): Promise<Array<Game>> => {
    const response = await gameServiceBackend.getAllCreatedGames()
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
      }
    })
  }

  useEffect(() => {
    getCreatedGames().then((response) => setCreatedGames(response))
  }, [])

  async function enterGame(event: React.MouseEvent<HTMLDivElement, MouseEvent>, gameId: number, playerColor: string) {
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
    return createdGames ?
      createdGames.map((game, index) => {
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
      style={{ flexDirection: visibleCreate ? 'row' : 'column' }}
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
          :
          <CreateButton setVisibleCreate={setVisibleCreate} />
      }
    </div>
  )
}