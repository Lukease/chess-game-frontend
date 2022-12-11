import React from 'react'
import {Piece} from '../chess-possible-move'
import {addPieceArrangement} from '../../chess_arrangement/add-Piece-arrangement'
import {GameService} from '../suppliers/game-service'

export class AddPiecePanel extends React.Component<any, any> {
    color: string
    pieces: Array<Piece>
    addNewPiece: Array<Piece>
    gameService: GameService

    constructor(props: any) {
        super(props)

        this.gameService = props.gameService
        this.pieces = props.pieces
        this.color = this.props.color
        this.addNewPiece = addPieceArrangement(this.color)
        this.state = {
            isTrashActive: false,
            isPositionEditorDisplayed: false,
            isMoving: false,
            coordinateX: 0,
            coordinateY: 0,
            selectedPiece: undefined
        }
        this.gameService.addPiecePanels = this.gameService.addPiecePanels.concat(this)
    }


    isDeleteIconActive = (isFromOtherService: boolean) => {
        const isActive: boolean = this.state.isTrashActive

        this.setState({isTrashActive: !isActive})

        if (!isFromOtherService) {
            this.gameService.setTrashActive(!isActive)
        }
    }

    isPositionEditorDisplayed = () => {
        const isDisplayed = this.gameService.isPositionEditorDisplayed

        this.setState({isPositionEditorDisplayed: isDisplayed})
    }

    selectPiece = (piece: Piece, event: any) => {
        this.setMoving(true)
        this.setCoordinate(event)
        this.setState({selectedPiece: piece})
    }

    setCoordinate = (event: any) => {
        if (this.state.isMoving) {
            this.setState({coordinateX: event.screenX - 50, coordinateY: event.screenY - 30})

            console.log(this.state.coordinateX, this.state.coordinateY)
        }
    }

    setMoving(isMoving: boolean) {
        this.setState({isMoving: isMoving})
    }

    removePiece() {
        this.setMoving(false)
    }

    renderPieces() {
        let output: Array<JSX.Element> = this.addNewPiece.map((piece, index) => {

            return (
                <img
                    className={'figure'}
                    src={piece.getImageUrl()}
                    key={index}
                    alt={''}

                    onMouseDown={event => this.selectPiece(piece, event)}
                    onMouseMove={() => this.setCoordinate}
                    onMouseUp={() => this.removePiece}
                >
                </img>
            )

        })

        return output
    }

    render() {
        return (
            <div
                className={'game__add-figure'}
                style={{display: this.state.isPositionEditorDisplayed ? `flex` : `none`}}
                onChange={this.isPositionEditorDisplayed}
            >
                {
                    this.renderPieces()
                }
                <button
                    className={'content__trash'}
                    style={{backgroundColor: this.state.isTrashActive ? `firebrick` : ``}}
                    onClick={() => this.isDeleteIconActive(false)}
                    id={'trashIcon'}
                >
                </button>
            </div>
        )
    }

}