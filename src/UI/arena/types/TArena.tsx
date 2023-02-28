import {GameService, HistoryService, MovingService, NavigationService} from '../../../game/suppliers'

export type TArena = {
    gameService:GameService
    movingService:MovingService
    navigationService:NavigationService
    historyService:HistoryService
}