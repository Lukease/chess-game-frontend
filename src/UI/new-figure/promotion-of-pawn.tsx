import React from 'react'
import {addPieceArrangement} from '../../chess_arrangement'
import {Pawn, Piece} from '../../game/pieces'
import {GameService} from '../../game/suppliers'

export class PromotePawnPanel extends React.Component<any, any> {
    gameService: GameService

    constructor(props: any) {
        super(props)

        this.gameService = props.gameService
        this.state = {
            color: 'white',
            pieceColumn: 0,
            isPawnPromotionDisplayed: false
        }
        this.gameService.promotePawnPanel = this
    }

    renderPawnPromotion(display: boolean) {
        this.setState({
            isPawnPromotionDisplayed: display
        })
    }

    selectFigure(piece: Piece) {
        this.gameService.setPromotedFigureToField(piece)
        this.renderPawnPromotion(false)
        this.gameService.setPawnPromotionDisplayed(false)
    }

    setColorOfPieces(pieceColor: string, columnNumber: number,) {
        this.setState({
            color: pieceColor,
            pieceColumn: columnNumber
        })
    }

    renderFigure() {
        return (
            addPieceArrangement(this.state.color).filter(piece => !(piece instanceof Pawn)).map((piece, index) => {

                return (
                    <div
                        className={'field'}
                        key={index}
                    >
                        <img
                            className={'figure'}
                            src={piece.getImageUrl()}
                            key={index}
                            alt={''}

                            onClick={() => this.selectFigure(piece)}
                        >
                        </img>
                    </div>
                )
            })
        )
    }

    render() {
        return (
            <div
                className={'select__promotion'}
                style={{
                    display: this.state.isPawnPromotionDisplayed ? 'flex' : 'none',
                    backgroundColor: this.state.color === 'white' ? 'black' : '#837676',
                    right: this.state.pieceColumn > 4 ? '0' : '360px'
                }}
            >
                {this.renderFigure()}
            </div>
        )
    }
}
