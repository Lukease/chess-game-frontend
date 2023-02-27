import React, {useContext, useState} from 'react'
import {addPieceArrangement} from '../../chess_arrangement'
import {Pawn, Piece} from '../../game/pieces'
import {GameServiceContext} from '../context/Context'

export function PromotePawnPanel() {
    const gameService = useContext(GameServiceContext)
    const [color, setColor] = useState<string>('white')
    const [pieceColumn, setPieceColumn] = useState<number>(0)
    const [isPawnPromotionDisplayed, setPawnPromotionDisplayed] = useState<boolean>(false)

    const renderPawnPromotion = (display: boolean) => {
        setPawnPromotionDisplayed(display)
    }

    const selectFigure = (piece: Piece) => {
        gameService.setPromotedFigureToField(piece)
        renderPawnPromotion(false)
    }

    const setColorOfPieces = (pieceColor: string, columnNumber: number) => {
        setColor(pieceColor)
        setPieceColumn(columnNumber)
        setPawnPromotionDisplayed(true)
    }

    const renderFigure = () => {
        return (
            addPieceArrangement(color).filter(piece => !(piece instanceof Pawn)).map((piece, index) => {

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

                            onClick={() => selectFigure(piece)}
                        >
                        </img>
                    </div>
                )
            })
        )
    }

    return (
        <div
            className={'select__promotion'}
            style={{
                display: isPawnPromotionDisplayed ? 'flex' : 'none',
                backgroundColor: color === 'white' ? 'black' : '#837676',
                right: pieceColumn > 4 ? '0' : '360px'
            }}
        >
            {
                renderFigure()
            }
        </div>
    )
}
