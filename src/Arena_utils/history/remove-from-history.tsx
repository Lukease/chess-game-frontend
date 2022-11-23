import { addMoveToHistory } from './add-to-history'
import {Figure} from '../../types'
import {
    getItemFromLocalStorage,
    setArrayToLocalStorage,
} from '../data-base'

export const removeKingAndAddCastleToHistory = (figureName: string, nameBefore: string, id: string, currentId: string) => {
    let allChessPositionArray: Array<Figure> = getItemFromLocalStorage()
    const kingId: string = id.split('-')[1]
    const oldKingId: string = id.split('-')[0]
    const kingColumn: number = kingId.charAt(0).charCodeAt(0) - 64
    const kingField: number = parseInt(kingId.charAt(1))

    allChessPositionArray = allChessPositionArray.filter(figure => figure.id !== oldKingId)

    const newKingPosition: Figure = {
        id: kingId,
        name: figureName,
        position: [kingColumn,kingField],
        color: figureName.split('-')[0]
    }

    allChessPositionArray = allChessPositionArray.concat(newKingPosition)
    setArrayToLocalStorage(allChessPositionArray)
    addMoveToHistory(figureName, nameBefore, id, currentId)
}