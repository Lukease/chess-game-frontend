import {Piece} from './piece'
import {MovingStrategies} from '../suppliers/moving-strategy-service'
import {Coordinate} from "./coordinate";

export class Bishop extends Piece {
    constructor(color: string, id: string, name: string) {
        super(color, id,name,[MovingStrategies.diagonalMoving])
    }
    getAllPossibleMoves(): Array<Coordinate> {
        let bishop: Coordinate = new Coordinate(1,1,'A','1')
        return [bishop]
    }


    getImageUrl(): string {
        return `${this.color}-Bishop`
    }

    canJump(): boolean {
        return false;
    }

}
