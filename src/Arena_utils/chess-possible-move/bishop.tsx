import {Move} from './move'
import {Piece} from './piece'
import {MovingStrategies} from '../suppliers/moving-strategy-service'
import {Coordinate} from "./coordinate";

export class Bishop extends Piece {
    constructor(color: string, id: string, name: string) {
        super(color, id,name,[MovingStrategies.diagonalMoving])
    }
    getAllPossibleMoves(): Array<Coordinate> {
        let king: Move = new Move(false, 'A1')
        return [king]
    }


    getImageUrl(): string {
        return `${this.color}-Bishop`
    }

    canJump(): boolean {
        return false;
    }

}
