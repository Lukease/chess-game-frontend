import {findOneGreaterId} from './en-passant-add-correct-move'
import {
    getItemFromLocalStorage,
    setArrayToLocalStorage, setSpecialMoveToLocalStorage
} from '../data-base'
import {addMoveToHistory} from '../history'
import {Piece} from '../chess-possible-move'

export const enPassantMakeMove = (color:string, id: string, idBefore: string) => {
    let plusOrMinusOne: number = -1
    let gameArrangement: Array<Piece> = getItemFromLocalStorage()

    setSpecialMoveToLocalStorage('e.p.')

    if (color === 'black'){
        plusOrMinusOne = 1
    }

    const newId: string = findOneGreaterId(id,plusOrMinusOne)

    const boardColumn = newId.charAt(0)
    const rowNumber = newId.charAt(0)
    gameArrangement = gameArrangement.filter(chess => chess.coordinate.boardColumn !== boardColumn && chess.coordinate.boardRow !== rowNumber)

    const deletedPawnByEP = document.getElementById(newId)!

    deletedPawnByEP.className = ''
    deletedPawnByEP.classList.add('figure')
    deletedPawnByEP.classList.add('figure__empty')
    setArrayToLocalStorage(gameArrangement)
    addMoveToHistory(`${color}-Pawn`,newId,idBefore,id, color)
}