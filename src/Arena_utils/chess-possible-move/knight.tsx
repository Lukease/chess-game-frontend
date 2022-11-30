import { getAllPossibleMoves, getCorrectMoves } from '../possible-moves-utils'
import {Move} from './move'
import {Piece} from './piece'
import {MovingStrategies} from '../suppliers/moving-strategy-service'

export class Knight extends Piece {
    constructor(color: string, id: string,  name: string) {
        super(color, id,  name,[MovingStrategies.knightMoving])
    }

    getAllPossibleMoves(): Move[] {
        let knight: Move = new Move(false, 'A1')
        return [knight]
    }

    getImageUrl(): string {
        return `${this.color}-Knight`
    }

    canJump(): boolean {
        return true
    }
}

export const correctMovesOfKnight = (columnNumber: number, fieldNumber: number, color: string) => {

    const moves: Array<Array<number>> = [
        [-1, 2],
        [-1, -2],
        [1, -2],
        [1, 2],
        [2, 1],
        [2, -1],
        [-2, 1],
        [-2, -1],
    ]
    const getCorrectFieldsId = getAllPossibleMoves(moves, columnNumber, fieldNumber)

    return getCorrectMoves(getCorrectFieldsId, color)
}

