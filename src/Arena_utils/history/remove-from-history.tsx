import { addMoveToHistory } from './add-to-history'
import {Figure} from '../../types'
import {
    getItemFromLocalStorage,
    setArrayToLocalStorage,
} from '../data-base'

export const removeKingAndAddCastleToHistory = (figureName: string, nameBefore: string, id: string, currentId: string) => {
    let allChessPositionArray: Array<Figure> = getItemFromLocalStorage()
    const kingInArray: Figure = allChessPositionArray.find(figure => figure.name === figureName)!

    allChessPositionArray = allChessPositionArray.filter(figure => figure !== kingInArray)
    kingInArray.id = id
    allChessPositionArray = allChessPositionArray.concat(kingInArray)
    setArrayToLocalStorage(allChessPositionArray)
    addMoveToHistory(figureName, nameBefore, id, currentId)
}