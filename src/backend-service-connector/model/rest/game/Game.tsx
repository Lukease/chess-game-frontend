import { User } from '../user/User'

export type Game = {
  id: number | undefined
  moves: string
  lastMoveBlack: Date | undefined
  lastMoveWhite: Date | undefined
  timePerPlayerInSeconds: number
  gameStatus: string | undefined
  fen: string
  whitePlayer: User | undefined
  blackPlayer: User | undefined
}