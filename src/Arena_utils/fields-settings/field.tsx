import React from 'react'
import '../../Arena.css'
import {Figure} from '../../types'
import {
    blackWhiteChangeTurn,
    showPossibleMoves,
    removePossibleMoves,
    removeChosenField,
    castleKing
} from '../game'
import {
    getItemFromLocalStorage,
    getColorFromLocalStorage,
    setSpecialMoveToLocalStorage,
    getSpecialMoveFromLocalStorage,
} from '../data-base'
import {addMoveToHistory} from '../history'
import {showNewFigureForPlayer} from '../game'
import {
    endGame
} from '../game'
import {
    enPassantAddCorrectMove,
    enPassantMakeMove,
} from '../en-passant'
import {
    addPieceToDataBase
} from './fields-utils'
import {Piece} from '../chess-possible-move'
import {GameService} from '../suppliers/game-service'
import {Coordinate} from '../chess-possible-move/coordinate'
import {CoordinateService} from '../suppliers/coordinate-service'
import {flushSync} from "react-dom";
import {MovingService} from "../suppliers/moving-service";

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
    let coordinate: Array<string> = ['A2', 'A3']
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
        let gameArrangement: Array<Piece> = localStorageChess.filter(chess => chess.coordinate.boardColumn !== selectedFigure.id)
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
                gameArrangement = gameArrangement.filter(chess => chess.coordinate.boardColumn !== currentFieldImg.id)
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
    }

    return
}

export class Field extends React.Component<any, any> {
    private rowNumber: number
    id: string
    private columnNumber: number
    private color: string
    coordinate: Coordinate
    piece: Piece | undefined
    gameService: GameService
    movingService: MovingService

    constructor(props: any) {
        super(props)

        this.id = props.id
        this.columnNumber = props.columnNumber
        this.rowNumber = props.rowNumber
        this.color = props.color
        this.piece = props.piece
        this.coordinate = CoordinateService.getCoordinateById(this.id)
        this.gameService = props.gameService
        this.movingService = props.movingService
        this.state = {
            isChosen: false,
            correctMove: false,
            imageLoaded: false,
            isMoving: false,
            isGameStarted: false,
            img: this.props.piece ? this.props.piece.getImageUrl() : '',
            isTrashActive: false
        }
        props.gameService.addFieldToGameService(this)
        props.movingService.addFieldToMovingService(this)

    }

    game = (id: string, event: any) => {
        const color: string = getColorFromLocalStorage()
        const trashIconChosen: Element = document.querySelector('.content__trash')!
        const target = event.target

        if (!trashIconChosen.classList.contains('navigation__trash--chosen')) {
            if (target.className.includes(`figure__${color}`)) {
                selectChess(id, event)

            } else {
                moveChess(event)
            }
        }
    }

    getActive() {
        return this.state.isChosen
    }

    setActiveTrash(active: boolean) {
        this.setState({isTrashActive: active})
    }

    setActive(active: boolean) {
        this.setState({isChosen: active})
    }

    setPossibleMove(correct: boolean) {
        this.setState({correctMove: correct})
    }

    restorePiece() {
        this.setMoving(false)
    }

    setPiece(piece: Piece, active: boolean) {
        this.piece = piece
        this.piece.coordinate = this.coordinate
        this.setState({img: this.piece.getImageUrl()})

        if (active) {
            this.setActive(true)
        }
        this.setMoving(false)
    }

    removePiece() {
        this.piece = undefined
        this.setState({img: ''})
        this.setMoving(false)
    }

    setMoving(move: boolean) {
        this.setState({isMoving: move})
    }

    setPiecePosition(field: Field, event: any) {
        const coordinateX = event.clientX
        const coordinateY = event.clientY

        this.setMoving(true)
        document.body.style.cursor = 'none'
        this.movingService.movePiece(field.piece!, coordinateX, coordinateY,field.id, true)
    }

    setGameStarted(isGameStarted: boolean) {
        this.setState({isGameStarted: isGameStarted})
    }

    render() {

        return (
            <div
                className={this.state.isChosen ? `field  field__${this.props.color} field__chosen` : `field  field__${this.props.color}`}
                onClick={event => {
                    this.gameService.fieldClick(this)
                    this.game(this.props.id, event)
                }}
                onMouseDown={event => this.state.isGameStarted || this.state.isTrashActive ? '' : this.setPiecePosition(this!, event)}
                id={this.props.id}
            > {this.piece ?
                <img
                    className={this.state.correctMove ? `figure figure__move-figure` : 'figure'}
                    id={this.props.id}
                    alt={''}
                    src={this.state.img}
                    draggable={false}
                    style={{display: this.state.isMoving ? 'none' : 'block'}}

                    // onMouseDown={event => moveFigure(event,props.className,props.id)}
                    // onMouseMove={event => mouseMoveFigure(event)}
                    // onMouseUp={event => moveChess(event)}
                >

                </img>
                : <div
                    className={this.state.correctMove ? `figure figure__move-empty` : 'figure figure__empty'}
                ></div>
            }
            </div>
        )
    }
}
