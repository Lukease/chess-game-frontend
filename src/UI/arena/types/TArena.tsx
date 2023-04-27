import { HistoryService, MovingService, NavigationService } from '../../../game/suppliers'
import { GameService } from '../../../backend-service-connector/service'

export type TArena = {
  movingService: MovingService
  navigationService: NavigationService
  gameService: GameService
  historyService: HistoryService
}