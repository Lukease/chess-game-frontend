import {checkPossibleMoves} from "../possible-moves-utils"
import {showPossibleMoves} from "./show-possible-moves"
import { blackWhiteChangeTurn } from './black-white-change-turn'
import { removePossibleMoves } from './remove-possible-moves'

let nameOfFigure: string
let isMoving = false
let figure: any
let previousFigure: any
let coordinate: Array<string> = []

export const moveFigure = (event: any, figureNameAndColorSplit: Array<string>, id: string) => {
    const color = document.querySelector('.game__color')!.innerHTML

    coordinate = []
    previousFigure = event.target
    if (event.target.className.includes(`figure__${color}`)) {
        nameOfFigure = event.target.classList.value
        isMoving = true
        //
        // const columnNumber: number = (id.charAt(0)).charCodeAt(0) - 64
        // const fieldNumber: number = parseInt(id.charAt(1))
        // const figureClassAll: string = event.target.className.split(' ')[1]
        // const figureClass: string = figureClassAll.split('__')[1]
        // const figureNameAndColorSplit: Array<string> = figureClass.split('-')
        // const [figureColor, figureName] = figureNameAndColorSplit
        // coordinate = checkPossibleMoves(figureName, columnNumber, fieldNumber, figureColor)!
        //
        // showPossibleMoves(coordinate)

        const secondClass: string = nameOfFigure.split(' ')[1]

        figure = document.createElement('div')
        figure.classList.add('figure__move', secondClass)
        event.target.parentNode.appendChild(figure)
        document.body.style.cursor = 'none'
        figure.style.display = 'block'
        figure.style.position = 'absolute'
        event.target.className = ''
        event.target.classList.add('figure')
        event.target.classList.add('figure__empty')

    }
    return
}

export const mouseMoveFigure = (event: any) => {
    if (isMoving) {
        let x: number = event.clientX - 50
        let y: number = event.clientY - 30

        figure.style.left = `${x}px`
        figure.style.top = `${y}px`
    }
}

export const addNewFigure = (event: any, fieldId: string) => {
    if (isMoving && coordinate.some(id => id === fieldId)) {
        isMoving = false
        blackWhiteChangeTurn()
        removePossibleMoves(coordinate)

        let x: number = event.clientX
        let y: number = event.clientY
        const mouseUpTarget = document.elementsFromPoint(x, y)

        figure.remove()
        document.body.style.cursor = 'auto'

        const secondClass: string = nameOfFigure.split(' ')[1]


        mouseUpTarget.forEach(element => {
            if (element.id !== '' && element.id !== 'root') {
                element.classList.add(secondClass)
                element.classList.remove('figure__empty')
            }
        })

        previousFigure.className = ''
        previousFigure.classList.add('figure')
        previousFigure.classList.add('figure__empty')
        figure = ''
        previousFigure = ''
    }

    coordinate = []
}
