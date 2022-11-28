import {Move} from './move'
import {Piece} from './piece'
import {MovingStrategies} from '../suppliers/moving-strategy-service'

export class Bishop extends Piece {
    constructor(color: string, id: string, position: Array<number>, name: string) {
        super(color, id, position, name,[MovingStrategies.diagonalMoving])
    }
    getAllPossibleMoves(): Move[] {
        let king: Move = new Move(false, 'A1')
        return [king]
    }


    getImageUrl(): string {
        return `${this.color}-Bishop`
    }
}
