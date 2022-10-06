import {getHistoryFromLocalStorage, setHistoryOfMovesToLocalStorage} from '../data-base'
import {LastMove} from '../../types'

export const addMoveToHistory = (figureName: string, nameBefore: string, id: string, currentId: string) => {
    const move = document.querySelectorAll('.history__container')!
    let historyOfMoves: Array<LastMove> = []
    let localStorageHistory: Array<LastMove> = getHistoryFromLocalStorage()

    if (localStorageHistory) {
        historyOfMoves = historyOfMoves.concat(localStorageHistory)
    }

    if (figureName !== '') {
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
    }
    renderHistoryFromLocalStorage(historyOfMoves)

}

export const renderHistoryFromLocalStorage = (localStorageHistory: Array<LastMove>) => {
    if (localStorageHistory.length !== 0) {
        const historyNav = document.querySelector('.history__nav')!

        localStorageHistory.forEach((move, index) => {
            if (move.currentName.includes('white')) {
                const buttonsContainer = document.createElement('div')

                buttonsContainer.classList.add('history__container')
                historyNav.appendChild(buttonsContainer)

                const numberOfMove = document.createElement('button')

                numberOfMove.classList.add('history__number')
                buttonsContainer.appendChild(numberOfMove)
                numberOfMove.innerHTML = `#${(index / 2) + 1}`

                const moveWhite = document.createElement('div')

                moveWhite.classList.add('history__button')
                moveWhite.innerHTML = `${move.currentId} `
                buttonsContainer.appendChild(moveWhite)
            }

            if (!move.currentName.includes('white')) {
                const buttonsContainer = document.getElementsByClassName('history__container')
                const moveBlack = document.createElement('div')
                const size = buttonsContainer.length - 1

                moveBlack.classList.add('history__button')
                moveBlack.innerHTML = `${move.currentId} `
                buttonsContainer[size].appendChild(moveBlack)
            }
        })
    }
}