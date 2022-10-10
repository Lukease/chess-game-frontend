import {getHistoryFromLocalStorage, setCurrentColorToLocalStorage, setHistoryOfMovesToLocalStorage} from '../data-base'
import {LastMove} from '../../types'

export const showHistoryMove = (listenerElement: HTMLDivElement) => {
    const history: Array<LastMove> = getHistoryFromLocalStorage()

    listenerElement.addEventListener('click', () => {
            const elementId: number = parseInt(listenerElement.id.split('-')[1])
            const historyToClickedMove: Array<LastMove> = history.filter((move: LastMove) => move.idInArray < elementId)
            const historyFromClickedMove: Array<LastMove> = history.filter((move: LastMove) => move.idInArray > elementId - 1)
            const historyFromClickedMoveReverse: Array<LastMove> = historyFromClickedMove.reverse()
            const fieldChosen: NodeListOf<Element> = document.querySelectorAll('.field__chosen')


            setHistoryOfMovesToLocalStorage(historyToClickedMove)

            if (elementId % 2) {
                setCurrentColorToLocalStorage('black')
            }
                setCurrentColorToLocalStorage('white')

            historyToClickedMove.forEach((move, index) => {
                if (index === (historyToClickedMove.length - 1)) {
                    let moveTo: HTMLElement = document.getElementById(move.currentId)!.parentElement!
                    let moveFrom: HTMLElement = document.getElementById(move.idBefore)!.parentElement!

                    moveTo.classList.add('field__chosen')
                    moveFrom.classList.add('field__chosen')
                }
            })

            fieldChosen.forEach(field => {
                field.classList.remove('field__chosen')
            })

            historyFromClickedMoveReverse.forEach((move, index) => {
                let moveTo: HTMLElement = document.getElementById(move.currentId)!

                moveTo.classList.remove(`figure__${move.currentName}`)
                moveTo.classList.add(`figure__${move.nameBefore}`)

                let moveFrom: HTMLElement = document.getElementById(move.idBefore)!

                moveFrom.classList.remove('figure__empty')
                moveFrom.classList.add(`figure__${move.currentName}`)
            })
        }
    )
}