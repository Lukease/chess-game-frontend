import { getAllPossibleMoves, getCorrectMoves } from '../possible-moves-utils'

export const correctMovesOfPawn = (columnNumber: number, fieldNumber: number, color: string) => {

    const moves: Array<Array<number>> = [
    [1,2]
    ]

    const getCorrectFieldsId = getAllPossibleMoves(moves, columnNumber, fieldNumber)

    return getCorrectMoves(getCorrectFieldsId, color)
}