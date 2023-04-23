import { MovingService, NavigationService } from '../../../game/suppliers'
import { GameServiceBackend } from '../../../backend-service-connector/service'

export type TGameNavigation = {
  movingService: MovingService
  navigationService: NavigationService
  gameServiceBackend: GameServiceBackend
}