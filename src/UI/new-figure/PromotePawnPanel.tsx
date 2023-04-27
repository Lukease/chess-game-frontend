import React, { useEffect, useState } from 'react'
import { addPieceArrangement } from '../../chess_arrangement'
import { TPromotePawnPanel } from './types/TPromotePawnPanel'
import { Pawn, Piece } from '../../game/pieces'

export function PromotePawnPanel({ gameService, sendPromotion, makeMoveResponse }: TPromotePawnPanel) {
  const [color, setColor] = useState<string>('white')
  const [pieceColumn, setPieceColumn] = useState<number>(0)

  useEffect(() => {
    if (makeMoveResponse) {
      setColor(makeMoveResponse.playerColor)
    }
  }, [makeMoveResponse])

  const selectFigure = (piece: Piece) => {
    sendPromotion(piece.name)
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
