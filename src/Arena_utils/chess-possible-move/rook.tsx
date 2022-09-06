import {getAllPossibleMoves} from '../possible-moves-utils'
import {getCorrectIds} from "./possible-move-utils";

export const correctMovesOfRook = (columnNumber: number, fieldNumber: number, color: string) => {
    const movesTop: Array<Array<number>> = [
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [0, 5],
        [0, 6],
        [0, 7]]
    const movesBottom: Array<Array<number>> = [
        [0, -1],
        [0, -2],
        [0, -3],
        [0, -4],
        [0, -5],
        [0, -6],
        [0, -7]]
    const movesLeft: Array<Array<number>> = [
        [-1, 0],
        [-2, 0],
        [-3, 0],
        [-4, 0],
        [-5, 0],
        [-6, 0],
        [-7, 0]]
    const movesRight: Array<Array<number>> = [
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
        [5, 0],
        [6, 0],
        [7, 0]]

    const getCorrectFieldsIdTop = getAllPossibleMoves(movesTop, columnNumber, fieldNumber)
    const getCorrectFieldsIdBottom = getAllPossibleMoves(movesBottom, columnNumber, fieldNumber)
    const getCorrectFieldsIdLeft = getAllPossibleMoves(movesLeft, columnNumber, fieldNumber)
    const getCorrectFieldsIdRight = getAllPossibleMoves(movesRight, columnNumber, fieldNumber)
    const leftSide = getCorrectIds(getCorrectFieldsIdLeft, color)
    const rightSide = getCorrectIds(getCorrectFieldsIdRight, color)
    const topSide = getCorrectIds(getCorrectFieldsIdTop, color)
    const bottomSide = getCorrectIds(getCorrectFieldsIdBottom, color)

    return [...leftSide,...rightSide,...topSide,...bottomSide].filter(id => id !== 'last')
}


