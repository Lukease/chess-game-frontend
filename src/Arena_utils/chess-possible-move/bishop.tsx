import { getAllPossibleMoves } from '../possible-moves-utils'
import {getCorrectIds} from './possible-move-utils'

export const correctMovesOfBishop = (columnNumber: number, fieldNumber: number, color: string) => {
    const movesLeftBottom: Array<Array<number>> = [
        [ - 1,  - 1],
        [ - 2,  - 2],
        [ - 3,  - 3],
        [ - 4,  - 4],
        [ - 5,  - 5],
        [ - 6,  - 6],
        [ - 7,  - 7]]
    const movesRightBottom: Array<Array<number>> = [
        [  1,  - 1],
        [  2,  - 2],
        [  3,  - 3],
        [  4,  - 4],
        [  5,  - 5],
        [  6,  - 6],
        [  7,  - 7]]
    const movesLeftTop: Array<Array<number>> = [
        [ - 1,   1],
        [ - 2,   2],
        [ - 3,   3],
        [ - 4,   4],
        [ - 5,   5],
        [ - 6,   6],
        [ - 7,   7]]
    const movesRightTop: Array<Array<number>> = [
        [  1,   1],
        [  2,   2],
        [  3,   3],
        [  4,   4],
        [  5,   5],
        [  6,   6],
        [  7,   7],
    ]

    const getCorrectFieldsIdLeftTop = getAllPossibleMoves(movesLeftTop, columnNumber, fieldNumber)
    const getCorrectFieldsIdRightBottom = getAllPossibleMoves(movesRightBottom, columnNumber, fieldNumber)
    const getCorrectFieldsIdLeftBottom = getAllPossibleMoves(movesLeftBottom, columnNumber, fieldNumber)
    const getCorrectFieldsIdRightTop = getAllPossibleMoves(movesRightTop, columnNumber, fieldNumber)

    const leftTopSide = getCorrectIds(getCorrectFieldsIdLeftTop, color)
    const rightTopSide = getCorrectIds(getCorrectFieldsIdRightTop, color)
    const leftBottomSide = getCorrectIds(getCorrectFieldsIdLeftBottom, color)
    const rightBottomSide = getCorrectIds(getCorrectFieldsIdRightBottom, color)

    return [...leftTopSide,...rightTopSide,...leftBottomSide,...rightBottomSide].filter(id => id !== 'last')
}