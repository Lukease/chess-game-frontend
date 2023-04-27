import { User } from '../user/User'

export type Game = {
  id?: number
  moves: string
  lastMoveBlack?: Date
  lastMoveWhite?: Date
  timeLeftWhite: number
  timeLeftBlack: number
  timePerPlayerInSeconds: number
  gameStatus: string
  fen: string
  whitePlayer?: User
  blackPlayer?: User
}