import {GameService, HistoryService, MovingService, NavigationService} from '../../../game/suppliers'
import { GameServiceBackend } from '../../../backend-service-connector/service/GameServiceBackend'

export type TBoard = {
    gameService: GameService
    movingService: MovingService
    navigationService: NavigationService
    historyService: HistoryService
    gameServiceBackend: GameServiceBackend
}