export const setCorrectMovesOfOpponentToLocalStorage = (arrayOfOpponentMoves: Array<string>) => {
    localStorage.setItem('opponent Moves', JSON.stringify(arrayOfOpponentMoves))
}

export const getCorrectMovesOfOpponentFromLocalStorage = () => {

    return JSON.parse(localStorage.getItem('opponent Moves')!)
}