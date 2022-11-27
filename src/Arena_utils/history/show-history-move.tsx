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
            const color: string = move.color
            const specialMoves: string = move.specialMove
            const currentNumber: number = 0
            const oldNumber: number = 1

            if (specialMoves === 'OO' || specialMoves === 'OOO') {
                castleIds(move, currentNumber, oldNumber)
            } else if (specialMoves === 'P=') {
                pawnPromotionHistoryBack(move, idBefore, currentId)
            } else if (specialMoves === 'e.p.') {
                let capturedPawnColor = 'white'

                if (color === 'white') {
                    capturedPawnColor = 'black'
                }
                enPassantHistoryBack(move, currentId, idBefore, capturedPawnColor)
            } else {
                let moveTo: HTMLElement = document.getElementById(currentId)!

                moveTo.classList.remove(`figure__${move.currentName}`)
                moveTo.classList.add(`figure__${move.nameBefore}`)

                let moveFrom: HTMLElement = document.getElementById(idBefore)!

                moveFrom.classList.remove('figure__empty')
                moveFrom.classList.add(`figure__${move.currentName}`)
            }
        }
    )
}

const backToCurrentPosition = (historyOfMoves: Array<LastMove>) => {
    historyOfMoves.forEach((move) => {
        const specialMove: string = move.specialMove
        const currentNumber: number = 1
        const oldNumber: number = 0
        const color: string = move.color
        let capturedPawnColor = 'white'

        if (color === 'white') {
            capturedPawnColor = 'black'
        }

        if (specialMove === 'OO' || specialMove === 'OOO') {
            castleIds(move, currentNumber, oldNumber)

        } else if (specialMove === 'e.p.') {
            enPassantHistoryBackToCurrent(move, capturedPawnColor)
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

const castleBackToCurrent = (currentRookId: string, currentKingId: string, oldRookId: string, oldKingId: string, king: string, rook: string) => {
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

const castleIds = (move: LastMove, currentNumber: number, oldNumber: number) => {
    const currentRookId: string = move.currentId.split('-')[currentNumber]
    const currentKingId: string = move.idBefore.split('-')[currentNumber]
    const oldKingId: string = move.idBefore.split('-')[oldNumber]
    const oldRookId: string = move.currentId.split('-')[oldNumber]

    castleBackToCurrent(currentRookId, currentKingId, oldRookId, oldKingId, move.currentName, move.nameBefore)
}

const pawnPromotionHistoryBack = (move: LastMove, idBefore: string, currentId: string) => {
    let moveTo: HTMLElement = document.getElementById(currentId)!

    moveTo.classList.remove(`figure__${move.currentName}`)
    moveTo.classList.add(`figure__${move.nameBefore}`)

    let moveFrom: HTMLElement = document.getElementById(idBefore)!

    moveFrom.classList.remove('figure__empty')
    moveFrom.classList.add(`figure__${move.color}-Pawn`)
}

const enPassantHistoryBack = (move: LastMove, currentId: string, idBefore: string, capturedPawnColor: string) => {
    let moveTo: HTMLElement = document.getElementById(currentId)!

    moveTo.classList.remove(`figure__${move.currentName}`)
    moveTo.classList.add(`figure__empty`)

    let moveFrom: HTMLElement = document.getElementById(idBefore)!

    moveFrom.classList.remove('figure__empty')
    moveFrom.classList.add(`figure__${move.currentName}`)

    let capturedPawn: HTMLElement = document.getElementById(move.nameBefore)!

    capturedPawn.classList.remove('figure__empty')
    capturedPawn.classList.add(`figure__${capturedPawnColor}-Pawn`)
}

const enPassantHistoryBackToCurrent = (move: LastMove, capturedPawnColor: string) => {
    const currentId: string = move.currentId
    const idBefore: string = move.idBefore

    let moveTo: HTMLElement = document.getElementById(currentId)!

    moveTo.classList.remove(`figure__empty`)
    moveTo.classList.add(`figure__${move.currentName}`)

    let moveFrom: HTMLElement = document.getElementById(idBefore)!

    moveFrom.classList.remove(`figure__${move.currentName}`)
    moveFrom.classList.add(`figure__empty`)

    let capturedPawn: HTMLElement = document.getElementById(move.nameBefore)!

    capturedPawn.classList.remove(`figure__${capturedPawnColor}-Pawn`)
    capturedPawn.classList.add(`figure__empty`)
}