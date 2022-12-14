import {Piece} from './piece'
import {MovingStrategies} from '../suppliers/moving-strategy-service'
import {Vector2d} from '../chess-possible-move/2d-vestors'

export class Bishop extends Piece {
    constructor(color: string, id: string, name: string) {
        super(color, id,name,[MovingStrategies.diagonalMoving])
    }
    getAllPossibleDirections(): Array<Vector2d> {
        return MovingStrategies.diagonalMoving.getAllPossibleDirections()
    }


    getImageUrl(): string {
        return require(`../../chess_icon/${this.color}-Bishop.svg`)
    }

    canMoveMultipleSquares(): boolean {
        return true;
    }

}
