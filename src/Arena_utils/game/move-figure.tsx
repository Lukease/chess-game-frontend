import {blackWhiteChangeTurn} from './black-white-change-turn'
import {removePossibleMoves} from './remove-possible-moves'
import {Piece} from '../chess-possible-move'

let isMoving = false
let figure: any
let previousFigure: any
let coordinate: Array<string> = []

export const addNewFigure = (event: any, fieldId: string) => {
    document.body.style.cursor = 'auto'
    if (isMoving && coordinate.some(id => id === fieldId)) {
        isMoving = false
        blackWhiteChangeTurn()
        removePossibleMoves(coordinate)

        let x: number = event.screenX
        let y: number = event.screenY
        const mouseUpTarget = document.elementsFromPoint(x, y)

        figure.remove()



        mouseUpTarget.forEach(element => {
            if (element.id !== '' && element.id !== 'root') {
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
