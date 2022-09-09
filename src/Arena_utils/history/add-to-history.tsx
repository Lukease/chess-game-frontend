import {getHistoryFromLocalStorage, setHistoryOfMovesToLocalStorage} from '../data-base'
import {LastMove} from '../../types'

export const addMoveToHistory = (figureName: string, nameBefore: string, id: string, currentId: string) => {
    const historyNav = document.querySelector('.history__nav')!
    const move = document.querySelectorAll('.history__container')!
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
        const buttonsContainer = document.createElement('div')

        buttonsContainer.classList.add('history__container')
        historyNav.appendChild(buttonsContainer)

        const numberOfMove = document.createElement('button')

        numberOfMove.classList.add('history__number')
        buttonsContainer.appendChild(numberOfMove)
        numberOfMove.innerHTML = `#${index + 1}`

        const moveBefore = document.createElement('div')

        moveBefore.classList.add('history__button')
        moveBefore.innerHTML = `${move.idBefore} `
        buttonsContainer.appendChild(moveBefore)

        const moveAfter = document.createElement('div')

        moveAfter.classList.add('history__button')
        moveAfter.innerHTML = `${move.currentId} `
        buttonsContainer.appendChild(moveAfter)
    })
}