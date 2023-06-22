import React, { useEffect, useState } from 'react'
import { addPieceArrangement } from '../../chess_arrangement'
import { TPromotePawnPanel } from './types/TPromotePawnPanel'
import { createPieceInstance, Pawn, Piece } from '../../game/pieces'

export function PromotePawnPanel({ sendPromotion, makeMoveResponse, fieldToId }: TPromotePawnPanel) {
  const [color, setColor] = useState<string>('white')
  const [pieceColumn, setPieceColumn] = useState<number>(0)

  useEffect(() => {
    if (makeMoveResponse?.playerColor) {
      const column = parseInt(fieldToId.charAt(1))

      setColor(makeMoveResponse.playerColor)
      setPieceColumn(column)
    }
  }, [makeMoveResponse])

  const selectFigure = (piece: Piece) => {
    sendPromotion(piece.name)
  }

  const renderFigure = () => {
    return (
      addPieceArrangement(color)
        .filter(piece => !(piece instanceof Pawn))
        .map((figure, index) => {
        const piece = createPieceInstance(figure)
        return (
          <div className={'field'} key={index}>
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
      style={{ backgroundColor: color === 'white' ? 'black' : '#837676', right: pieceColumn > 4 ? '0' : '360px' }}>
      {renderFigure()}
    </div>
  )
}