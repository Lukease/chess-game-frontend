import { GameService, MovingService } from '../../../game/suppliers'

export type TAddPiecePanel = {
  gameService: GameService
  movingService: MovingService
  color: string
}