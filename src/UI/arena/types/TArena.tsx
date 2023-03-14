import {GameService, HistoryService, MovingService, NavigationService} from '../../../game/suppliers'
import { GameServiceBackend } from '../../../backend-service-connector/service/GameServiceBackend'

export type TArena = {
    gameService:GameService
    movingService:MovingService
    navigationService:NavigationService
    gameServiceBackend: GameServiceBackend
    historyService:HistoryService
}