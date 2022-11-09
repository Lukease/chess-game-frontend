import {getHistoryFromLocalStorage} from '../data-base'
import {LastMove} from '../../types'

const showChosenFieldHistory = (move: LastMove) => {
    const currentId: string = move.currentId
    const idBefore: string = move.idBefore
    const castle: string = move.currentName
    const color: string = move.nameBefore
    if (castle === 'OO') {
        let currentRookId: string = 'D1'
        let currentKingId: string = 'A1'

        if (color === 'black') {
            currentRookId = 'D8'
            currentKingId = 'A8'
        }

        addFieldChosen(currentRookId, currentKingId)

    } else if (castle === 'OOO') {
        let currentRookId: string = 'D1'
        let currentKingId: string = 'H1'

        if (color === 'black') {
            currentRookId = 'D8'
            currentKingId = 'H8'
        }

        addFieldChosen(currentRookId, currentKingId)

    } else {
        addFieldChosen(currentId, idBefore)
    }
}

const showMoveOfFiguresBack = (historyOfMoves: Array<LastMove>) => {
    historyOfMoves.forEach((move) => {
        const currentId: string = move.currentId
        const idBefore: string = move.idBefore
        const castle: string = move.currentName
        const color: string = move.nameBefore

        if (castle === 'OO') {
            let currentRookId: string = 'A1'
            let currentKingId: string = 'D1'
            let oldKingId: string = 'B1'
            let oldRookId: string = 'C1'

            if (color === 'black') {
                currentRookId = 'A8'
                currentKingId = 'D8'
                oldKingId = 'B8'
                oldRookId = 'C8'
            }

            castleBackToCurrent(currentRookId, currentKingId, oldRookId, oldKingId, color)


        } else if (castle === 'OOO') {
            let currentRookId: string = 'H1'
            let currentKingId: string = 'D1'
            let oldKingId: string = 'F1'
            let oldRookId: string = 'E1'

            if (color === 'black') {
                currentRookId = 'H8'
                currentKingId = 'D8'
                oldKingId = 'F8'
                oldRookId = 'E8'
            }

            castleBackToCurrent(currentRookId, currentKingId, oldRookId, oldKingId, color)

        } else {
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
        const castle: string = move.currentName
        const color: string = move.nameBefore

        if (castle === 'OO') {
            if (color === 'white') {
                const currentRookId: string = 'C1'
                const currentKingId: string = 'B1'
                const oldKingId: string = 'D1'
                const oldRookId: string = 'A1'

                castleBackToCurrent(currentRookId, currentKingId, oldRookId, oldKingId, color)
            }
            if (color === 'black') {
                const currentRookId: string = 'C8'
                const currentKingId: string = 'B8'
                const oldKingId: string = 'D8'
                const oldRookId: string = 'A8'

                castleBackToCurrent(currentRookId, currentKingId, oldRookId, oldKingId, color)
            }
        } else if (castle === 'OOO') {
            if (color === 'white') {
                const currentRookId: string = 'E1'
                const currentKingId: string = 'F1'
                const oldKingId: string = 'D1'
                const oldRookId: string = 'H1'

                castleBackToCurrent(currentRookId, currentKingId, oldRookId, oldKingId, color)
            }
            if (color === 'black') {
                const currentRookId: string = 'E8'
                const currentKingId: string = 'F8'
                const oldKingId: string = 'D8'
                const oldRookId: string = 'H8'

                castleBackToCurrent(currentRookId, currentKingId, oldRookId, oldKingId, color)
            }
        } else {
            let moveTo: HTMLElement = document.getElementById(move.currentId)!

            moveTo.className = ''
            moveTo.classList.add(`figure`)
            moveTo.classList.add(`figure__${move.currentName}`)

            let moveFrom: HTMLElement = document.getElementById(move.idBefore)!

            moveFrom.className = ''
            moveFrom.classList.add(`figure`)
            moveFrom.classList.add(`figure__empty`)
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

const castleBackToCurrent = (currentRookId: string, currentKingId: string, oldRookId: string, oldKingId: string, color: string) => {
    let moveRookTo: HTMLElement = document.getElementById(currentRookId)!

    addClassMoveTo(moveRookTo, color, 'Rook')

    let moveRookFrom: HTMLElement = document.getElementById(oldRookId)!

    addEmptyClassMoveFrom(moveRookFrom)

    let moveKingTo: HTMLElement = document.getElementById(currentKingId)!

    addClassMoveTo(moveKingTo, color, 'King')

    let moveKingFrom: HTMLElement = document.getElementById(oldKingId)!

    addEmptyClassMoveFrom(moveKingFrom)
}


const addEmptyClassMoveFrom = (moveFrom: Element) => {
    moveFrom.className = ''
    moveFrom.classList.add(`figure`)
    moveFrom.classList.add(`figure__empty`)
}

const addClassMoveTo = (moveTo: Element, color: string, figure: string) => {
    moveTo.className = ''
    moveTo.classList.add(`figure`)
    moveTo.classList.add(`figure__${color}-${figure}`)
}

const addFieldChosen = (currentId: string, idBefore: string) => {
    let moveTo: HTMLElement = document.getElementById(currentId)!.parentElement!
    let moveFrom: HTMLElement = document.getElementById(idBefore)!.parentElement!

    moveTo.classList.add('field__chosen')
    moveFrom.classList.add('field__chosen')
}