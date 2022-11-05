import {getAllPossibleMoves, getCorrectMoves} from '../possible-moves-utils'
import { getCorrectIdsOfPawn} from './possible-move-utils'

export const correctMovesOfPawn = (columnNumber: number, fieldNumber: number, color: string) => {
    const moveOfBlackPawn: Array<number> = [0, -1]
    const moveOfWhitePawn: Array<number> = [0, 1]
    let moves: Array<Array<number>> = []
    let isFigureMove: Array<Array<number>> = []

    if (fieldNumber === 2 && color === 'white') {
        moves = moves.concat([
            moveOfWhitePawn,
            [0, 2]
        ])
    }

    if (fieldNumber === 7 && color === 'black') {
        moves = moves.concat([
            moveOfBlackPawn,
            [0, -2]
        ])
    }

    if (fieldNumber !== 2 && color === 'white') {
        moves = moves.concat([
            moveOfWhitePawn
        ])
    }

    if (fieldNumber !== 7 && color === 'black') {
        moves = moves.concat([
            moveOfBlackPawn
        ])
    }

    if (color === 'white') {
        isFigureMove = isFigureMove.concat([
            [1, 1],
            [-1, 1],
        ])
    }

    if (color === 'black') {
        isFigureMove = isFigureMove.concat([
            [-1, -1],
            [1, -1],
        ])
    }

    const getCorrectFieldsIdForwards = getAllPossibleMoves(moves, columnNumber, fieldNumber)
    const getCorrectFieldsIdLeftRight = getAllPossibleMoves(isFigureMove, columnNumber, fieldNumber)
    const correctIds = getCorrectIdsOfPawn(getCorrectFieldsIdForwards, color)
    const attackFigure = getCorrectFieldsIdLeftRight.map(id => {
        const field: HTMLElement = document.getElementById(id)!

        if (!field.className.includes(`figure__empty`)){
            return id
        }
            return 'last'
    })

   const correctMoves = [...correctIds, ...attackFigure].filter(id => id !== 'last')

    return getCorrectMoves(correctMoves, color)
}