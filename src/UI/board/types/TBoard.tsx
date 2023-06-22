import { GameService, PositionEditorService } from '../../../backend-service-connector/service'
import { MakeMoveResponse } from '../../../backend-service-connector/model/rest/game/MakeMoveResponse'
import { Piece } from '../../../game/pieces'
import { MakeMoveRequest } from '../../../backend-service-connector/model/rest/game/MakeMoveRequest'

export type TBoard = {
  gameService: GameService
  isPawnPromotion: (request: MakeMoveRequest) => void
  gameInfo?: MakeMoveResponse
  location: string
  editPieceLocation: (copiedPiece: Piece, x: number, y: number, pieceFromBoard: boolean) => void
  trashActive: boolean
  isPositionEditorMode: boolean
  positionEditorService: PositionEditorService
}