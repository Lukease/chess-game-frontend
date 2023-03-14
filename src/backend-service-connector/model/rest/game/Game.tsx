import { User } from '../user/User'

export class Game {
  id: number | undefined
  moves: string
  lastMoveBlack: Date | undefined
  lastMoveWhite: Date | undefined
  timePerPlayerInSeconds: number
  gameStatus: string| undefined
  whitePlayer: User | undefined
  blackPlayer: User | undefined

  constructor(timePerPlayerInSeconds: number, gameStatus: string | undefined, whitePlayer: User | undefined, blackPlayer: User | undefined,
              id: number | undefined, moves: string, lastMoveBlack: Date | undefined,
              lastMoveWhite: Date | undefined) {
    this.id = id
    this.moves = moves
    this.lastMoveBlack = lastMoveBlack
    this.lastMoveWhite = lastMoveWhite
    this.timePerPlayerInSeconds = timePerPlayerInSeconds
    this.gameStatus = gameStatus
    this.whitePlayer = whitePlayer
    this.blackPlayer = blackPlayer
  }
}