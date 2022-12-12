import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import Arena from './Arena'
import {GameService} from './Arena_utils/suppliers/game-service'
import {MovingService} from "./Arena_utils/suppliers/moving-service";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
const gameService = new GameService()
const movingService = new MovingService()
root.render(
    <Arena
    gameService={gameService}
    movingService={movingService}
    />
)

reportWebVitals()
