import React, {useState} from 'react'
import '../../Arena.css'
import {Figure} from '../../types'
import {checkPossibleMoves} from '../possible-moves-utils'
import {
    blackWhiteChangeTurn,
    showPossibleMoves,
    removePossibleMoves,
    removeChosenField, castleKing
} from '../game'
import {
    getItemFromLocalStorage,
    setArrayToLocalStorage,
    removeChessFromLocalStorage,
    getColorFromLocalStorage
} from '../data-base'
import {addMoveToHistory} from '../history'
import {showNewFigureForPlayer} from '../game'
import {
    kingCheck,
    endGame
} from '../game'
import {enPassantAddCorrectMove} from "../en-passant/en-passant-add-correct-move";

let nameOfFigure: string
let colorOfFigure: string
let coordinateOfChess: Array<any> = []
let arrayOfSelectedFigures: Array<any> = []
let arrayOfCorrectIds: Array<string> = []
let movedFigureId: string
let selectedFigure: any = []

const fillField = (chessArray: Array<Figure>, fieldId: string) => {
    const figure: Array<string> = chessArray.map((figure) => {
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
    selectedFigure = event.target
    coordinateOfChess = []
    arrayOfCorrectIds = []
    movedFigureId = id

    const localStorageChess: Array<Figure> = getItemFromLocalStorage()
    const figureInArray: Figure = localStorageChess.find(chess => chess.id === selectedFigure.id)!
    const figure: string = figureInArray.name
    const figureNameAndColorSplit: Array<string> = figure.split('-')
    const [figureColor, figureName] = figureNameAndColorSplit
    const position: Array<number> = figureInArray.position
    const [columnNumber, fieldNumber] = position
    let coordinate: Array<string> = checkPossibleMoves(figureName, columnNumber, fieldNumber, figureColor)!
    const enPassant: string = enPassantAddCorrectMove(figureName,id, figureColor)!

    if (enPassant){
        coordinate = coordinate.concat(enPassant)
    }
    showPossibleMoves(coordinate)
    nameOfFigure = figure
    colorOfFigure = figureColor

    arrayOfCorrectIds = arrayOfCorrectIds.concat(coordinate)
    coordinateOfChess = coordinateOfChess.concat(id)
    arrayOfSelectedFigures = arrayOfSelectedFigures.concat(event.currentTarget)

    return
}

const moveChess = (event: any) => {
    const currentFieldImg = event.target

    if (arrayOfCorrectIds.some(id => id === currentFieldImg.id) && coordinateOfChess.length !== 0) {
        removePossibleMoves(arrayOfCorrectIds)

        const currentColumnNumber: number = (currentFieldImg.id.charAt(0))
            .charCodeAt(0) - 64
        const currentFieldNumber: number = parseInt(currentFieldImg.id.charAt(1))
        const currentFigureClass: string = currentFieldImg.className
            .split(' ')[1]
        const currentFigure: string = currentFigureClass.split('__')[1]
        const figure: string = nameOfFigure.split('-')[1]

        showNewFigureForPlayer(currentFieldNumber, currentFieldImg.id, figure)

        if (figure === 'King') {
            castleKing(currentFieldImg.id)
        }

        if (currentFieldImg.classList.contains(`figure__empty`)) {
            const localStorageChess: Array<Figure> = getItemFromLocalStorage()
            let gameArrangement: Array<Figure> = localStorageChess.filter(chess => chess.id !== selectedFigure.id)

            gameArrangement = gameArrangement.concat({
                id: currentFieldImg.id,
                name: nameOfFigure,
                position: [currentColumnNumber, currentFieldNumber],
                color: colorOfFigure
            })

            setArrayToLocalStorage(gameArrangement)


        } else if (!currentFieldImg.classList.contains(`figure__empty`)) {
            const localStorageChess: Array<Figure> = getItemFromLocalStorage()
            let gameArrangement: Array<Figure> = localStorageChess.filter(chess => chess.id !== selectedFigure.id)

            gameArrangement = gameArrangement.filter(chess => chess.id !== currentFieldImg.id)
            gameArrangement = gameArrangement.concat({
                id: currentFieldImg.id,
                name: nameOfFigure,
                position: [currentColumnNumber, currentFieldNumber],
                color: colorOfFigure
            })

            setArrayToLocalStorage(gameArrangement)
        }

        event.currentTarget.classList.add('field__chosen')
        selectedFigure.classList.remove(`figure__${nameOfFigure}`)
        selectedFigure.classList.add('figure__empty')

        arrayOfSelectedFigures = arrayOfSelectedFigures.concat(event.currentTarget)

        currentFieldImg.className = ''
        currentFieldImg.classList.add('figure')
        currentFieldImg.classList.add(`figure__${nameOfFigure}`)
        coordinateOfChess = []
        arrayOfCorrectIds = []

        arrayOfSelectedFigures = removeChosenField(arrayOfSelectedFigures, event)
        blackWhiteChangeTurn()
        endGame(currentFigure, colorOfFigure)
        kingCheck()
        addMoveToHistory(nameOfFigure, currentFigure, movedFigureId, currentFieldImg.id)
    }

    return
}

export function Field(props: any) {
    const [isChosen, setIsChosen] = useState(false)
    const game = (id: string, event: any) => {
        const color: string = getColorFromLocalStorage()
        const trashIconChosen: Element = document.querySelector('.navigation__trash')!
        const target = event.target

        if (!trashIconChosen.classList.contains('navigation__trash--chosen')) {
            if (target.className.includes(`figure__${color}`)) {
                kingCheck()
                setIsChosen(!isChosen)
                selectChess(id, event)

            } else {
                moveChess(event)
            }
        } else if (trashIconChosen.classList.contains('navigation__trash--chosen') && target.className.includes('figure') && !target.classList.value.includes('King')) {
            target.className = ''
            target.classList.add('figure')
            target.classList.add('figure__empty')

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
