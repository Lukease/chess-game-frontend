import { Piece } from '../../../../game/pieces'
import { GameDto } from './GameDto'

export type MakeMoveResponse = {
  pieces: Array<Piece>
  gameDto: GameDto
  whoseTurn: string
  playerColor: string
  kingIsChecked: boolean
}