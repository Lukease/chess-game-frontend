import React, {useState} from 'react'
import '../Arena.css'
import {Figure} from '../types'
import {checkPossibleMoves} from './possible-moves-utils'
import {
    blackWhiteChangeTurn,
    showPossibleMoves,
    removePossibleMoves,
    removeChosenField
} from './game'
import {
    getItemFromLocalStorage,
    setArrayToLocalStorage,
    removeChessFromLocalStorage
} from './data-base'
import {addMoveToHistory} from './history/add-to-history'

let nameOfFigure: string
let coordinateOfChess: Array<any> = []
let arrayOfSelectedNames: Array<string> = []
let arrayOfSelectedFigures: Array<any> = []
let arrayOfCorrectIds: Array<string> = []
let fieldAndColumnNumber: Array<number> = []
let figureNameAndColor: Array<string> = []
let movedFigureId: string
let selectedFigure: any = []
let parentOfTarget: any

const fillField = (chessArray: Array<Figure>, fieldId: string) => {
    const figure: Array<string> = chessArray.map((figure, index) => {
        const column: number = (fieldId.charAt(0)).charCodeAt(0) - 64
        const number: number = parseInt(fieldId.charAt(1))
        const [figureColumn, figureField] = figure.position

        if (column === figureColumn && number === figureField) {

            return `figure__${figure.name}`
        } else {
            return 'figure__empty'
        }
    })

    const figureName = figure.find(name => name !== 'figure__empty')

    return (figureName ? figureName : 'figure__empty')
}

const selectChess = (id: string, event: any) => {
    removePossibleMoves(arrayOfCorrectIds)
    arrayOfSelectedFigures = removeChosenField(arrayOfSelectedFigures, event)

    coordinateOfChess = []
    arrayOfSelectedNames = []
    arrayOfCorrectIds = []
    fieldAndColumnNumber = []
    figureNameAndColor = []

    const columnNumber: number = (id.charAt(0)).charCodeAt(0) - 64
    const fieldNumber: number = parseInt(id.charAt(1))

    parentOfTarget = event.currentTarget
    fieldAndColumnNumber = fieldAndColumnNumber.concat(columnNumber, fieldNumber)
    movedFigureId = id

    const figureClass: string = event.target.className.split(' ')[1]
    const figure: string = figureClass.split('__')[1]
    const figureNameAndColorSplit: Array<string> = figure.split('-')
    const [figureColor, figureName] = figureNameAndColorSplit
    const coordinate: Array<string> = checkPossibleMoves(figureName, columnNumber, fieldNumber, figureColor)!

    // console.log(coordinate)
    showPossibleMoves(coordinate)
    nameOfFigure = figure

    arrayOfCorrectIds = arrayOfCorrectIds.concat(coordinate)
    figureNameAndColor = figureNameAndColor.concat(figureColor, figureName)
    coordinateOfChess = coordinateOfChess.concat(id)
    arrayOfSelectedNames = arrayOfSelectedNames.concat(figure)
    selectedFigure = event.target
    arrayOfSelectedFigures = arrayOfSelectedFigures.concat(event.currentTarget)

    return
}

const moveChess = (event: any) => {
    const currentFieldImg = event.target

    if (arrayOfCorrectIds.some(id => id === currentFieldImg.id) && coordinateOfChess.length !== 0) {
        removePossibleMoves(arrayOfCorrectIds)
        const [figure] = arrayOfSelectedNames
        const currentColumnNumber: number = (currentFieldImg.id.charAt(0))
            .charCodeAt(0) - 64
        const currentFieldNumber: number = parseInt(currentFieldImg.id.charAt(1))
        const currentFigureClass: string = currentFieldImg.className
            .split(' ')[1]
        const currentFigure: string = currentFigureClass.split('__')[1]
        const figureNameAndColorSplit: Array<string> = currentFigure.split('-')
        const [figureColor,] = figureNameAndColorSplit

        addMoveToHistory(nameOfFigure, currentFigure , movedFigureId, currentFieldImg.id)

        if (currentFieldImg.classList.contains(`figure__empty`)) {
            const localStorageChess: Array<Figure> = getItemFromLocalStorage()
            let gameArrangement: Array<Figure> = localStorageChess.filter(chess => chess.id !== selectedFigure.id)

            gameArrangement = gameArrangement.concat({
                id: currentFieldImg.id,
                name: figure,
                position: [currentColumnNumber, currentFieldNumber],
                color: figureColor
            })

            setArrayToLocalStorage(gameArrangement)


        } else if (!currentFieldImg.classList.contains(`figure__empty`)) {
            const localStorageChess: Array<Figure> = getItemFromLocalStorage()
            let gameArrangement: Array<Figure> = localStorageChess.filter(chess => chess.id !== selectedFigure.id)

            gameArrangement = gameArrangement.filter(chess => chess.id !== currentFieldImg.id)
            gameArrangement = gameArrangement.concat({
                id: currentFieldImg.id,
                name: figure,
                position: [currentColumnNumber, currentFieldNumber],
                color: figureColor
            })

            setArrayToLocalStorage(gameArrangement)
        }

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
            if (event.target.className.includes(`figure__${color}`)) {
                setIsChosen(!isChosen)
                selectChess(id, event)

            } else {
                moveChess(event)
            }
        } else if (trashIconChosen.classList.contains('navigation__trash--chosen') && event.target.className.includes('figure') && !event.target.classList.value.includes('King')) {
            event.target.className = ''
            event.target.classList.add('figure')
            event.target.classList.add('figure__empty')

            removeChessFromLocalStorage(props.id)
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
                className={`figure ${fillField(JSON.parse(localStorage.getItem('chess')!), props.id)}`}
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
