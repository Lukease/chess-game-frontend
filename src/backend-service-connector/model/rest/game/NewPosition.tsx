import { Piece } from '../../../../game/pieces'

export type NewPosition = {
  piece: Piece
  newId: string
  isFromBoard: boolean
}