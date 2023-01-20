import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import Arena from './UI/Arena'
import {GameService, HistoryService, MovingService, NavigationService} from './game/suppliers'
import {UserService} from "./backend-service-connector/service";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Navigation} from "./UI/login/loginNavigation";
import {SettingsMenu} from "./UI/settings/settings-menu";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
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
                    element={<Navigation userService={userService}/>}
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
                }/>
            <Route path={'/settings'}
                   element={<SettingsMenu userService={userService}/>}
            />
        </Routes>
    </Router>
)

reportWebVitals()
