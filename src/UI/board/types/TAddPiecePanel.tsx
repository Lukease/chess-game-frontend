import {GameService, MovingService} from '../../../game/suppliers'
import {Piece} from '../../../game/pieces'

export type TAddPiecePanel = {
    gameService: GameService
    movingService: MovingService
    piecesArray: Array<Piece>
    panelColor: string
}