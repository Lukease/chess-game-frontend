import {Figure} from '../../types'

export const setArrayToLocalStorage = (chess: Array<Figure>) => {
    localStorage.setItem('chess', JSON.stringify(chess))
}

export const getItemFromLocalStorage = () => {

    return JSON.parse(localStorage.getItem('chess')!)
}

export const removeChessFromLocalStorage = (deletedFigureId: string) => {
    const localStorageChess: Array<Figure> = getItemFromLocalStorage()
    let gameArrangement: Array<Figure> = localStorageChess.filter(chess => chess.id !== deletedFigureId)

    setArrayToLocalStorage(gameArrangement)
}