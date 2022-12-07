import {getCorrectMoves } from '../possible-moves-utils'
import {Piece} from './piece'
import {MovingStrategies} from '../suppliers/moving-strategy-service'
import {Coordinate} from "./coordinate";

export class Knight extends Piece {
    constructor(color: string, id: string,  name: string) {
        super(color, id,  name,[MovingStrategies.knightMoving])
    }

    getAllPossibleMoves(): Array<Coordinate> {
        let knight: Coordinate = new Coordinate(1,1,'A','1')
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
    // const getCorrectFieldsId = getAllPossibleMoves(moves, columnNumber, fieldNumber)
    const getCorrectFieldsId = ['A1']

    return getCorrectMoves(getCorrectFieldsId, color)
}

