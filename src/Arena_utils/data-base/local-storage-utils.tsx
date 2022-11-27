import {Piece} from '../chess-possible-move'

export const setArrayToLocalStorage = (chess: Array<Piece>) => {
    localStorage.setItem('chess', JSON.stringify(chess))
}

export const getItemFromLocalStorage = () => {

    return JSON.parse(localStorage.getItem('chess')!)
}

export const removeChessFromLocalStorage = (deletedFigureId: string) => {
    const localStorageChess: Array<Piece> = getItemFromLocalStorage()
    let gameArrangement: Array<Piece> = localStorageChess.filter(chess => chess.id !== deletedFigureId)

    setArrayToLocalStorage(gameArrangement)

    return gameArrangement
}

export const setCurrentColorToLocalStorage = (color: string) => {
    localStorage.setItem('color', JSON.stringify(color))
}

export const getColorFromLocalStorage = () => {

    return JSON.parse(localStorage.getItem('color')!)
}