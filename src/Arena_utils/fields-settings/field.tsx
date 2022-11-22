import React, {useState} from 'react'
import '../../Arena.css'
import {Figure} from '../../types'
import {checkPossibleMoves} from '../possible-moves-utils'
import {
    blackWhiteChangeTurn,
    showPossibleMoves,
    removePossibleMoves,
    removeChosenField,
    castleKing
} from '../game'
import {
    getItemFromLocalStorage,
    removeChessFromLocalStorage,
    getColorFromLocalStorage, setSpecialMoveToLocalStorage, getSpecialMoveFromLocalStorage
} from '../data-base'
import {addMoveToHistory} from '../history'
import {showNewFigureForPlayer} from '../game'
import {
    kingCheck,
    endGame
} from '../game'
import {
    enPassantAddCorrectMove,
    enPassantMakeMove,
} from '../en-passant'
import {
    fillField,
    addArrayToDataBase
} from './fields-utils'

let nameOfFigure: string
let colorOfFigure: string
let coordinateOfChess: Array<any> = []
let arrayOfSelectedFigures: Array<any> = []
let arrayOfCorrectIds: Array<string> = []
let movedFigureId: string
let selectedFigure: any = []

const selectChess = (id: string, event: any) => {
    setSpecialMoveToLocalStorage('')
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
    const enPassant: string = enPassantAddCorrectMove(figureName, id, figureColor)!

    if (enPassant) {
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

        const localStorageChess: Array<Figure> = getItemFromLocalStorage()
        let gameArrangement: Array<Figure> = localStorageChess.filter(chess => chess.id !== selectedFigure.id)
        const currentColumnNumber: number = (currentFieldImg.id.charAt(0))
            .charCodeAt(0) - 64
        const currentFieldNumber: number = parseInt(currentFieldImg.id.charAt(1))
        const currentFigureClass: string = currentFieldImg.className
            .split(' ')[1]
        const currentFigure: string = currentFigureClass.split('__')[1]
        const figure: string = nameOfFigure.split('-')[1]
        const pawnPromotionCondition: boolean = currentFieldImg.id.includes('8') || currentFieldImg.id.includes('1')

        if (figure === 'King') {
            castleKing(currentFieldImg.id)
        }

        if (figure === 'Pawn' && pawnPromotionCondition) {
            setSpecialMoveToLocalStorage('P=')
            showNewFigureForPlayer(currentFieldNumber, currentFieldImg.id, figure, movedFigureId)
        }

        if (currentFieldImg.classList.contains(`field__e-p`)) {
            addArrayToDataBase(gameArrangement, currentFieldImg, nameOfFigure, currentColumnNumber, currentFieldNumber, colorOfFigure)
            // addMoveToHistory(nameOfFigure, currentFigure, movedFigureId, currentFieldImg.id)
            enPassantMakeMove(colorOfFigure, currentFieldImg.id, movedFigureId)
        }

        const specialMove = getSpecialMoveFromLocalStorage()

        if (!specialMove) {
            if (currentFieldImg.classList.contains(`figure__empty`)) {
                addArrayToDataBase(gameArrangement, currentFieldImg, nameOfFigure, currentColumnNumber, currentFieldNumber, colorOfFigure)
                addMoveToHistory(nameOfFigure, currentFigure, movedFigureId, currentFieldImg.id)

            } else if (!currentFieldImg.classList.contains(`figure__empty`)) {
                gameArrangement = gameArrangement.filter(chess => chess.id !== currentFieldImg.id)
                addArrayToDataBase(gameArrangement, currentFieldImg, nameOfFigure, currentColumnNumber, currentFieldNumber, colorOfFigure)
                addMoveToHistory(nameOfFigure, currentFigure, movedFigureId, currentFieldImg.id)
            }
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
