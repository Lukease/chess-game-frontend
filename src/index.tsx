import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import Arena from './Arena'
import {GameService} from "./Arena_utils/suppliers/game-service";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
const gameService = new GameService()

root.render(
    <Arena
    gameService={gameService}
    />
)

reportWebVitals()
