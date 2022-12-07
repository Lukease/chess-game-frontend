import {getCorrectIds} from './possible-move-utils'
import {Piece} from './piece'
import {MovingStrategies} from '../suppliers/moving-strategy-service'
import {Coordinate} from "./coordinate";

export class Rook extends Piece {
    constructor(color: string, id: string,  name: string) {
        super(color, id,  name,[MovingStrategies.lineMoving])
    }
    getAllPossibleMoves(): Array<Coordinate> {
        let rook: Coordinate = new Coordinate(1,1,'A','1')
        return [rook]
    }

    getImageUrl(): string {
        return `${this.color}-Rook`
    }

    canJump(): boolean {
        return false;
    }
}

export const correctMovesOfRook = (columnNumber: number, fieldNumber: number, color: string) => {
    const movesTop: Array<Array<number>> =  Array(7).fill('').map((name ,index)=>{
            return [0, index + 1]
        })
    const movesBottom: Array<Array<number>> =  Array(7).fill('').map((name ,index)=>{
            return [0, -(index + 1)]
        })
    const movesLeft: Array<Array<number>> =  Array(7).fill('').map((name ,index)=>{
            return [-(index + 1), 0]
        })
    const movesRight: Array<Array<number>> =  Array(7).fill('').map((name ,index)=>{
            return [index + 1, 0]
        })

    // const getCorrectFieldsIdTop = getAllPossibleMoves(movesTop, columnNumber, fieldNumber)
    const getCorrectFieldsIdTop = ['A1']
    // const getCorrectFieldsIdBottom = getAllPossibleMoves(movesBottom, columnNumber, fieldNumber)
    const getCorrectFieldsIdBottom = ['A1']
    // const getCorrectFieldsIdLeft = getAllPossibleMoves(movesLeft, columnNumber, fieldNumber)
    const getCorrectFieldsIdLeft = ['A1']
    // const getCorrectFieldsIdRight = getAllPossibleMoves(movesRight, columnNumber, fieldNumber)
    const getCorrectFieldsIdRight = ['A1']
    const leftSide = getCorrectIds(getCorrectFieldsIdLeft, color)
    const rightSide = getCorrectIds(getCorrectFieldsIdRight, color)
    const topSide = getCorrectIds(getCorrectFieldsIdTop, color)
    const bottomSide = getCorrectIds(getCorrectFieldsIdBottom, color)

    return [...leftSide,...rightSide,...topSide,...bottomSide].filter(id => id !== 'last')
}


