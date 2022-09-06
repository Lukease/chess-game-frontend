import {getAllPossibleMoves, getCorrectMoves} from '../possible-moves-utils'

export const correctMovesOfRook = (columnNumber: number, fieldNumber: number, color: string) => {
    const moves: Array<Array<number>> = [
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [0, 5],
        [0, 6],
        [0, 7],
        [0, -7],
        [0, -6],
        [0, -5],
        [0, -4],
        [0, -3],
        [0, -2],
        [0, -1],
        [-1, 0],
        [-2, 0],
        [-3, 0],
        [-4, 0],
        [-5, 0],
        [-6, 0],
        [-7, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
        [5, 0],
        [6, 0],
        [7, 0],
    ]

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

    console.log(getCorrectFieldsIdTop)
    console.log(getCorrectFieldsIdLeft)
    console.log(getCorrectFieldsIdRight)
    console.log(getCorrectFieldsIdBottom)

    const bottom = getCorrectFieldsIdLeft.reduce((acc, item, index) => {

        const field: HTMLElement = document.getElementById(item)!

        if(!field.className.includes(`figure__${color}`) ){

            return acc + index
        } return acc

    }, '')

    console.log(bottom)

    const getCorrectFieldsId = getAllPossibleMoves(moves, columnNumber, fieldNumber)

    return getCorrectMoves(getCorrectFieldsId, color)
}

