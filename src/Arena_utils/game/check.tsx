import {checkPossibleMoves} from '../possible-moves-utils'
import {Figure} from '../../types'
import {getColorFromLocalStorage, getItemFromLocalStorage} from '../data-base'
import {setCheckToLocalStorage} from '../data-base/check'

export const kingCheck = () => {
    removeCheckKingToField()

    const localStorageChess: Array<Figure> = getItemFromLocalStorage()
    const uniqueCorrectMoves: Set<string> = getAllMoves()
    const whiteKing: Figure = localStorageChess.find(chess => chess.name === 'white-King')!
    const blackKing: Figure = localStorageChess.find(chess => chess.name === 'black-King')!
    let check: boolean = true

    if (uniqueCorrectMoves.has(whiteKing.id)) {
        setCheckToLocalStorage(check)
        addCheckKingToField(whiteKing.id)
    } else if (uniqueCorrectMoves.has(blackKing.id)) {
        setCheckToLocalStorage(check)
        addCheckKingToField(blackKing.id)
    } else {
        check = false
        setCheckToLocalStorage(check)
    }

    return Array.from(uniqueCorrectMoves)
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

export const getAllMoves = () => {
    let figureArray: Array<Figure> = getItemFromLocalStorage()
    const color: string = getColorFromLocalStorage()

    const allPossibleMovesOfAllFigure = figureArray.map(chess => {
        const figureColor: string = chess.name.split('-')[0]

        if (figureColor !== color) {
            const figureName: string = chess.name.split('-')[1]
            const fieldAndColumnNumber: Array<number> = chess.position
            const [columnNumber, fieldNumber] = fieldAndColumnNumber

            const ids = checkPossibleMoves(figureName, columnNumber, fieldNumber, chess.color)

            if (ids) {
                return ids
            }
            return ''
        }
        return ''
    })

    const allMovesFlat: Array<string> = allPossibleMovesOfAllFigure.flat(1).filter(id => id !== '')

    return new Set(allMovesFlat)
}