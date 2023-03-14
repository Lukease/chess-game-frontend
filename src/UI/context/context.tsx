import { UserService } from '../../backend-service-connector/service'
import { createContext } from 'react'
import { GameServiceBackend } from '../../backend-service-connector/service/GameServiceBackend'
import { GameService } from '../../game/suppliers'

const userService = new UserService()
const gameServiceBackend = new GameServiceBackend()
const gameService = new GameService()

export const Context = createContext(userService)
export const ContextGameBackend = createContext(gameServiceBackend)
export const ContextGame = createContext(gameService)
