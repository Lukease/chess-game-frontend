import {getAllPossibleMoves} from '../possible-moves-utils'
import {getCorrectIds} from './possible-move-utils'
import {Move} from './move'
import {Piece} from './piece'

export class Bishop extends Piece {
    getAllPossibleMoves(): Move[] {
        let bishop: Move = new Move(false, 'A1')
        return [bishop]
    }

    getImageUrl(): string {
        return `${this.color}-Bishop`
    }
}

export const correctMovesOfBishop = (columnNumber: number, fieldNumber: number, color: string) => {
    const movesLeftBottom: Array<Array<number>> =  Array(7).fill('').map((name ,index)=>{
            return [-(index + 1), -(index + 1)]
        })

    const movesRightBottom: Array<Array<number>> = Array(7).fill('').map((name, index) => {
        return [index + 1, -(index + 1)]
    })

    const movesLeftTop: Array<Array<number>> = Array(7).fill('').map((name, index) => {
        return [-(index + 1), index + 1]
    })

    const movesRightTop: Array<Array<number>> = Array(7).fill('').map((name, index) => {
        return [index + 1, index + 1]
    })

    const getCorrectFieldsIdLeftTop = getAllPossibleMoves(movesLeftTop, columnNumber, fieldNumber)
    const getCorrectFieldsIdRightBottom = getAllPossibleMoves(movesRightBottom, columnNumber, fieldNumber)
    const getCorrectFieldsIdLeftBottom = getAllPossibleMoves(movesLeftBottom, columnNumber, fieldNumber)
    const getCorrectFieldsIdRightTop = getAllPossibleMoves(movesRightTop, columnNumber, fieldNumber)

    const leftTopSide = getCorrectIds(getCorrectFieldsIdLeftTop, color)
    const rightTopSide = getCorrectIds(getCorrectFieldsIdRightTop, color)
    const leftBottomSide = getCorrectIds(getCorrectFieldsIdLeftBottom, color)
    const rightBottomSide = getCorrectIds(getCorrectFieldsIdRightBottom, color)

    return [...leftTopSide, ...rightTopSide, ...leftBottomSide, ...rightBottomSide].filter(id => id !== 'last')
}