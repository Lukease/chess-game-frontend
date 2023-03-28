import {GameService, HistoryService, MovingService, NavigationService} from '../../../game/suppliers'
import {Piece} from '../../../game/pieces'

export type TBoard = {
    gameService: GameService
    movingService: MovingService
    navigationService: NavigationService
    historyService: HistoryService
}