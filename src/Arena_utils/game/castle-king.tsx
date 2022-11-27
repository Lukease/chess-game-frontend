import {
    getColorFromLocalStorage,
    removeChessFromLocalStorage,
    setArrayToLocalStorage, setSpecialMoveToLocalStorage
} from '../data-base'
import {removeKingAndAddCastleToHistory} from '../history'
import {Piece, Rook} from '../chess-possible-move'


export const castleKing = (currentFieldId: string) => {
    const color: string = getColorFromLocalStorage()
    const king: string = 'King'
    const rook: string = 'Rook'
    let oldKingId: string = 'E8'
    let specialMove: string = 'OO'
    let columnNumber: number = 3
    let fieldNumber: number = 8
    let oldRookId: string = 'A8'
    let newRookId: string = 'D8'

    if (color === 'black') {
        if (currentFieldId === 'C8') {
            oldRookId = 'A8'
            newRookId = 'D8'
            specialMove = 'OOO'
            columnNumber = 4
            fieldNumber = 8
        }

        if (currentFieldId === 'G8') {
            oldRookId = 'H8'
            newRookId = 'F8'
            specialMove = 'OO'
            columnNumber = 6
            fieldNumber = 8
        }
    }

    if (color === 'white') {
        oldKingId = 'E1'

        if (currentFieldId === 'C1') {
            oldRookId = 'A1'
            newRookId = 'D1'
            specialMove = 'OOO'
            columnNumber = 4
            fieldNumber = 1
        }

        if (currentFieldId === 'G1') {
            oldRookId = 'H1'
            newRookId = 'F1'
            specialMove = 'OO'
            columnNumber = 6
            fieldNumber = 1
        }
    }

    if (currentFieldId === 'C8'|| currentFieldId === 'G8'||currentFieldId === 'C1'||currentFieldId === 'G1') {
        removeAndAddRookCastled(oldRookId, newRookId, color, columnNumber, fieldNumber)
        changeRookPosition(oldRookId, newRookId, color)
        setSpecialMoveToLocalStorage(specialMove)
        removeKingAndAddCastleToHistory(`${color}-${king}`, `${color}-${rook}`, `${oldKingId}-${currentFieldId}`, `${oldRookId}-${newRookId}`, color)
    }
}

const removeAndAddRookCastled = (deleteId: string, newId: string, color: string, columnNumber: number, fieldNumber: number) => {
    let newChessArray: Array<Piece> = removeChessFromLocalStorage(deleteId)

    const newRook: Piece = new Rook(color,newId,[columnNumber, fieldNumber],'Rook')

    newChessArray = newChessArray.concat(newRook)
    setArrayToLocalStorage(newChessArray)
}

const changeRookPosition = (oldRookId: string, newRookId: string, color: string) => {
    const oldRookPosition: HTMLElement = document.getElementById(oldRookId)!

    oldRookPosition.classList.remove(`figure__${color}-Rook`)
    oldRookPosition.classList.add(`figure__empty`)

    const newRookPosition: HTMLElement = document.getElementById(newRookId)!

    newRookPosition.classList.remove(`figure__empty`)
    newRookPosition.classList.add(`figure__${color}-Rook`)
}