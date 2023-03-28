import React, { useEffect, useState } from 'react'
import '../../Arena.css'
import { Piece } from '../../game/pieces'
import { TField } from './types/TField'

export function Field({ id, selectedPiece, color, gameService, movingService }: TField) {
  const [piece, setPiece] = useState<Piece | undefined>(undefined)
  const [isCheck, setCheck] = useState<boolean>(false)
  const [isChosen, setChosen] = useState<boolean>(false)
  const [correctMove, setCorrectMove] = useState<boolean>(false)
  const [imageLoaded, setImageLoaded] = useState<boolean>(false)
  const [isMoving, setIsMoving] = useState<boolean>(false)
  const [isGameStarted, setGameStarted] = useState<boolean>(false)
  const [img, setImg] = useState<string>('')
  const [isTrashActive, setTrashActive] = useState<boolean>(false)


  useEffect(() => {
    if (selectedPiece) {
      setPiece(selectedPiece)
      setImg(selectedPiece.getImageUrl())
    } else {
      setPiece(undefined)
      setImg('')
    }
  }, [])

  const setPiecePosition = (piece: Piece, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (piece) {
      const coordinateX = event.clientX
      const coordinateY = event.clientY

      document.body.style.cursor = 'none'
      movingService.movePiece(piece, coordinateX, coordinateY, id, true)
    }
  }

  return (
    <div
      className={isChosen ? `field  field__${color} field__chosen` : `field  field__${color}`}
      onClick={() => {
        // gameService.fieldClick()
      }}
      // onMouseDown={event => isGameStarted || isTrashActive ? '' : setPiecePosition(this!, event)}
      id={id}
      style={{ backgroundColor: isCheck ? 'red' : '' }}
    >
      {piece ?

        <img
          className={correctMove ? `figure figure__move-figure` : 'figure'}
          id={id}
          alt={''}
          src={img}
          draggable={false}
          style={{ display: isMoving ? 'none' : 'block' }}

          // onMouseDown={event => moveFigure(event,props.className,props.id)}
          // onMouseMove={event => mouseMoveFigure(event)}
          // onMouseUp={event => moveChess(event)}
        >

        </img>
        : <div
          className={correctMove ? `figure figure__move-empty` : 'figure'}
        ></div>
      }
    </div>
  )

}
