import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import Arena from './UI/arena/Arena'
import { MovingService, NavigationService } from './game/suppliers'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LoginNavigation } from './UI/login/LoginNavigation'
import { ContextUser, ContextGame, ContextHistory } from './UI/context/contextUser'
import { UserSettings } from './UI/settings/UserSettings'
import { MainSite } from './UI/new-game/MainSite'
import { GameService, PositionEditorService, HistoryService, UserService } from './backend-service-connector/service'
import { PlayersInfo } from './UI/players-info/PlayersInfo'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)

const userService = new UserService()
const movingService = new MovingService()
const navigationService = new NavigationService()
const historyService = new HistoryService()
const gameService = new GameService()
const positionEditorService = new PositionEditorService()

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
            positionEditorService={positionEditorService}
          />
        } />
      <Route
        path='/position-editor'
        element={
          <Arena
            movingService={movingService}
            navigationService={navigationService}
            historyService={historyService}
            gameService={gameService}
            positionEditorService={positionEditorService}
          />
        } />
      <Route
        path='/history'
        element={
          <Arena
            movingService={movingService}
            navigationService={navigationService}
            historyService={historyService}
            gameService={gameService}
            positionEditorService={positionEditorService}
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
               <ContextHistory.Provider value={historyService}>
                 <PlayersInfo userService={userService} />
               </ContextHistory.Provider>
             }
      />
      <Route path={'/new-game'}
             element={
               <ContextGame.Provider value={gameService}>
                 <MainSite />
               </ContextGame.Provider>
             }
      />
    </Routes>
  </Router>,
)

reportWebVitals()
