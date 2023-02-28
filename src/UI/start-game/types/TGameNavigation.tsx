import { GameService, MovingService, NavigationService } from '../../../game/suppliers'
import { Piece } from '../../../game/pieces'

export type TGameNavigation = {
  gameService: GameService
  movingService: MovingService
  navigationService: NavigationService
  kings: Array<Piece>
}