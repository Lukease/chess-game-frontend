import {checkPossibleMoves} from '../possible-moves-utils'
import {Figure, IsCheck} from '../../types'
import { getItemFromLocalStorage} from '../data-base'
import {setCheckToLocalStorage} from '../data-base/check'

export const kingCheck = () => {
    removeCheckKingToField()

    let localStorageChess: Array<Figure> = getItemFromLocalStorage()
    const uniqueCorrectMoves = getAllMoves(localStorageChess)
    const whiteKing: Figure = localStorageChess.find(chess => chess.name === 'white-King')!
    const blackKing: Figure = localStorageChess.find(chess => chess.name === 'black-King')!

    if (uniqueCorrectMoves.has(whiteKing.id)) {
        const check: IsCheck = {check: true}

        setCheckToLocalStorage(check)
        addCheckKingToField(whiteKing.id)
    } else if (uniqueCorrectMoves.has(blackKing.id)) {
        const check: IsCheck = {check: true}

        setCheckToLocalStorage(check)
        addCheckKingToField(blackKing.id)
    } else {
        const check: IsCheck = {check: false}

        setCheckToLocalStorage(check)
    }
}

const addCheckKingToField = (id: string) => {
    const kingField = document.getElementById(id)!.parentElement!

    kingField.classList.add('field__check')
}

const removeCheckKingToField = () => {
    const checkClass = document.querySelectorAll('.field__check')!

    checkClass.forEach(check => {
        check.classList.remove('field__check')
    })
}

const getAllMoves = (figureArray: Array<Figure>) => {
    const allPossibleMovesOfAllFigure = figureArray.map(chess => {
        const figureName: string = chess.name.split('-')[1]
        const fieldAndColumnNumber: Array<number> = chess.position
        const [columnNumber, fieldNumber] = fieldAndColumnNumber

        return checkPossibleMoves(figureName, columnNumber, fieldNumber, chess.color)
    })

    const allMovesFlat = allPossibleMovesOfAllFigure.flat(1)


    return new Set(allMovesFlat)
}