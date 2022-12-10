import React from 'react'
import {Piece} from '../chess-possible-move'
import {addPieceArrangement} from '../../chess_arrangement/add-Piece-arrangement'
import {GameService} from '../suppliers/game-service'
import {addNewFigure} from '../game/move-figure'

export class AddPiecePanel extends React.Component<any, any> {
    color: string
    pieces: Array<Piece>
    addNewPiece: Array<Piece>
    gameService: GameService
    selectedPiece: Piece | undefined

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
        this.setState({isMoving: true})
        this.setCoordinate(event)
        this.selectedPiece = piece


    }

    setCoordinate= (event :any) => {
        this.setState({coordinateX: event.clientX - 50, coordinateY: event.clientY - 30})
        console.log(this.state.coordinateX, this.state.coordinateY)
    }

    renderPieces() {
        let output: Array<JSX.Element> = this.addNewPiece.map((piece, index) => {

            return (
                <img
                    className={'figure'}
                    src={piece.getImageUrl()}
                    key={index}
                    alt={''}

                    // onMouseDown={this.selectPiece.bind(piece)}
                    onMouseMove={this.setCoordinate.bind}
                    onMouseUp={event => addNewFigure(event, piece.name)}
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
            {/*    {*/}
            {/*    this.state.isMoving ?*/}
            {/*        <img*/}
            {/*            className={'figure'}*/}
            {/*            style={*/}
            {/*                {*/}
            {/*                    left: this.state.isMoving ? `${this.state.coordinateX}px` : '',*/}
            {/*                    top: this.state.isMoving ? `${this.state.coordinateY}px` : '',*/}
            {/*                    display: this.state.isMoving ? 'flex' : 'none'*/}
            {/*                }*/}
            {/*            }*/}
            {/*            src={this.state.piece.getImageUrl()}*/}
            {/*            alt={''}*/}
            {/*        >*/}

            {/*        </img> : <div></div>*/}
            {/*}*/}
                <button
                    className={'navigation__trash'}
                    style={{backgroundColor: this.state.isTrashActive ? `firebrick` : ``}}
                    onClick={() => this.isDeleteIconActive(false)}
                    id={'trashIcon'}
                >
                </button>
            </div>
        )
    }

}