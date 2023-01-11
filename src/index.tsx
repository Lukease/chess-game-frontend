import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import Arena from './UI/Arena'
import {GameService, HistoryService, MovingService, NavigationService} from './game/suppliers'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const gameService = new GameService()
const movingService = new MovingService()
const navigationService = new NavigationService()
const historyService = new HistoryService()
root.render(
    <Arena
    gameService={gameService}
    movingService={movingService}
    navigationService={navigationService}
    historyService={historyService}
    />
)

reportWebVitals()
