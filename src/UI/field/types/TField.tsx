import { Piece } from '../../../game/pieces'
import { GameService, MovingService } from '../../../game/suppliers'

export type TField = {
  id: string
  selectedPiece: Piece
  color: string
  gameService: GameService
  movingService: MovingService
}