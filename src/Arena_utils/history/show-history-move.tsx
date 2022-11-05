import {getHistoryFromLocalStorage} from '../data-base'
import {LastMove} from '../../types'

const showChosenFieldHistory = (move: LastMove) => {
    let moveTo: HTMLElement = document.getElementById(move.currentId)!.parentElement!
    let moveFrom: HTMLElement = document.getElementById(move.idBefore)!.parentElement!

    moveTo.classList.add('field__chosen')
    moveFrom.classList.add('field__chosen')
}

const showMoveOfFiguresBack = (historyOfMoves: Array<LastMove>) => {
    historyOfMoves.forEach((move) => {
        let moveTo: HTMLElement = document.getElementById(move.currentId)!

        moveTo.classList.remove(`figure__${move.currentName}`)
        moveTo.classList.add(`figure__${move.nameBefore}`)

        let moveFrom: HTMLElement = document.getElementById(move.idBefore)!

        moveFrom.classList.remove('figure__empty')
        moveFrom.classList.add(`figure__${move.currentName}`)
    })
}

const backToActualPosition = (historyOfMoves: Array<LastMove>) => {
    historyOfMoves.forEach((move) => {
        let moveTo: HTMLElement = document.getElementById(move.currentId)!

        moveTo.className = ''
        moveTo.classList.add(`figure`)
        moveTo.classList.add(`figure__${move.currentName}`)

        let moveFrom: HTMLElement = document.getElementById(move.idBefore)!

        moveFrom.className = ''
        moveFrom.classList.add(`figure`)
        moveFrom.classList.add(`figure__empty`)
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

            backToActualPosition(history)

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