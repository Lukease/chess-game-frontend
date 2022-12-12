import React from 'react'
import './Arena.css'
import {
    Field,
    FieldNumber,
    Letter
} from './Arena_utils/fields-settings'
import {GameNavigation} from './Arena_utils/start-game'
import {
    setArrayToLocalStorage,
    setCorrectMovesOfOpponentToLocalStorage
} from './Arena_utils/data-base'
import {defaultChessArrangement} from './chess_arrangement/default-chess-arrangement'
import {HistoryOfMoves} from './Arena_utils/history'
import {
    PromotePawn
} from './Arena_utils/game'
import {setCheckToLocalStorage} from './Arena_utils/data-base/check'
import {setSpecialMoveToLocalStorage} from './Arena_utils/data-base'
import {Piece} from './Arena_utils/chess-possible-move'
import {CoordinateService} from './Arena_utils/suppliers/coordinate-service'
import {GameService} from './Arena_utils/suppliers/game-service'
import {AddPiecePanel} from './Arena_utils/new-figure'
import {SelectPlayer} from './Arena_utils/start-game/select-player'
import {MovingService} from './Arena_utils/suppliers/moving-service'

export class Board extends React.Component<any, any> {
    pieces: Array<Piece>
    gameService: GameService
    allFields: Array<Field>
    movingService: MovingService

    constructor(props: any) {
        super(props)

        this.deletePiece = this.deletePiece.bind(this)
        this.pieces = props.pieces
        this.gameService = props.gameService
        this.movingService = props.movingService
        this.allFields = []
        this.state = {
            isTrashOn: false,
        }

        this.movingService.board = this
        this.gameService.board = this
    }

    getPieceById(id: string) {
        const coordinate = CoordinateService.getCoordinateById(id)

        return this.pieces.find(piece => piece.coordinate === coordinate)!
    }

    removePieceFromArray(piece: Piece) {
        this.pieces = this.pieces.filter(chess => chess !== piece)
    }

    selectActive(field: Field) {

    }

    deletePiece(field: Field) {
        if (this.state.isTrashOn) {
            const pieceId = field.id

            this.removePieceFromArray(this.getPieceById(pieceId))
        }
    }

    setTrashToggle(active: boolean) {
        this.setState({isTrashOn: !active})
    }

    renderLetters() {
        const alpha: Array<number> = Array.from(Array(8)).map((e, i) => i + 65)
        const arrayOfLetters: Array<string> = alpha.map(letter => String.fromCharCode(letter))
        const letterField: Array<JSX.Element> = ['', ...arrayOfLetters, ''].map((letter, index) => {

            return (
                <Letter
                    value={letter}
                    key={index}
                />
            )
        })

        return letterField
    }

    renderNumbers(site: string) {
        const arrayOfNumbers: Array<JSX.Element> = Array.apply(null, Array(8)).map((x, index) => {

            return (
                <FieldNumber
                    value={-index + 8}
                    key={index}
                    site={site}
                />
            )
        })

        return arrayOfNumbers
    }

    renderAllFields(letter: string, boardColumn: number) {
        let output: Array<JSX.Element> = Array.apply(null, Array(8)).map((x, index) => {
            const boardRow: number = -index + 8
            const currentPiece: Piece = this.getPieceById(`${letter}${boardRow}`)

            return (
                <Field
                    rowNumber={boardRow}
                    id={`${letter}${boardRow}`}
                    columnNumber={boardColumn}
                    piece={currentPiece}
                    key={`${letter}${boardRow}`}
                    color={(boardColumn + boardRow) % 2 ? 'white' : 'black'}
                    gameService={this.gameService}
                    movingService={this.movingService}
                />
            )
        })
        return output
    }

    renderAllColumns() {
        let output: Array<JSX.Element> = Array.apply(null, Array(8)).map((x, index) => {
            const letter: string = String.fromCharCode(64 + (index + 1))
            const boardColumn: number = index + 1

            return (
                <div className='field__column'
                     key={letter}
                >
                    {this.renderAllFields(letter, boardColumn)}
                </div>
            )

        })

        return output
    }

    render() {
        return (
            <div className={'game'}>
                <div className={'game__letters'}>
                    {this.renderLetters()}
                </div>
                <div className={'arena'}>
                    <div className={'arena__numbers'}>
                        {this.renderNumbers('left')}
                    </div>
                    <div className={'arena__chess'}
                         onClick={() => this.deletePiece}
                    >
                        {this.renderAllColumns()}
                    </div>
                    <div className={'arena__numbers'}>
                        {this.renderNumbers('right')}
                    </div>
                </div>
                <div className={'game__letters'}>
                    {this.renderLetters()}
                </div>
            </div>
        )
    }
}

export class Arena extends React.Component<any, any> {
    pieces: Array<Piece>
    gameService: GameService
    kings: Array<Piece>
    movingService: MovingService

    constructor(props: any) {
        super(props)

        this.gameService = this.props.gameService
        this.movingService = this.props.movingService
        this.pieces = defaultChessArrangement
        this.kings = this.pieces.filter(piece => piece.name === 'King')
        this.setDefaultChessPosition = this.setDefaultChessPosition.bind(this)
        this.state = {
            isMovingPiece: false,
            selectedPiece: '',
            coordinateX: 0,
            coordinateY: 0,
            movingId: '',
            newPieceId: ''
        }
        this.gameService.arena = this
        this.movingService.arena = this
    }


    setDefaultChessPosition() {
        window.location.reload()
        localStorage.clear()
        setArrayToLocalStorage(this.pieces)

        const check: boolean = false

        setCheckToLocalStorage(check)
        setSpecialMoveToLocalStorage('')
        const opponentMovesIdsArray: Array<string> = ['A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5']

        setCorrectMovesOfOpponentToLocalStorage(opponentMovesIdsArray)
    }

    setMovingPiece(isMoving: boolean, piece: Piece, x: number, y: number, id: string) {
        this.setState({
            isMovingPiece: isMoving,
            selectedPiece: piece,
            movingId: id? id : '',
            coordinateX: x - 30,
            coordinateY: y - 30,
        })
    }

    editorMouseMoveFigure = (event: any) => {
        if (this.state.isMovingPiece) {
            let x: number = event.clientX - 30
            let y: number = event.clientY - 30

            this.setState({
                coordinateX: x,
                coordinateY: y
            })
        }
    }

    addNewPieceToField() {
        if (this.state.isMovingPiece) {
            this.setState({isMovingPiece: false})
            document.body.style.cursor = 'auto'
            let newPieceId: string

            const mouseUpTarget = document.elementsFromPoint(this.state.coordinateX, this.state.coordinateY)

            mouseUpTarget.forEach(element => {
                if (element.id !== '' && element.id !== 'root') {
                    this.setState({newPieceId: element.id})
                    newPieceId = element.id
                }
            })
            this.movingService.setCurrentPiecePosition(newPieceId!,this.state.selectedPiece,this.state.movingId)
        }
    }

    render() {
        return (
            <div className={'content'}
                 onMouseMove={this.editorMouseMoveFigure}
                 onMouseUp={() => this.addNewPieceToField()}
            >
                {
                    this.state.isMovingPiece ?
                        <img
                            className={'figure__move'}
                            style={
                                {
                                    left: this.state.isMovingPiece ? `${this.state.coordinateX}px` : '',
                                    top: this.state.isMovingPiece ? `${this.state.coordinateY}px` : '',
                                    position: 'absolute',
                                    display: this.state.isMovingPiece ? 'flex' : 'none'
                                }
                            }
                            src={this.state.selectedPiece!.getImageUrl()}
                            alt={''}
                            draggable={false}
                        >

                        </img> :
                        <div
                            style={{ position: 'absolute' }}
                        >
                        </div>
                }
                <HistoryOfMoves/>
                <AddPiecePanel
                    color={'white'}
                    pieces={this.pieces}
                    gameService={this.gameService}
                    movingService={this.props.movingService}
                />
                <GameNavigation
                    gameService={this.gameService}
                    movingService={this.movingService}
                />
                <Board
                    gameService={this.gameService}
                    movingService={this.props.movingService}
                    pieces={this.pieces}
                />
                <AddPiecePanel
                    color={'black'}
                    pieces={this.pieces}
                    gameService={this.gameService}
                    movingService={this.movingService}
                />
                <SelectPlayer
                kings={this.kings}
                />
                <PromotePawn/>
                <div
                    className={'game__navigation--default'}
                    onClick={this.setDefaultChessPosition}
                >
                </div>
            </div>
        )
    }
}

export default Arena