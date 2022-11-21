import {Figure} from '../../types'
import {findOneGreaterId} from './en-passant-add-correct-move'
import {
    getItemFromLocalStorage,
    setArrayToLocalStorage, setSpecialMoveToLocalStorage
} from '../data-base'
import {addMoveToHistory} from '../history'

export const enPassantMakeMove = (color:string, id: string, idBefore: string) => {
    let plusOrMinusOne: number = -1
    let gameArrangement: Array<Figure> = getItemFromLocalStorage()

    setSpecialMoveToLocalStorage('e.p.')

    if (color === 'black'){
        plusOrMinusOne = 1
    }

    const newId: string = findOneGreaterId(id,plusOrMinusOne)

    gameArrangement = gameArrangement.filter(chess => chess.id !== newId)

    const deletedPawnByEP = document.getElementById(newId)!

    deletedPawnByEP.className = ''
    deletedPawnByEP.classList.add('figure')
    deletedPawnByEP.classList.add('figure__empty')
    setArrayToLocalStorage(gameArrangement)
    addMoveToHistory('EnPassant',id,newId,idBefore)

}