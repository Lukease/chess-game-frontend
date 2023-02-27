import {Piece} from '../../../game/pieces'
import {GameService, HistoryService, MovingService} from '../../../game/suppliers'

export type TField = {
    rowNumber: number
    id: string
    columnNumber: number
    piece: Piece
    key: string
    color: string
    gameService: GameService
    movingService: MovingService
    historyService: HistoryService
}