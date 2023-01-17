import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import Arena from './UI/Arena'
import {GameService, HistoryService, MovingService, NavigationService} from './game/suppliers'
import {UserService} from "./backend-service-connector/service/userService";
import {UserDto} from "./backend-service-connector/model/rest/userDto";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

const gameService = new GameService()
const userService = new UserService()
const movingService = new MovingService()
const navigationService = new NavigationService()
const historyService = new HistoryService()
userService.addNewUser(new UserDto(undefined,'luy','1213',"12asc@gmail.com"))
root.render(
    <Arena
        gameService={gameService}
        movingService={movingService}
        navigationService={navigationService}
        historyService={historyService}
    />
)

reportWebVitals()
