import { UserService } from '../../backend-service-connector/service'
import { createContext } from 'react'
import { GameServiceBackend } from '../../backend-service-connector/service/GameServiceBackend'

const userService = new UserService()
const gameServiceBackend = new GameServiceBackend()

export const Context = createContext(userService)
export const ContextGameBackend = createContext(gameServiceBackend)
