import { getAllPossibleMoves, getCorrectMoves } from '../possible-moves-utils'

export const correctMovesOfBishop = (columnNumber: number, fieldNumber: number, color: string) => {
    const moves: Array<Array<number>> = [
        [ - 1,  - 1],
        [ - 2,  - 2],
        [ - 3,  - 3],
        [ - 4,  - 4],
        [ - 5,  - 5],
        [ - 6,  - 6],
        [ - 7,  - 7],
        [  1,  - 1],
        [  2,  - 2],
        [  3,  - 3],
        [  4,  - 4],
        [  5,  - 5],
        [  6,  - 6],
        [  7,  - 7],
        [ - 1,   1],
        [ - 2,   2],
        [ - 3,   3],
        [ - 4,   4],
        [ - 5,   5],
        [ - 6,   6],
        [ - 7,   7],
        [  1,   1],
        [  2,   2],
        [  3,   3],
        [  4,   4],
        [  5,   5],
        [  6,   6],
        [  7,   7],
    ]

    const getCorrectFieldsId = getAllPossibleMoves(moves, columnNumber, fieldNumber)

    return getCorrectMoves(getCorrectFieldsId, color)
}