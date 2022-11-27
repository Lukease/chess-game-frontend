import { addMoveToHistory } from './add-to-history'
import {
    getItemFromLocalStorage,
    setArrayToLocalStorage,
} from '../data-base'
import {King, Piece} from '../chess-possible-move'

export const removeKingAndAddCastleToHistory = (figureName: string, nameBefore: string, id: string, currentId: string, color: string) => {
    let allChessPositionArray: Array<Piece> = getItemFromLocalStorage()
    const kingId: string = id.split('-')[1]
    const oldKingId: string = id.split('-')[0]
    const kingColumn: number = kingId.charAt(0).charCodeAt(0) - 64
    const kingField: number = parseInt(kingId.charAt(1))

    allChessPositionArray = allChessPositionArray.filter(figure => figure.id !== oldKingId)

    const newKing: Piece = new King(figureName.split('-')[0],kingId,[kingColumn,kingField] ,'King')

    allChessPositionArray = allChessPositionArray.concat(newKing)
    setArrayToLocalStorage(allChessPositionArray)
    addMoveToHistory(figureName, nameBefore, id, currentId, color)
}