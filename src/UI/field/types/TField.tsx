import { Piece } from '../../../game/pieces'
import { GameService } from '../../../backend-service-connector/service'

export type TField = {
  id: string
  piece?: Piece
  color: string
  gameService: GameService
  onPieceClick: (fieldId: string) => void
  correctMove: boolean
  makeMove: (id: string) => void
  isCheck: boolean
  lastMove: boolean
  handleCopy: (copiedPiece: Piece, x: number, y: number, pieceFromBoard: boolean) => void
  location: string
  trashActive: boolean
  isPositionEditorMode: boolean
}