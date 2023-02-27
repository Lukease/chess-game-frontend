import {Piece} from './Piece'
import {MovingStrategies} from '../suppliers'
import {Vector2d} from '../chess-possible-move'

export class Queen extends Piece {
    constructor(color: string, id: string, name: string) {
        super(color, id, name, [MovingStrategies.diagonalMoving, MovingStrategies.lineMoving])
    }

    getAllPossibleDirections(): Array<Vector2d> {
        return [
            ...MovingStrategies.diagonalMoving.getAllPossibleDirections(),
            ...MovingStrategies.lineMoving.getAllPossibleDirections()
        ]
    }

    getImageUrl(): string {
        return require(`../../chess_icon/${this.color}-Queen.svg`)
    }

    canMoveMultipleSquares(): boolean {
        return true
    }

    getPieceIcon(): string {
        return '♕'
    }

    canGoToTheSameField(): boolean {
        return false
    }
}