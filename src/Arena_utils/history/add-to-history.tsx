import {getHistoryFromLocalStorage, setHistoryOfMovesToLocalStorage} from '../data-base'
import {LastMove} from '../../types'

export const addMoveToHistory = (figureName: string, nameBefore: string, id: string, currentId: string) => {
    const historyNav = document.querySelectorAll('.history__nav--column')!
    const move = document.querySelectorAll('.history__button')!
    let historyOfMoves: Array<LastMove> = []
    const localStorageHistory: Array<LastMove> = getHistoryFromLocalStorage()

    if (localStorageHistory) {
        historyOfMoves = historyOfMoves.concat(localStorageHistory)
    }

    move.forEach(element => {
        element.remove()
    })

    historyOfMoves = historyOfMoves.concat({
        currentName: figureName,
        currentId: currentId,
        nameBefore: nameBefore,
        idBefore: id
    })
    setHistoryOfMovesToLocalStorage(historyOfMoves)

    historyOfMoves.forEach((move, index) => {
        const buttonHistory = document.createElement('button')

        buttonHistory.classList.add('history__button')
        buttonHistory.innerHTML = `${index + 1}. ${move.idBefore} ${move.currentId} `

        if (!(index % 2)){
            historyNav[0].appendChild(buttonHistory)
        } else {
            historyNav[1].appendChild(buttonHistory)
        }
    })
}