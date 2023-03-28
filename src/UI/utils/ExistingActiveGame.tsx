import React from 'react'
import { TExistingActiveGame } from './dto/TExistingActiveGame'

export function ExistingActiveGame({ gameServiceBackend, sendDataToParent, activeGameId }: TExistingActiveGame) {
  const closeActiveGame = () => {
    sendDataToParent()
    // gameServiceBackend.closeActiveGameUser(activeGameId).then(()=> alert('User left the game'))
  }

  return (
    <div className={'error'}>
      <div className={'error__container'}>
        <div
          className={'error__exit'}
          onClick={() => sendDataToParent()}
        >
          X
        </div>
        <p className={'error__message'}>
          You have an active game, do you want to leave?
        </p>
        <div className={'error__buttons-container'}>
          <button onClick={() => closeActiveGame()}>
            Leave game
          </button>
          <button onClick={() => sendDataToParent()}>
            Dont leave game
          </button>
        </div>
      </div>
    </div>
  )
}