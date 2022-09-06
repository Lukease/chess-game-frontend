import {Figure} from '../../types'
import {getItemFromLocalStorage, removeChessFromLocalStorage, setArrayToLocalStorage} from '../data-base'

let nameOfFigure: string
let isMoving = false
let figure: any
let previousFigure: any

export const editorGetFigure = (event: any) => {
    const [figureClass,] = event.target.classList
    const color = document.querySelector('.game__color')!.innerHTML
    const trashIconChosen = document.querySelector('.navigation__trash')!

    previousFigure = event.target
    if (figureClass === 'figure' && color === 'black/white' && !trashIconChosen.classList.contains('navigation__trash--chosen')) {
        nameOfFigure = event.target.classList.value
        isMoving = true

        const secondClass: string = nameOfFigure.split(' ')[1]

        figure = document.createElement('div')
        figure.classList.add('figure__move', secondClass)
        document.body.style.cursor = 'none'
        figure.style.display = 'block'
        figure.style.position = 'absolute'

        if (event.target.parentNode.classList.contains('game__add-figure')) {
            event.target.appendChild(figure)
        } else {
            event.target.parentNode.appendChild(figure)
            event.target.className = ''
            event.target.classList.add('figure')
            event.target.classList.add('figure__empty')
        }
    }
}

export const editorMouseMoveFigure = (event: any) => {
    if (isMoving) {
        let x: number = event.clientX - 50
        let y: number = event.clientY - 30

        figure.style.left = `${x}px`
        figure.style.top = `${y}px`
    }
}

export const editorAddNewFigure = (event: any) => {
    if (isMoving) {
        isMoving = false

        const color = document.querySelector('.game__color')!.innerHTML
        const trashIconChosen = document.querySelector('.navigation__trash')!
        let x: number = event.clientX
        let y: number = event.clientY
        const mouseUpTarget = document.elementsFromPoint(x, y)
        const isEmptyFigure = mouseUpTarget.reduce((acc, item) => {
            if (item.classList.value === 'figure figure__empty') {
                return true
            }
            return acc

        }, false)

        figure.remove()
        document.body.style.cursor = 'auto'

        const secondClass: string = nameOfFigure.split(' ')[1]

        if (color === 'black/white' && !trashIconChosen.classList.contains('navigation__trash--chosen') && isEmptyFigure) {
            mouseUpTarget.forEach(element => {

                if (element.id !== '' && element.id !== 'root') {
                    element.classList.add(secondClass)
                    element.classList.remove('figure__empty')
                    figure = ''
                    previousFigure = ''

                    removeChessFromLocalStorage(previousFigure.id)
                    const columnNumber: number = (element.id.charAt(0)).charCodeAt(0) - 64
                    const fieldNumber: number = parseInt(element.id.charAt(1))
                    const localStorageChess: Array<Figure> = getItemFromLocalStorage()
                    let gameArrangement: Array<Figure> = localStorageChess.concat({
                        id: element.id,
                        name: nameOfFigure,
                        position: [columnNumber, fieldNumber],
                        color: color
                    })

                    setArrayToLocalStorage(gameArrangement)
                }
            })
        }

        if (!isEmptyFigure) {
            previousFigure.classList.add(secondClass)
            previousFigure.classList.remove('figure__empty')

            const chess = previousFigure.id
            const columnNumber: number = (chess.charAt(0)).charCodeAt(0) - 64
            const fieldNumber: number = parseInt(chess.charAt(1))
            const localStorageChess: Array<Figure> = getItemFromLocalStorage()
            let gameArrangement: Array<Figure> = localStorageChess.concat({
                id: chess,
                name: nameOfFigure,
                position: [columnNumber, fieldNumber],
                color: color
            })

            setArrayToLocalStorage(gameArrangement)

            figure = ''
            previousFigure = ''
        }
    }
}
