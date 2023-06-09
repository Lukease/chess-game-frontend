import { Piece } from '../../../game/pieces'

export type TAddPiecePanel = {
  color: string
  trashActive: boolean
  setTrashActive: (isActive: boolean) => void
  handleCopy: (copiedPiece: Piece, x: number, y: number, pieceFromBoard: boolean) => void
  setMode: (isEditorMode: boolean) => void
  isPositionEditorMode: boolean
}