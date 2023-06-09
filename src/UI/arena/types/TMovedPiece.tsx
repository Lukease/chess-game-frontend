import { Piece } from '../../../game/pieces'

export type TMovedPiece = {
  selectedPiece: Piece
  coordinateY: number
  coordinateX: number
}