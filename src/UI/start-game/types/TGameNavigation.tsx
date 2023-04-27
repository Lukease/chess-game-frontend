import { MovingService, NavigationService } from '../../../game/suppliers'
import { GameService } from '../../../backend-service-connector/service'

export type TGameNavigation = {
  movingService: MovingService
  navigationService: NavigationService
  gameService: GameService
}