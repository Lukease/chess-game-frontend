import {
    getHistoryFromLocalStorage,
    setHistoryOfMovesToLocalStorage
} from '../data-base'
import {
    IsCheck,
    LastMove
} from '../../types'
import { showHistoryMove } from './show-history-move'
import {
    iconType,
    isTake
}
    from './move-type'
import { getCheckFromLocalStorage } from '../data-base/check'
import { MoveType } from '../../types'

export const addMoveToHistory = (figureName: string, nameBefore: string, id: string, currentId: string) => {
    const move = document.querySelectorAll('.history__container')!
    let historyOfMoves: Array<LastMove> = []
    let localStorageHistory: Array<LastMove> = getHistoryFromLocalStorage()
    const check: IsCheck = getCheckFromLocalStorage()

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
            idBefore: id,
            idInArray: historyOfMoves.length,
            isCheck: check
        })

        setHistoryOfMovesToLocalStorage(historyOfMoves)
    }
    renderHistoryFromLocalStorage(historyOfMoves)

}

export const renderHistoryFromLocalStorage = (localStorageHistory: Array<LastMove>) => {
    if (localStorageHistory.length !== 0) {
        const historyNav: Element = document.querySelector('.history__nav')!

        localStorageHistory.forEach((move, index) => {
            const color: string = move.nameBefore
            const nameOfFigure: string = move.currentName
            const currentId: string = move.currentId
            const iconHistoryType: string = iconType(move)
            const take: string = isTake(move).toLowerCase()

            const moveType: MoveType = {
                iconType: iconHistoryType,
                isCheck: move.isCheck,
                isTake: take
            }

            if (nameOfFigure === 'OO') {
                if (color === 'white') {
                    whiteFigure(historyNav, index, nameOfFigure, moveType)
                }
                if (color === 'black') {
                    blackFigure(nameOfFigure, index, moveType)
                }
            } else if (nameOfFigure === 'OOO') {
                if (color === 'white') {
                    whiteFigure(historyNav, index, nameOfFigure, moveType)
                }
                if (color === 'black') {
                    blackFigure(nameOfFigure, index, moveType)
                }
            } else if (nameOfFigure.includes('white')) {
                whiteFigure(historyNav, index, currentId, moveType)
            } else if (!nameOfFigure.includes('white')) {
                blackFigure(currentId, index, moveType)
            }
        })
    }
}

const whiteFigure = (historyNav: Element, index: number, currentId: string, moveType: MoveType) => {
    const buttonsContainer = document.createElement('div')

    buttonsContainer.classList.add('history__container')
    historyNav.appendChild(buttonsContainer)

    const numberOfMove = document.createElement('button')

    numberOfMove.classList.add('history__number')
    buttonsContainer.appendChild(numberOfMove)
    numberOfMove.innerHTML = `#${(index / 2) + 1}`

    const moveWhite = document.createElement('div')

    createContainerHistory(moveWhite, currentId, index, moveType)
    buttonsContainer.appendChild(moveWhite)
}

const blackFigure = (currentId: string, index: number, moveType: MoveType) => {
    const buttonsContainer: HTMLCollectionOf<Element> = document.getElementsByClassName('history__container')
    const moveBlack: HTMLDivElement = document.createElement('div')
    const size: number = buttonsContainer.length - 1

    createContainerHistory(moveBlack, currentId, index, moveType)
    buttonsContainer[size].appendChild(moveBlack)
}

const createContainerHistory = (container: HTMLDivElement, currentId: string, index: number, moveType: MoveType) => {
    container.classList.add('history__button')
    container.innerHTML = `${moveType.iconType}${moveType.isTake}${currentId.toLowerCase()}${moveType.isCheck.check ? '+' : ''} `
    container.id = `his-${index}`

    showHistoryMove(container)
}