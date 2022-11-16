import {getAllPossibleMoves, getCorrectMoves} from '../possible-moves-utils'
import {getColorFromLocalStorage, getHistoryFromLocalStorage, getItemFromLocalStorage} from '../data-base'
import {Figure, LastMove} from '../../types'
import {getCheckFromLocalStorage} from '../data-base/check'

export const correctMovesOfKing = (columnNumber: number, fieldNumber: number, color: string) => {
    let smallCastleId: string = ''
    let bigCastleId: string = ''
    const isCheck: boolean = getCheckFromLocalStorage().check
    const whoseTurn: string = getColorFromLocalStorage()

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

    if (!isCheck) {
        smallCastleId = smallCastle(whoseTurn)
        bigCastleId = bigCastle(whoseTurn)
    }

    const getCorrectFieldsId = getAllPossibleMoves(moves, columnNumber, fieldNumber)
    const correctIds: Array<string> = getCorrectMoves(getCorrectFieldsId, color)
    const correctIdsAndCastle: Array<string> = [...correctIds, smallCastleId, bigCastleId]
    // const opponentChess: Array<Figure> =

    return correctIdsAndCastle.filter(id => id !== '')
}

const smallCastle = (color: string) => {
    const history: Array<LastMove> = getHistoryFromLocalStorage()
    const chessArrangement: Array<Figure> = getItemFromLocalStorage()
    let rookId: string = 'A1'
    let bishopId: string = 'C1'
    let knightId: string = 'B1'
    let fieldNumber: string = '1'

    if (color === 'black') {
        rookId = 'A8'
        bishopId = 'C8'
        knightId = 'B8'
        fieldNumber = '8'
    }

    const correctPositions = checkCorrectPositionsForCastle(history, chessArrangement, color, rookId, bishopId, knightId)

    if (!correctPositions.find(isFalse => isFalse !== undefined)) {
        return `B${fieldNumber}`
    }
    return ''
}

const bigCastle = (color: string) => {
    const history: Array<LastMove> = getHistoryFromLocalStorage()
    const chessArrangement: Array<Figure> = getItemFromLocalStorage()
    let rookId: string = 'H1'
    let queenId: string = 'E1'
    let bishopId: string = 'F1'
    let knightId: string = 'G1'
    let fieldNumber: string = '1'

    if (color === 'black') {
        rookId = 'H8'
        queenId = 'E8'
        bishopId = 'F8'
        knightId = 'G8'
        fieldNumber = '8'
    }

    const correctPositions = checkCorrectPositionsForCastle(history, chessArrangement, color, rookId, bishopId, knightId)
    const queen = chessArrangement.find(chess => chess.id === queenId)

    if (!correctPositions.find(isFalse => isFalse !== undefined) && !queen) {
        return `F${fieldNumber}`
    }
    return ''
}

const checkCorrectPositionsForCastle = (history: Array<LastMove>, chessArrangement: Array<Figure>, color: string, rookId: string, bishopId: string, knightId: string) => {
    let kingMoved = undefined
    let rookMove = undefined

    if (history !== null) {
        kingMoved = history.find(move => move.currentName === `${color}-King`)
        rookMove = history.find(move => move.idBefore === rookId || move.currentId === rookId)
    }

    const bishop = chessArrangement.find(chess => chess.id === bishopId)
    const knight = chessArrangement.find(chess => chess.id === knightId)

    return [kingMoved, rookMove, bishop, knight]
}
