import {Piece} from './piece'
import {MovingStrategies} from '../suppliers/moving-strategy-service'
import {Coordinate} from './coordinate'

export class Bishop extends Piece {
    constructor(color: string, id: string, name: string) {
        super(color, id,name,[MovingStrategies.diagonalMoving])
    }
    getAllPossibleMoves(): Array<Coordinate> {
        return MovingStrategies.diagonalMoving.getAllPossibleMoves(this.coordinate)
    }


    getImageUrl(): string {
        return require(`../../chess_icon/${this.color}-Bishop.svg`)
    }

    canJump(): boolean {
        return false;
    }

}
