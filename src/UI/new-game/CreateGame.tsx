import React, { useState } from 'react'
import { NewGame } from '../../backend-service-connector/model/rest/game/NewGame'
import { TCreateNewGame } from './dto/TCreateNewGame'

export function CreateNewGame({
                                setIsLoading,
                                gameServiceBackend,
                                setVisibleCreate,
                                setError,
                              }: TCreateNewGame) {
  const [time, setTime] = useState(200)
  const [selectedColor, setSelectedColor] = useState('white')
  const isWhitePlayer = selectedColor === 'white'

  const create = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    setIsLoading(true)

    const newGame: NewGame = {
      isWhitePlayer: isWhitePlayer,
      timePerPlayerInSeconds: time,
    }

    gameServiceBackend.createGame(newGame)
      .then(() => {
        gameServiceBackend.setGameToLocalStorage({ pieceColor: selectedColor })
        window.location.href = 'http://localhost:3000/game'
        setVisibleCreate(false)
      })
      .catch(() => setError('Cannot create game!'))
      .finally(() => setIsLoading(false))
  }

  return (
    <form className={'new-game'}>
      <span className={'new-game__close'}
            onClick={() => setVisibleCreate(false)}
      > x
      </span>
      <h1>Create new game</h1>
      <p className={'new-game__title'}>
        {`Time per player: ${time}s`}
      </p>
      <div>
        <input
          type={'range'}
          min={200}
          max={1000}
          step={1}
          value={time}
          required={true}
          onChange={(event) => setTime(parseInt(event.target.value))}
        />
      </div>
      <p className={'new-game__title'}>
        {`Selected color: ${selectedColor}`}
      </p>
      <div>
        <select
          value={`${selectedColor}`}
          onChange={event => setSelectedColor(event.target.value)}
          required={true}
        >
          <option></option>
          <option value={'white'}>white</option>
          <option value={'black'}>black</option>
        </select>
      </div>
      <p className={'new-game__title'}></p>
      <button
        onClick={event => create(event)}
      >create
      </button>
    </form>
  )
}