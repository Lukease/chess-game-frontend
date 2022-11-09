import {
    getColorFromLocalStorage,
    removeChessFromLocalStorage,
    setArrayToLocalStorage
} from '../data-base'
import {Figure} from '../../types'
import {addMoveToHistory} from '../history/add-to-history'
import {removeKingAndAddCastleToHistory} from '../history/remove-from-history'


export const castleKing = (currentFieldId: string) => {
    const color: string = getColorFromLocalStorage()

    if (color === 'black') {
        if (currentFieldId === 'B8') {
            const oldRookId: string = 'A8'
            const newRookId: string = 'C8'

            removeAndAddRookCastled(oldRookId, newRookId, color, 3, 8)
            changeRookPosition(oldRookId, newRookId , color)
            removeKingAndAddCastleToHistory('OO',color, currentFieldId, '0')
        }

        if (currentFieldId === 'F8') {
            const oldRookId: string = 'H8'
            const newRookId: string = 'E8'

            removeAndAddRookCastled(oldRookId, newRookId, color, 5, 8)
            changeRookPosition(oldRookId, newRookId , color)
            removeKingAndAddCastleToHistory('OOO',color, '0', '0')
        }
    }

    if (color === 'white') {
        if (currentFieldId === 'B1') {
            const oldRookId: string = 'A1'
            const newRookId: string = 'C1'

            removeAndAddRookCastled(oldRookId, newRookId, color, 3, 1)
            changeRookPosition(oldRookId, newRookId , color)
            removeKingAndAddCastleToHistory('OO',color, currentFieldId, '0')
        }

        if (currentFieldId === 'F1') {
            const oldRookId: string = 'H1'
            const newRookId: string = 'E1'

            removeAndAddRookCastled(oldRookId, newRookId, color, 5, 1)
            changeRookPosition(oldRookId, newRookId , color)
            removeKingAndAddCastleToHistory('OOO',color, currentFieldId, '0')
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