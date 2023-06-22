import { Piece } from '../../../../game/pieces'
import { Game } from './Game'

export type MakeMoveResponse = {
  pieces: Array<Piece>
  gameInfo?: Game
  whoseTurn?: string
  playerColor?: string
  kingIsChecked?: Array<string>
  fieldFromTo?: Array<string>
}