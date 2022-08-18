import { getAllPossibleMoves, getCorrectMoves } from '../possible-moves-utils'

export const correctMovesOfRook = (columnNumber: number, fieldNumber: number, color: string) => {
    const moves: Array<Array<number>> = [
        [0 ,   1],
        [0 ,   2],
        [0 ,   3],
        [0 ,   4],
        [0 ,   5],
        [0 ,   6],
        [0 ,   7],
        [0 ,  - 7],
        [0 ,  - 6],
        [0 ,  - 5],
        [0 ,  - 4],
        [0 ,  - 3],
        [0 ,  - 2],
        [0 ,  - 1],
        [ - 1, 0],
        [ - 2, 0],
        [ - 3, 0],
        [ - 4, 0],
        [ - 5, 0],
        [ - 6, 0],
        [ - 7, 0],
        [  1, 0],
        [  2, 0],
        [  3, 0],
        [  4, 0],
        [  5, 0],
        [  6, 0],
        [  7, 0],
    ]

    const getCorrectFieldsId = getAllPossibleMoves(moves, columnNumber, fieldNumber)

    return getCorrectMoves(getCorrectFieldsId, color)
}