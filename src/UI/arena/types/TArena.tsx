import { GameService,PositionEditorService,HistoryService } from '../../../backend-service-connector/service'

export type TArena = {
  gameService: GameService
  historyService: HistoryService
  positionEditorService: PositionEditorService
}