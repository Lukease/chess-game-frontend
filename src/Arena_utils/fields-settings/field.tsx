import React from 'react'
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
    getColorFromLocalStorage,
    setSpecialMoveToLocalStorage,
    getSpecialMoveFromLocalStorage,
    setCorrectMovesOfOpponentToLocalStorage
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
    addPieceToDataBase, fillField
} from './fields-utils'
import {Piece} from '../chess-possible-move'

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
    const figureName: string = figureInArray.name
    const figureColor: string = figureInArray.color
    const position: Array<number> = figureInArray.position
    const [columnNumber, fieldNumber] = position
    let coordinate: Array<string> = checkPossibleMoves(figureName, columnNumber, fieldNumber, figureColor)!
    const enPassant: string = enPassantAddCorrectMove(figureName, id, figureColor)!

    if (enPassant) {
        coordinate = coordinate.concat(enPassant)
    }

    showPossibleMoves(coordinate)
    nameOfFigure = figureName
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

        const color: string = getColorFromLocalStorage()
        let capturedFigureColor: string = 'white'

        if (color === 'white') {
            capturedFigureColor = 'black'
        }
        const localStorageChess: Array<Piece> = getItemFromLocalStorage()
        let gameArrangement: Array<Piece> = localStorageChess.filter(chess => chess.id !== selectedFigure.id)
        const currentColumnNumber: number = (currentFieldImg.id.charAt(0))
            .charCodeAt(0) - 64
        const currentFieldNumber: number = parseInt(currentFieldImg.id.charAt(1))
        const currentFigureClass: string = currentFieldImg.className
            .split(' ')[1]
        const currentFigure: string = currentFigureClass.split('__')[1]
        const figure: string = nameOfFigure
        const pawnPromotionCondition: boolean = currentFieldImg.id.includes('8') || currentFieldImg.id.includes('1')

        if (figure === 'King') {
            castleKing(currentFieldImg.id)
        }

        if (figure === 'Pawn' && pawnPromotionCondition) {
            setSpecialMoveToLocalStorage('P=')
            showNewFigureForPlayer(currentFieldNumber, currentFieldImg.id, figure, movedFigureId)
        }

        if (currentFieldImg.classList.contains(`field__e-p`)) {
            addPieceToDataBase(gameArrangement, currentFieldImg, nameOfFigure, currentColumnNumber, currentFieldNumber, colorOfFigure)
            enPassantMakeMove(colorOfFigure, currentFieldImg.id, movedFigureId)
        }

        const specialMove = getSpecialMoveFromLocalStorage()

        if (!specialMove) {
            if (currentFieldImg.classList.contains(`figure__empty`)) {
                addPieceToDataBase(gameArrangement, currentFieldImg, nameOfFigure, currentColumnNumber, currentFieldNumber, colorOfFigure)
                addMoveToHistory(`${colorOfFigure}-${nameOfFigure}`, currentFigure, movedFigureId, currentFieldImg.id, color)

            } else if (!currentFieldImg.classList.contains(`figure__empty`)) {
                gameArrangement = gameArrangement.filter(chess => chess.id !== currentFieldImg.id)
                addPieceToDataBase(gameArrangement, currentFieldImg, nameOfFigure, currentColumnNumber, currentFieldNumber, colorOfFigure)
                addMoveToHistory(`${colorOfFigure}-${nameOfFigure}`, `${capturedFigureColor}-${currentFigure}`, movedFigureId, currentFieldImg.id, color)
            }
        }

        event.currentTarget.classList.add('field__chosen')
        selectedFigure.className = ''
        selectedFigure.classList.add('figure')
        selectedFigure.classList.add('figure__empty')

        arrayOfSelectedFigures = arrayOfSelectedFigures.concat(event.currentTarget)

        currentFieldImg.className = ''
        currentFieldImg.classList.add('figure')
        currentFieldImg.classList.add(`figure__${color}-${nameOfFigure}`)
        coordinateOfChess = []
        arrayOfCorrectIds = []

        arrayOfSelectedFigures = removeChosenField(arrayOfSelectedFigures, event)
        blackWhiteChangeTurn()
        endGame(currentFigure, colorOfFigure)
        kingCheck()
    }

    return
}

export class Field extends React.Component<any, any> {
    private rawNumber: number
    private id: string
    private columnNumber: number
    private color: string
    private piece: Piece

    constructor(props: any, id: string, columnNumber: number, rawNumber: number, piece: Piece) {
        super(props)

        this.id = id
        this.columnNumber = columnNumber
        this.rawNumber = rawNumber
        this.color = (columnNumber + rawNumber) % 2 ? 'black' : 'white'
        this.piece = piece
        this.state = {isChosen: false}
        this.state = {isMoving: false}
    }


    game = (id: string, event: any) => {
        const color: string = getColorFromLocalStorage()
        const trashIconChosen: Element = document.querySelector('.navigation__trash')!
        const target = event.target

        if (!trashIconChosen.classList.contains('navigation__trash--chosen')) {
            if (target.className.includes(`figure__${color}`)) {
                this.setState((state: { isChosen: boolean }) => ({
                    isChosen: !state.isChosen
                }))

                const opponentMovesIdsArray: Array<string> = kingCheck()

                setCorrectMovesOfOpponentToLocalStorage(opponentMovesIdsArray)
                selectChess(id, event)

            } else {
                this.setState((state: { isMoving: boolean }) => ({
                    isChosen: !state.isMoving
                }))
                moveChess(event)
            }
        } else if (trashIconChosen.classList.contains('navigation__trash--chosen') && target.className.includes('figure') && !target.classList.value.includes('King')) {
            target.className = ''
            target.classList.add('figure')
            target.classList.add('figure__empty')

            removeChessFromLocalStorage(this.props.id)
        }
    }

    render() {
        return (
            <div
                className={this.state.isChosen ? `field  field__${this.props.value} field__chosen` : `field  field__${this.props.value}`}
                onClick={event => {
                    this.game(this.props.id, event)
                }}
            >
                <img
                    className={`figure ${fillField(getItemFromLocalStorage(), this.props.id)}`}
                    id={this.props.id}
                    alt={''}

                    // onMouseDown={event => moveFigure(event,props.className,props.id)}
                    // onMouseMove={event => mouseMoveFigure(event)}
                    // onMouseUp={event => moveChess(event)}
                >
                </img>
            </div>
        )
    }
}
