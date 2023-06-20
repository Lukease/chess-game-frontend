import { MovingService, NavigationService } from '../../../game/suppliers'
import { GameService, PositionEditorService, HistoryService } from '../../../backend-service-connector/service'
import { MakeMoveResponse } from '../../../backend-service-connector/model/rest/game/MakeMoveResponse'
import { Piece } from '../../../game/pieces'
import { PositionEditorInfo } from '../../../backend-service-connector/model/rest/game/PositionEditorInfo'
import { MakeMoveRequest } from '../../../backend-service-connector/model/rest/game/MakeMoveRequest'

export type TBoard = {
  movingService: MovingService
  navigationService: NavigationService
  historyService: HistoryService
  gameService: GameService
  isPawnPromotion: (request: MakeMoveRequest) => void
  makeMoveResponse?: MakeMoveResponse
  location: string
  positionEditorInfo?: PositionEditorInfo
  editPieceLocation: (copiedPiece: Piece, x: number, y: number, pieceFromBoard: boolean) => void
  trashActive: boolean
  isPositionEditorMode: boolean
  positionEditorService: PositionEditorService
}