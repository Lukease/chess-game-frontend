import {
    getColorFromLocalStorage,
    removeChessFromLocalStorage,
    setArrayToLocalStorage, setSpecialMoveToLocalStorage
} from '../data-base'
import {Figure} from '../../types'
import {removeKingAndAddCastleToHistory} from '../history'


export const castleKing = (currentFieldId: string) => {
    const color: string = getColorFromLocalStorage()
    const king: string = 'King'
    const rook: string= 'Rook'
    let oldKingId: string = 'D8'

    if (color === 'black') {
        if (currentFieldId === 'B8') {
            const oldRookId: string = 'A8'
            const newRookId: string = 'C8'

            removeAndAddRookCastled(oldRookId, newRookId, color, 3, 8)
            changeRookPosition(oldRookId, newRookId , color)
            setSpecialMoveToLocalStorage('OO')
            removeKingAndAddCastleToHistory(`${color}-${king}`,`${color}-${rook}`, `${oldKingId}-${currentFieldId}`, `${oldRookId}-${newRookId}`)
        }

        if (currentFieldId === 'F8') {
            const oldRookId: string = 'H8'
            const newRookId: string = 'E8'

            removeAndAddRookCastled(oldRookId, newRookId, color, 5, 8)
            changeRookPosition(oldRookId, newRookId , color)
            setSpecialMoveToLocalStorage('OOO')
            removeKingAndAddCastleToHistory(`${color}-${king}`,`${color}-${rook}`, `${oldKingId}-${currentFieldId}`, `${oldRookId}-${newRookId}`)
        }
    }

    if (color === 'white') {
        oldKingId = 'D1'

        if (currentFieldId === 'B1') {
            const oldRookId: string = 'A1'
            const newRookId: string = 'C1'

            removeAndAddRookCastled(oldRookId, newRookId, color, 3, 1)
            changeRookPosition(oldRookId, newRookId , color)
            setSpecialMoveToLocalStorage('OO')
            removeKingAndAddCastleToHistory(`${color}-${king}`,`${color}-${rook}`, `${oldKingId}-${currentFieldId}`, `${oldRookId}-${newRookId}`)
        }

        if (currentFieldId === 'F1') {
            const oldRookId: string = 'H1'
            const newRookId: string = 'E1'

            removeAndAddRookCastled(oldRookId, newRookId, color, 5, 1)
            changeRookPosition(oldRookId, newRookId , color)
            setSpecialMoveToLocalStorage('OOO')
            removeKingAndAddCastleToHistory(`${color}-${king}`,`${color}-${rook}`, `${oldKingId}-${currentFieldId}`, `${oldRookId}-${newRookId}`)
        }
    }
}

const removeAndAddRookCastled = (deleteId: string, newId: string, color: string, columnNumber: number, fieldNumber: number) => {
    let newChessArray:Array<Figure> = removeChessFromLocalStorage(deleteId)

    const newRook: Figure = {
        id: newId,
        name: `${color}-Rook`,
        position: [columnNumber, fieldNumber],
        color: color
    }

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