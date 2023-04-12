import { Piece } from '../../../game/pieces'
import { MovingService } from '../../../game/suppliers'
import { GameServiceBackend } from '../../../backend-service-connector/service/GameServiceBackend'

export type TField = {
  id: string
  piece?: Piece
  color: string
  gameServiceBackend: GameServiceBackend
  movingService: MovingService
  onPieceClick: any
  correctMove: boolean
  makeMove:any
  isCheck: boolean
}