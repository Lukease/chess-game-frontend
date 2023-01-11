import React from 'react'
import '../Arena.css'
import {GameNavigation} from './start-game'
import {defaultChessArrangement} from '../chess_arrangement'
import {GameService, HistoryService, MovingService, NavigationService} from '../game/suppliers'
import {AddPiecePanel} from './new-figure'
import {PromotePawnPanel} from './new-figure'
import {HistoryOfMoves} from './history'
import {Board} from './board'
import {King, Piece} from '../game/pieces'

export class Arena extends React.Component<any, any> {
    pieces: Array<Piece>
    gameService: GameService
    kings: Array<Piece>
    movingService: MovingService
    navigationService: NavigationService
    historyService: HistoryService

    constructor(props: any) {
        super(props)

        this.gameService = this.props.gameService
        this.movingService = this.props.movingService
        this.navigationService = this.props.navigationService
        this.historyService = this.props.historyService
        this.navigationService.arena = this
        this.pieces = defaultChessArrangement
        this.kings = this.pieces.filter(piece => piece instanceof King)
        this.state = {
            isMovingPiece: false,
            selectedPiece: '',
            coordinateX: 0,
            coordinateY: 0,
            movingId: '',
            newPieceId: '',
            backgroundColor: 'black'
        }
        this.gameService.arena = this
        this.movingService.arena = this
    }


    setBackgroundColor(color: string) {
        this.setState({backgroundColor: color})
    }

    setMovingPiece(isMoving: boolean, piece: Piece, x: number, y: number, id: string) {
        this.setState({
            isMovingPiece: isMoving,
            selectedPiece: piece,
            movingId: id ? id : '',
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
            this.movingService.setCurrentPiecePosition(newPieceId!, this.state.selectedPiece, this.state.movingId)
        }
    }

    render() {
        return (
            <div className={'content'}
                 onMouseMove={this.editorMouseMoveFigure}
                 onMouseUp={() => this.addNewPieceToField()}
                 style={{backgroundImage: `linear-gradient(#413f3f, ${this.state.backgroundColor})`}}
            >
                {
                    this.state.isMovingPiece ?
                        <img
                            className={'figure'}
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
                            style={{position: 'absolute'}}
                        >
                        </div>
                }
                <GameNavigation
                    gameService={this.gameService}
                    movingService={this.movingService}
                    navigationService={this.navigationService}
                    kings={this.kings}
                />
                <HistoryOfMoves
                    gameService={this.gameService}
                    historyService={this.historyService}
                />
                <div className={'game__arena'}>
                    <AddPiecePanel
                        color={'black'}
                        pieces={this.pieces}
                        gameService={this.gameService}
                        movingService={this.props.movingService}
                    />
                    <Board
                        gameService={this.gameService}
                        movingService={this.props.movingService}
                        navigationService={this.navigationService}
                        pieces={this.pieces}
                        historyService={this.historyService}
                    />
                    <AddPiecePanel
                        color={'white'}
                        pieces={this.pieces}
                        gameService={this.gameService}
                        movingService={this.movingService}
                    />
                    <PromotePawnPanel
                        gameService={this.gameService}
                        arena={this}
                    />
                </div>
            </div>
        )
    }
}

export default Arena