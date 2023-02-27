import {UserService} from '../../backend-service-connector/service'
import {createContext} from 'react'
import {GameService, HistoryService} from '../../game/suppliers'

const userService = new UserService()
const gameService = new GameService()
const historyService = new HistoryService()

export const Context = createContext(userService)
export const GameServiceContext = createContext(gameService)
export const HistoryServiceContext = createContext(historyService)