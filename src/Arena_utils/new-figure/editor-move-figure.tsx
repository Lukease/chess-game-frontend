import {
    getItemFromLocalStorage,
    setArrayToLocalStorage
} from '../data-base'
import {Piece} from '../chess-possible-move'
import {addPiece} from './add-figure'

let nameOfFigure: string
let isMoving = false
let figure: any
let previousFigure: any

export const editorAddNewFigure = (event: any) => {
    if (isMoving) {
        isMoving = false

        const color: string = document.querySelector('.game__color')!.innerHTML
        const trashIconChosen: Element = document.querySelector('.content__trash')!
        let x: number = event.clientX
        let y: number = event.clientY
        const mouseUpTarget: Array<Element> = document.elementsFromPoint(x, y)
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
                    // Board.getElementById(previousFigure.id)
                    element.classList.add(secondClass)
                    element.classList.remove('figure__empty')
                    figure = ''
                    previousFigure = ''

                    const figureClass: string = secondClass.split('__')[1]
                    const figureColor: string = figureClass.split('-')[0]
                    const figureName: string = figureClass.split('-')[1]
                    const columnNumber: number = (element.id.charAt(0)).charCodeAt(0) - 64
                    const fieldNumber: number = parseInt(element.id.charAt(1))
                    const newFigure: Piece = addPiece(figureName,columnNumber,fieldNumber,figureColor,element.id)!
                    const localStorageChess: Array<Piece> = getItemFromLocalStorage()
                    const gameArrangement: Array<Piece> = localStorageChess.concat(newFigure)

                    setArrayToLocalStorage(gameArrangement)
                }
            })
        }

        if (!isEmptyFigure) {
            previousFigure.classList.add(secondClass)
            previousFigure.classList.remove('figure__empty')
            figure = ''
            previousFigure = ''
        }
    }
}
