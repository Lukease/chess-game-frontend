import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import Arena from './Arena'
import {GameService} from './Arena_utils/suppliers/game-service'
import {MovingPiece} from "./Arena_utils/suppliers/moving-piece";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
const gameService = new GameService()
const movingPiece = new MovingPiece()
root.render(
    <Arena
    gameService={gameService}
    movingPiece={movingPiece}
    />
)

reportWebVitals()
