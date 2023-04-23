import { HistoryService, MovingService, NavigationService } from '../../../game/suppliers'
import { GameServiceBackend } from '../../../backend-service-connector/service'

export type TArena = {
  movingService: MovingService
  navigationService: NavigationService
  gameServiceBackend: GameServiceBackend
  historyService: HistoryService
}