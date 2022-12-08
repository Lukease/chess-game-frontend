import {Piece} from './piece'
import {MovingStrategies} from '../suppliers/moving-strategy-service'
import {Coordinate} from "./coordinate";


export class Queen extends Piece {
    constructor(color: string, id: string, name: string) {
        super(color, id, name, [MovingStrategies.diagonalMoving, MovingStrategies.lineMoving])
    }

    getAllPossibleMoves(): Array<Coordinate> {
        return [
            ...MovingStrategies.diagonalMoving.getAllPossibleMoves(this.coordinate),
            ...MovingStrategies.lineMoving.getAllPossibleMoves(this.coordinate)
        ]
    }

    getImageUrl(): string {
        return require(`../../chess_icon/${this.color}-Queen.svg`)
    }

    canJump(): boolean {
        return false;
    }
}