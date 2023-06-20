import {
  UserService,
  GameService,
  HistoryService,
  PositionEditorService,
} from '../../backend-service-connector/service'
import { createContext } from 'react'

const userService = new UserService()
const gameService = new GameService()
const historyService = new HistoryService()
const positionEditorService = new PositionEditorService()

export const ContextUser = createContext(userService)
export const ContextGame = createContext(gameService)
export const ContextHistory = createContext(historyService)
export const ContextEditor = createContext(positionEditorService)
