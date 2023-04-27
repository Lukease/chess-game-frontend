import { Piece } from '../../../game/pieces'
import { MovingService } from '../../../game/suppliers'
import { GameService } from '../../../backend-service-connector/service'

export type TField = {
  id: string
  piece?: Piece
  color: string
  gameService: GameService
  movingService: MovingService
  onPieceClick: any
  correctMove: boolean
  makeMove:any
  isCheck: boolean
  lastMove: boolean
}