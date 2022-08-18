import { getAllPossibleMoves, getCorrectMoves } from '../possible-moves-utils'

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

