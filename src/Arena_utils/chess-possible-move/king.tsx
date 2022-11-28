import {getAllPossibleMoves, getCorrectMoves} from '../possible-moves-utils'
import {
    getColorFromLocalStorage,
    getCorrectMovesOfOpponentFromLocalStorage,
    getHistoryFromLocalStorage,
    getItemFromLocalStorage
} from '../data-base'
import {Figure, LastMove} from '../../types'
import {getCheckFromLocalStorage} from '../data-base/check'
import {Move} from './move'
import {Piece} from './piece'
import {MovingStrategies} from "../suppliers/moving-strategy-service";

export class King extends Piece {
    constructor(color: string, id: string, position: Array<number>, name: string) {
        super(color, id, position, name,[MovingStrategies.kingMoving])
    }
    getAllPossibleMoves(): Move[] {
        let king: Move = new Move(false, 'A1')
        return [king]
    }

    getImageUrl(): string {
        return `${this.color}-King`
    }
}

export const correctMovesOfKing = (columnNumber: number, fieldNumber: number, color: string) => {
    let smallCastleId: string = ''
    let bigCastleId: string = ''
    const isCheck: boolean = getCheckFromLocalStorage()
    const whoseTurn: string = getColorFromLocalStorage()
    const opponentMovesIds: Array<string> = getCorrectMovesOfOpponentFromLocalStorage()
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
        smallCastleId = smallCastle(whoseTurn, opponentMovesIds)
        bigCastleId = bigCastle(whoseTurn, opponentMovesIds)
    }

    const getCorrectFieldsId = getAllPossibleMoves(moves, columnNumber, fieldNumber)
    const correctIds: Array<string> = getCorrectMoves(getCorrectFieldsId, color)
    const correctIdsAndCastle: Array<string> = [...correctIds, smallCastleId, bigCastleId].filter(id => id !== '')

    return checkTheSameIds(correctIdsAndCastle, opponentMovesIds)
}

const smallCastle = (color: string, opponentMovesIds: Array<string>) => {
    const history: Array<LastMove> = getHistoryFromLocalStorage()
    const chessArrangement: Array<Figure> = getItemFromLocalStorage()
    let rookId: string = 'H1'
    let bishopId: string = 'F1'
    let knightId: string = 'G1'
    let fieldNumber: string = '1'

        if (color === 'black') {
            rookId = 'H8'
            bishopId = 'F8'
            knightId = 'G8'
            fieldNumber = '8'
        }

    // if (opponentMovesIds.indexOf(knightId) !== -1) {
        const correctPositions = checkCorrectPositionsForCastle(history, chessArrangement, color, rookId, bishopId, knightId)

        if (!correctPositions.find(isFalse => isFalse !== undefined)) {
            return `G${fieldNumber}`
        }
        return ''
    // }
    // return ''
}

const bigCastle = (color: string, opponentMovesIds: Array<string>) => {
    const history: Array<LastMove> = getHistoryFromLocalStorage()
    const chessArrangement: Array<Figure> = getItemFromLocalStorage()
    let rookId: string = 'A1'
    let queenId: string = 'D1'
    let bishopId: string = 'C1'
    let knightId: string = 'B1'
    let fieldNumber: string = '1'

    if (color === 'black') {
        rookId = 'A8'
        queenId = 'D8'
        bishopId = 'C8'
        knightId = 'B8'
        fieldNumber = '8'
    }

    // if (opponentMovesIds.indexOf(bishopId) !== -1 && opponentMovesIds.indexOf(knightId) !== -1) {
        const correctPositions = checkCorrectPositionsForCastle(history, chessArrangement, color, rookId, bishopId, knightId)
        const queen = chessArrangement.find(chess => chess.id === queenId)

        if (!correctPositions.find(isFalse => isFalse !== undefined) && !queen) {
            return `C${fieldNumber}`
        }
        return ''
    // }
    // return ''
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

const checkTheSameIds = (arrayOfKingMoves: Array<string>, opponentMoves: Array<string>) => {
    return arrayOfKingMoves.reduce((acc, item) => {

        if (opponentMoves.indexOf(item) !== -1) {
            return [...acc]
        } else {
            return [...acc, item]
        }

    }, [] as string[])
}
