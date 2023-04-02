import { User } from '../user/User'

export type GameDto = {
  id: number
  moves: string
  lastMoveWhite: Date
  timePerPlayerInSeconds: number
  gameStatus: string
  fen: string
  whitePlayer: User
  blackPlayer: User
}