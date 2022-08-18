import { getAllPossibleMoves, getCorrectMoves } from '../possible-moves-utils'

export const correctMovesOfKing = (columnNumber: number, fieldNumber: number, color: string) => {

    const moves: Array<Array<number>> = [
        [0, 1],
        [0, -1],
        [1, -1],
        [1, 0],
        [1, 1],
        [-1, -1],
        [-1, 0],
        [-1, 1],
    ]

    const getCorrectFieldsId = getAllPossibleMoves(moves, columnNumber, fieldNumber)

    return getCorrectMoves(getCorrectFieldsId, color)
}