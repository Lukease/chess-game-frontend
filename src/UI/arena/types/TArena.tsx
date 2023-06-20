import { MovingService, NavigationService } from '../../../game/suppliers'
import { GameService,PositionEditorService,HistoryService } from '../../../backend-service-connector/service'

export type TArena = {
  movingService: MovingService
  navigationService: NavigationService
  gameService: GameService
  historyService: HistoryService
  positionEditorService: PositionEditorService
}