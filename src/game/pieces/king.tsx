import {Piece} from './piece'
import {MovingStrategies} from '../suppliers'
import {Vector2d} from '../chess-possible-move'
import {MoveType, MoveTypes} from "../suppliers/move-type";

export class King extends Piece {
    constructor(color: string, id: string, name: string) {
        super(color, id, name, [MovingStrategies.lineMoving, MovingStrategies.diagonalMoving])
    }

    getAllPossibleDirections(): Array<Vector2d> {
        return [
            ...MovingStrategies.diagonalMoving.getAllPossibleDirections(),
            ...MovingStrategies.lineMoving.getAllPossibleDirections()
        ]
    }

    getImageUrl(): string {
        return require(`../../chess_icon/${this.color}-King.svg`)
    }

    canDelete(): boolean {
        return false
    }

    canMoveMultipleSquares(): boolean {
        return false
    }

    getPieceIcon(): string {
        return '♔'
    }

    canGoToTheSameField(): boolean {
        return false
    }

    getSpecialMoves(): Array<MoveType> {
        return [MoveTypes.SMALL_CASTLE, MoveTypes.BIG_CASTLE]
    }
}