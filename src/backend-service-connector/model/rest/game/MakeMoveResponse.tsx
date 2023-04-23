import { Piece } from '../../../../game/pieces'
import { GameDto } from './GameDto'

export type MakeMoveResponse = {
  pieces: Array<Piece>
  gameInfo: GameDto
  whoseTurn: string
  playerColor: string
  kingIsChecked: Array<string>
}