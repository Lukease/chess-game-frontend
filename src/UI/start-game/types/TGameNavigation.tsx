import { GameService, MovingService, NavigationService } from '../../../game/suppliers'
import { GameServiceBackend } from '../../../backend-service-connector/service'

export type TGameNavigation = {
  gameService: GameService
  movingService: MovingService
  navigationService: NavigationService
  gameServiceBackend: GameServiceBackend
}