import {
    getHistoryFromLocalStorage, getSpecialMoveFromLocalStorage,
    setHistoryOfMovesToLocalStorage
} from '../data-base'
import {
    LastMove
} from '../../types'
import {showHistoryMove} from './show-history-move'
import {
    iconType,
    isTake
}
    from './move-type'
import {getCheckFromLocalStorage} from '../data-base/check'
import {MoveType} from '../../types'

export const addMoveToHistory = (figureName: string, nameBefore: string, id: string, currentId: string, color: string) => {
    const move = document.querySelectorAll('.history__container')!
    let historyOfMoves: Array<LastMove> = []
    let localStorageHistory: Array<LastMove> = getHistoryFromLocalStorage()
    const check: boolean = getCheckFromLocalStorage()
    const specialMove: string = getSpecialMoveFromLocalStorage()

    if (localStorageHistory) {
        historyOfMoves = historyOfMoves.concat(localStorageHistory)
    }

    if (figureName !== '') {
        move.forEach(element => {
            element.remove()
        })

        historyOfMoves = historyOfMoves.concat(createNewHistoryMove(figureName, currentId, nameBefore, id, historyOfMoves.length, check, specialMove, color))
        setHistoryOfMovesToLocalStorage(historyOfMoves)
    }
    renderHistoryFromLocalStorage(historyOfMoves)

}

export const renderHistoryFromLocalStorage = (localStorageHistory: Array<LastMove>) => {
    if (localStorageHistory.length !== 0) {
        const historyNav: Element = document.querySelector('.history__nav')!

        localStorageHistory.forEach((move, index) => {
            const figureColor: string = move.color
            const currentId: string = move.currentId
            const iconHistoryType: string = iconType(move)
            const take: string = isTake(move).toLowerCase()
            const specialMove: string = move.specialMove

            const moveType: MoveType = {
                iconType: iconHistoryType,
                isCheck: move.isCheck,
                isTake: take
            }

            if (figureColor.includes('white')) {
                whiteFigure(historyNav, index, currentId, moveType,specialMove)
            } else {
                blackFigure(currentId, index, moveType,specialMove)
            }
        })
    }
}

const whiteFigure = (historyNav: Element, index: number, currentId: string, moveType: MoveType, specialMove: string) => {
    const buttonsContainer = document.createElement('div')

    buttonsContainer.classList.add('history__container')
    historyNav.appendChild(buttonsContainer)

    const numberOfMove = document.createElement('button')

    numberOfMove.classList.add('history__number')
    buttonsContainer.appendChild(numberOfMove)
    numberOfMove.innerHTML = `#${(index / 2) + 1}`

    const moveWhite = document.createElement('div')

    createContainerHistory(moveWhite, currentId, index, moveType, specialMove)
    buttonsContainer.appendChild(moveWhite)
}

const blackFigure = (currentId: string, index: number, moveType: MoveType, specialMove: string) => {
    const buttonsContainer: HTMLCollectionOf<Element> = document.getElementsByClassName('history__container')
    const moveBlack: HTMLDivElement = document.createElement('div')
    const size: number = buttonsContainer.length - 1

    createContainerHistory(moveBlack, currentId, index, moveType, specialMove)
    buttonsContainer[size].appendChild(moveBlack)
}

const createContainerHistory = (container: HTMLDivElement, currentId: string, index: number, moveType: MoveType, specialMove: string) => {
    container.classList.add('history__button')
    if (specialMove !== ''){
        container.innerHTML = `${specialMove}`
    } else {
        container.innerHTML = `${moveType.iconType}${moveType.isTake}${currentId.toLowerCase()}${moveType.isCheck ? '+' : ''} `
    }
    container.id = `his-${index}`
    showHistoryMove(container)
}

const createNewHistoryMove = (figureName: string, currentId: string, nameBefore: string, id: string, arrayLength: number, check: boolean, specialMove: string, figureColor: string) => {
    return ({
        currentName: figureName,
        currentId: currentId,
        nameBefore: nameBefore,
        idBefore: id,
        idInArray: arrayLength,
        isCheck: check,
        specialMove: specialMove,
        color: figureColor
    })
}