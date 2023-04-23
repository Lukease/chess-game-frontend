import { HistoryService, MovingService, NavigationService } from '../../../game/suppliers'
import { GameServiceBackend } from '../../../backend-service-connector/service'

export type TBoard = {
  movingService: MovingService
  navigationService: NavigationService
  historyService: HistoryService
  gameServiceBackend: GameServiceBackend
  isPawnPromotion: any
}