import React, {useState} from 'react'
import '../Arena.css'
import {Figure} from '../types'
import {defaultChessArrangement} from '../chess_arrangement/default_chess_arrangement'
import {checkPossibleMoves} from './possible-moves-utils'
import {blackWhiteChangeTurn, showPossibleMoves, removePossibleMoves, removeChosenField} from './game'
import {addNewFigure, mouseMoveFigure, moveFigure} from './game/move-figure'

let coordinateOfChess: Array<any> = []
let arrayOfSelectedNames: Array<string> = []
let arrayOfSelectedFigures: Array<any> = []
let arrayOfCorrectIds: Array<string> = []
let fieldAndColumnNumber: Array<number> = []
let figureNameAndColor: Array<string> = []
let lastMoveId: Array<string> = []
let selectedFigure: any = []

const fillField = (chessArray: Array<Figure>, fieldId: string) => {
    const figure: Array<string> = chessArray.map(figure => {
        const column: number = (fieldId.charAt(0)).charCodeAt(0) - 64
        const number: number = parseInt(fieldId.charAt(1))
        const [figureColumn, figureField] = figure.id

        if (column === figureColumn && number === figureField) {

            return `figure__${figure.name}`
        }
        return 'figure__empty'
    })

    const figureName = figure.find(name => name !== 'figure__empty')

    return (figureName ? figureName : 'figure__empty')
}

const selectChess = (id: string, event: any) => {
    const columnNumber: number = (id.charAt(0)).charCodeAt(0) - 64
    const fieldNumber: number = parseInt(id.charAt(1))

    fieldAndColumnNumber = fieldAndColumnNumber.concat(columnNumber, fieldNumber)
    lastMoveId = lastMoveId.concat(id)

    const figureClass: string = event.target.className.split(' ')[1]
    const figure: string = figureClass.split('__')[1]
    const figureNameAndColorSplit: Array<string> = figure.split('-')
    const [figureColor, figureName] = figureNameAndColorSplit
    const coordinate: Array<string> = checkPossibleMoves(figureName, columnNumber, fieldNumber, figureColor)!

    showPossibleMoves(coordinate)

    arrayOfCorrectIds = arrayOfCorrectIds.concat(coordinate)
    figureNameAndColor = figureNameAndColor.concat(figureColor, figureName)
    coordinateOfChess = coordinateOfChess.concat(id)
    arrayOfSelectedNames = arrayOfSelectedNames.concat(figure)
    selectedFigure = event.target
    arrayOfSelectedFigures = arrayOfSelectedFigures.concat(event.currentTarget)

    return
}

const unCheckChess = () => {
    removePossibleMoves(arrayOfCorrectIds)

    coordinateOfChess = []
    arrayOfSelectedNames = []
    arrayOfSelectedFigures = []
    arrayOfCorrectIds = []
    fieldAndColumnNumber = []
    figureNameAndColor = []

    return
}

const moveChess = (event: any) => {
    removePossibleMoves(arrayOfCorrectIds)

    if (arrayOfCorrectIds.some(id => id === event.target.id) && coordinateOfChess.length !== 0) {
        const [figure] = arrayOfSelectedNames
        const currentFieldImg = event.target

        event.currentTarget.classList.add('field__chosen')
        selectedFigure.classList.remove(`figure__${figure}`)
        selectedFigure.classList.add('figure__empty')

        arrayOfSelectedFigures = arrayOfSelectedFigures.concat(event.currentTarget)

        currentFieldImg.className = ''
        currentFieldImg.classList.add('figure')
        currentFieldImg.classList.add(`figure__${figure}`)
        arrayOfSelectedNames = []
        coordinateOfChess = []
        arrayOfCorrectIds = []
        figureNameAndColor = []
        fieldAndColumnNumber = []

        arrayOfSelectedFigures = removeChosenField(arrayOfSelectedFigures, event)
        blackWhiteChangeTurn()
    }

    return
}

export function Field(props: any) {
    const [isChosen, setIsChosen] = useState(false)
    const game = (id: string, event: any) => {
        const color: string = document.querySelector('.game__color')!.innerHTML
        const trashIconChosen: Element = document.querySelector('.navigation__trash')!

        if (!trashIconChosen.classList.contains('navigation__trash--chosen')) {
            if (event.target.className.includes(`figure__${color}`) && coordinateOfChess.length === 0) {
                setIsChosen(!isChosen)
                selectChess(id, event)

            } else if (event.target.className !== 'figure__empty' && coordinateOfChess.includes(id)) {
                setIsChosen(!isChosen)
                unCheckChess()

            } else {
                moveChess(event)
            }
        } else if (trashIconChosen.classList.contains('navigation__trash--chosen') && event.target.className.includes('figure') && !event.target.classList.value.includes('King')) {
            event.target.className = ''
            event.target.classList.add('figure')
            event.target.classList.add('figure__empty')
        }
    }

    return (
        <div
            className={isChosen ? `field  field__${props.value} field__chosen` : `field  field__${props.value}`}
            onClick={event => {
                game(props.id, event)
            }}
        >
            <img
                // ${fillField(defaultChessArrangement, props.id)}
                className={`figure ${fillField(defaultChessArrangement, props.id)}`}
                id={props.id}
                alt={''}
                // onMouseDown={event => moveFigure(event,props.className,props.id)}
                // onMouseMove={event => mouseMoveFigure(event)}
                // onMouseUp={event => moveChess(event)}
            >
            </img>
        </div>
    )
}
