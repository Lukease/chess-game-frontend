import { HistoryService, MovingService, NavigationService } from '../../../game/suppliers'
import { GameService } from '../../../backend-service-connector/service'
import { MakeMoveResponse } from '../../../backend-service-connector/model/rest/game/MakeMoveResponse'

export type TBoard = {
  movingService: MovingService
  navigationService: NavigationService
  historyService: HistoryService
  gameService: GameService
  isPawnPromotion: any
  makeMoveResponse?: MakeMoveResponse
}