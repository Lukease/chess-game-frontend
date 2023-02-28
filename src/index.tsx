import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import Arena from './UI/arena/Arena'
import { GameService, HistoryService, MovingService, NavigationService } from './game/suppliers'
import { UserService } from './backend-service-connector/service'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LoginNavigation } from './UI/login/LoginNavigation'
import { Context } from './UI/context/context'
import { UserSettings } from './UI/settings/UserSettings'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)

const gameService = new GameService()
const userService = new UserService()
const movingService = new MovingService()
const navigationService = new NavigationService()
const historyService = new HistoryService()

root.render(
  <Router>
    <Routes>
      <Route path={'/'}
             element={
               <Context.Provider value={userService}>
                 <LoginNavigation />
               </Context.Provider>
             }
      />
      <Route
        path='/game'
        element={
          <Arena
            gameService={gameService}
            movingService={movingService}
            navigationService={navigationService}
            historyService={historyService}
          />
        } />
      <Route path={'/settings'}
             element={
               <Context.Provider value={userService}>
                 <UserSettings />
               </Context.Provider>
             }
      />
    </Routes>
  </Router>,
)

reportWebVitals()
