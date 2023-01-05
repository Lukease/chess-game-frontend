import {Piece} from './piece'
import {MovingStrategies} from '../suppliers'
import {Vector2d} from '../chess-possible-move'

export class Rook extends Piece {
    constructor(color: string, id: string,  name: string) {
        super(color, id,  name,[MovingStrategies.lineMoving])
    }
    getAllPossibleDirections(): Array<Vector2d> {
        return MovingStrategies.lineMoving.getAllPossibleDirections()
    }

    getImageUrl(): string {
        return require(`../../chess_icon/${this.color}-Rook.svg`)
    }

    canMoveMultipleSquares(): boolean {
        return true;
    }

    getPieceIcon(): string {
        return '♖'
    }

    canGoToTheSameField(): boolean {
        return true
    }
}
