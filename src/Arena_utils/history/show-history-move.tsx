import {getHistoryFromLocalStorage} from '../data-base'
import {LastMove} from '../../types'

const showChosenFieldHistory = (move: LastMove) => {
    const currentId: string = move.currentId
    const idBefore: string = move.idBefore
    const specialMoves: string = move.specialMove

    if (specialMoves === 'OO' || specialMoves === 'OOO') {
        const currentRookId: string = move.currentId.split('-')[1]
        const currentKingId: string = move.idBefore.split('-')[1]

        addFieldChosen(currentRookId, currentKingId)
    } else {
        addFieldChosen(currentId, idBefore)
    }
}

const showMoveOfFiguresBack = (historyOfMoves: Array<LastMove>) => {
    historyOfMoves.forEach((move) => {
        const currentId: string = move.currentId
        const idBefore: string = move.idBefore
        const color: string = move.nameBefore
        const specialMoves: string = move.specialMove
        const currentNumber: number = 0
        const oldNumber: number = 1

        if (specialMoves === 'OO' || specialMoves === 'OOO') {
            castleIds(move, currentNumber, oldNumber, color)
        }else {
            let moveTo: HTMLElement = document.getElementById(currentId)!

            moveTo.classList.remove(`figure__${move.currentName}`)
            moveTo.classList.add(`figure__${move.nameBefore}`)

            let moveFrom: HTMLElement = document.getElementById(idBefore)!

            moveFrom.classList.remove('figure__empty')
            moveFrom.classList.add(`figure__${move.currentName}`)
        }
    })
}

const backToCurrentPosition = (historyOfMoves: Array<LastMove>) => {
    historyOfMoves.forEach((move) => {
        const specialMove: string = move.specialMove
        const color: string = move.nameBefore
        const currentNumber: number = 1
        const oldNumber: number = 0

        if (specialMove === 'OO' || specialMove === 'OOO') {
            castleIds(move, currentNumber, oldNumber, color)

        } else {
            let moveTo: HTMLElement = document.getElementById(move.currentId)!

            moveTo.className = ''
            moveTo.classList.add(`figure`)
            moveTo.classList.add(`figure__${move.currentName}`)

            let moveFrom: HTMLElement = document.getElementById(move.idBefore)!

            addEmptyClassMoveFrom(moveFrom)
        }
    })
}

export const showHistoryMove = (listenerElement: HTMLDivElement) => {
    const history: Array<LastMove> = getHistoryFromLocalStorage()

    listenerElement.addEventListener('click', () => {
            const elementId: number = parseInt(listenerElement.id.split('-')[1])
            const historyToClickedMove: Array<LastMove> = history.filter((move: LastMove) => move.idInArray < elementId + 1)
            const historyFromClickedMove: Array<LastMove> = history.filter((move: LastMove) => move.idInArray > elementId)
            const historyFromClickedMoveReverse: Array<LastMove> = historyFromClickedMove.reverse()
            const fieldChosen: NodeListOf<Element> = document.querySelectorAll('.field__chosen')

            backToCurrentPosition(history)

            fieldChosen.forEach(field => {
                field.classList.remove('field__chosen')
            })

            historyToClickedMove.forEach((move, index) => {
                if (index === (historyToClickedMove.length - 1)) {
                    showChosenFieldHistory(move)
                }
            })

            showMoveOfFiguresBack(historyFromClickedMoveReverse)
        }
    )
}

const castleBackToCurrent = (currentRookId: string, currentKingId: string, oldRookId: string, oldKingId: string, color: string, king: string, rook: string) => {
    let moveRookTo: HTMLElement = document.getElementById(currentRookId)!

    addClassMoveTo(moveRookTo, rook)

    let moveRookFrom: HTMLElement = document.getElementById(oldRookId)!

    addEmptyClassMoveFrom(moveRookFrom)

    let moveKingTo: HTMLElement = document.getElementById(currentKingId)!

    addClassMoveTo(moveKingTo, king)

    let moveKingFrom: HTMLElement = document.getElementById(oldKingId)!

    addEmptyClassMoveFrom(moveKingFrom)
}


const addEmptyClassMoveFrom = (moveFrom: Element) => {
    moveFrom.className = ''
    moveFrom.classList.add(`figure`)
    moveFrom.classList.add(`figure__empty`)
}

const addClassMoveTo = (moveTo: Element, currentFigure: string) => {
    moveTo.className = ''
    moveTo.classList.add(`figure`)
    moveTo.classList.add(`figure__${currentFigure}`)
}

const addFieldChosen = (currentId: string, idBefore: string) => {
    let moveTo: HTMLElement = document.getElementById(currentId)!.parentElement!
    let moveFrom: HTMLElement = document.getElementById(idBefore)!.parentElement!

    moveTo.classList.add('field__chosen')
    moveFrom.classList.add('field__chosen')
}

const castleIds = (move: LastMove, currentNumber: number, oldNumber: number, color: string) => {
    const currentRookId: string = move.currentId.split('-')[currentNumber]
    const currentKingId: string = move.idBefore.split('-')[currentNumber]
    const oldKingId: string = move.idBefore.split('-')[oldNumber]
    const oldRookId: string = move.currentId.split('-')[oldNumber]

    castleBackToCurrent(currentRookId, currentKingId, oldRookId, oldKingId, color, move.currentName, move.nameBefore)
}