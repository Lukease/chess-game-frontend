import { UserService, GameService } from '../../backend-service-connector/service'
import { createContext } from 'react'

const userService = new UserService()
const gameService = new GameService()

export const ContextUser = createContext(userService)
export const ContextGame = createContext(gameService)
