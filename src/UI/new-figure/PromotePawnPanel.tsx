import React, { useContext, useEffect, useState } from 'react'
import { addPieceArrangement } from '../../chess_arrangement'
import { TPromotePawnPanel } from './types/TPromotePawnPanel'
import { ContextGame } from '../context/context'
import { TPlayerGame } from '../../backend-service-connector/model/rest/game/dto/TPlayerGame'
import { Pawn, Piece } from '../../game/pieces'

export function PromotePawnPanel({ gameServiceBackend }: TPromotePawnPanel) {
    const gameService = useContext(ContextGame)
    const [color, setColor] = useState<string>('white')
    const [pieceColumn, setPieceColumn] = useState<number>(0)
    const [isPawnPromotionDisplayed, setPawnPromotionDisplayed] = useState<boolean>(false)

    // useEffect(() => {
    //     const player = gameServiceBackend.getGameFromLocalStorage()
    //     const playerColor = player? player.pieceColor : 'white'
    //
    //     setColor(playerColor)
    // }, [])

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
                      // src={piece.getImageUrl()}
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
            right: pieceColumn > 4 ? '0' : '360px',
        }}
      >
          {
              renderFigure()
          }
      </div>
    )
}
