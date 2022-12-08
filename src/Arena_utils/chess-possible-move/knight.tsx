import {getCorrectMoves } from '../possible-moves-utils'
import {Piece} from './piece'
import {MovingStrategies} from '../suppliers/moving-strategy-service'
import {Coordinate} from './coordinate'

export class Knight extends Piece {
    constructor(color: string, id: string,  name: string) {
        super(color, id,  name,[MovingStrategies.knightMoving])
    }

    getAllPossibleMoves(): Array<Coordinate> {
        return MovingStrategies.knightMoving.getAllPossibleMoves(this.coordinate)
    }

    getImageUrl(): string {
        return require(`../../chess_icon/${this.color}-Knight.svg`)
    }

    canJump(): boolean {
        return true
    }
}

