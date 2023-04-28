import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import Arena from './UI/arena/Arena'
import { HistoryService, MovingService, NavigationService } from './game/suppliers'
import { UserService } from './backend-service-connector/service'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LoginNavigation } from './UI/login/LoginNavigation'
import { ContextUser, ContextGame } from './UI/context/contextUser'
import { UserSettings } from './UI/settings/UserSettings'
import { NewGamePanel } from './UI/new-game/NewGamePanel'
import { GameService } from './backend-service-connector/service'
import { PlayersInfo } from './UI/players-info/PlayersInfo'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)

const userService = new UserService()
const movingService = new MovingService()
const navigationService = new NavigationService()
const historyService = new HistoryService()
const gameService = new GameService()

root.render(
  <Router>
    <Routes>
      <Route path={'/'}
             element={
               <ContextUser.Provider value={userService}>
                 <LoginNavigation />
               </ContextUser.Provider>
             }
      />
      <Route
        path='/game'
        element={
          <Arena
            movingService={movingService}
            navigationService={navigationService}
            historyService={historyService}
            gameService={gameService}
          />
        } />
      <Route path={'/settings'}
             element={
               <ContextUser.Provider value={userService}>
                 <UserSettings />
               </ContextUser.Provider>
             }
      />
      <Route path={'/players-info'}
             element={
               <ContextUser.Provider value={userService}>
                 <PlayersInfo />
               </ContextUser.Provider>
             }
      />
      <Route path={'/new-game'}
             element={
               <ContextGame.Provider value={gameService}>
                 <NewGamePanel />
               </ContextGame.Provider>
             }
      />
    </Routes>
  </Router>,
)

reportWebVitals()
