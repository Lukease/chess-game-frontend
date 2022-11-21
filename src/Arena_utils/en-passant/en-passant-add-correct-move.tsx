import {getHistoryFromLocalStorage} from '../data-base'
import {LastMove} from '../../types'

export const enPassantAddCorrectMove = (figureName: string, currentId: string, color: string) => {
    const arrayOfMoves: Array<LastMove> = getHistoryFromLocalStorage()
    if (figureName === 'Pawn' && arrayOfMoves) {
        const enPassantWhiteConditions: boolean = currentId.includes('5') && color === 'white'
        const enPassantBlackConditions: boolean = currentId.includes('4') && color === 'black'
        let moveFrom: number = 2
        let moveTo: number = 4
        let plusOrMinusOne: number = 1

        if (color === 'white') {
            moveFrom = 7
            moveTo = 5
            plusOrMinusOne = -1
        }

        if (enPassantWhiteConditions || enPassantBlackConditions) {
            const arraySize: number = arrayOfMoves.length
            const lastMove: LastMove = arrayOfMoves.find(move => move.idInArray === arraySize - 1)!
            const correctLastMoveIds = findIdSmallerAndLarger(currentId, moveFrom, moveTo, lastMove)

            if (correctLastMoveIds) {
                const id: string = findOneGreaterId(correctLastMoveIds, plusOrMinusOne)

                document.getElementById(id)!.classList.add('field__e-p')

                return id
            }
        }
    }
}

const findIdSmallerAndLarger = (currentId: string, moveFrom: number, moveTo: number, lastMoveArray: LastMove) => {
    const findRightLetter = String.fromCharCode(96 + (currentId.charAt(0).charCodeAt(0) - 63)).toUpperCase()
    const findLeftLetter = String.fromCharCode(96 + (currentId.charAt(0).charCodeAt(0) - 65)).toUpperCase()
    const rightFrom = `${findRightLetter}${moveFrom}`
    const rightTo = `${findRightLetter}${moveTo}`
    const leftFrom = `${findLeftLetter}${moveFrom}`
    const leftTo = `${findLeftLetter}${moveTo}`
    const leftCondition: boolean = lastMoveArray.idBefore === leftFrom && lastMoveArray.currentId === leftTo
    const rightCondition: boolean = lastMoveArray.idBefore === rightFrom && lastMoveArray.currentId === rightTo

    if (leftCondition) {
        return leftFrom
    }
    if (rightCondition) {
        return rightFrom
    }
}

export const findOneGreaterId = (correctLastMoveIds:string, plusOrMinusOne: number) => {
    const column: string = correctLastMoveIds.charAt(0)
    const number: number = parseInt(correctLastMoveIds.charAt(1))
    const fieldNumber: number = number + plusOrMinusOne
    const id: string = `${column}${fieldNumber}`

    return  id
}