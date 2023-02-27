import {Piece} from './Piece'
import {MovingStrategies} from '../suppliers'
import {Vector2d} from '../chess-possible-move'

export class Knight extends Piece {
    constructor(color: string, id: string,  name: string) {
        super(color, id,  name,[MovingStrategies.knightMoving])
    }

    getAllPossibleDirections(): Array<Vector2d> {
        return MovingStrategies.knightMoving.getAllPossibleDirections()
    }

    getImageUrl(): string {
        return require(`../../chess_icon/${this.color}-Knight.svg`)
    }

    canMoveMultipleSquares(): boolean {
        return false
    }

    getPieceIcon(): string {
        return '♘'
    }

    canGoToTheSameField(): boolean {
        return true
    }
}

