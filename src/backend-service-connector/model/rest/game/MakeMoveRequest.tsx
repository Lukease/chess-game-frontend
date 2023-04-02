import { Piece } from '../../../../game/pieces'

export type MakeMoveRequest = {
  piece: Piece
  moveId: string
}