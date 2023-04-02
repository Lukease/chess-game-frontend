import React, { useEffect, useState } from 'react'
import '../../Arena.css'
import { Piece } from '../../game/pieces'
import { TField } from './types/TField'
import blackQueen from '../../chess_icon/black-Queen.svg'
import whiteQueen from '../../chess_icon/white-Queen.svg'
import blackKing from '../../chess_icon/black-King.svg'
import whiteKing from '../../chess_icon/white-King.svg'
import blackKnight from '../../chess_icon/black-Knight.svg'
import whiteKnight from '../../chess_icon/white-Knight.svg'
import blackBishop from '../../chess_icon/black-Bishop.svg'
import whiteBishop from '../../chess_icon/white-Bishop.svg'
import blackRook from '../../chess_icon/black-Rook.svg'
import whiteRook from '../../chess_icon/white-Rook.svg'
import blackPawn from '../../chess_icon/black-Pawn.svg'
import whitePawn from '../../chess_icon/white-Pawn.svg'

export function Field({ id, piece, color, gameServiceBackend, movingService, onPieceClick, isChosen,makeMove }: TField) {
  const [isCheck, setCheck] = useState<boolean>(false)
  const [correctMove, setCorrectMove] = useState<boolean>(false)
  const [imageLoaded, setImageLoaded] = useState<boolean>(false)
  const [isMoving, setIsMoving] = useState<boolean>(false)
  const [isGameStarted, setGameStarted] = useState<boolean>(false)
  const [img, setImg] = useState<string>('')
  const [isTrashActive, setTrashActive] = useState<boolean>(false)

  useEffect(() => {
    const pieceImg = piece ? setImage(piece) : ''

    setImg(pieceImg)
  }, [piece])

  const setImage = (piece: Piece) => {
    switch (piece.name) {
      case 'Pawn':
        return piece.color === 'white' ? whitePawn : blackPawn
      case 'Knight':
        return piece.color === 'white' ? whiteKnight : blackKnight
      case 'Bishop':
        return piece.color === 'white' ? whiteBishop : blackBishop
      case 'Rook':
        return piece.color === 'white' ? whiteRook : blackRook
      case 'Queen':
        return piece.color === 'white' ? whiteQueen : blackQueen
      case 'King':
        return piece.color === 'white' ? whiteKing : blackKing
      default:
        return ''
    }
  }

  const setPiecePosition = (piece: Piece, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (piece) {
      const coordinateX = event.clientX
      const coordinateY = event.clientY

      document.body.style.cursor = 'none'
      movingService.movePiece(piece, coordinateX, coordinateY, id, true)
    }
  }

  function choosePiece(id: string) {
    onPieceClick(id)
  }

  function clickCorrectField() {
    makeMove(id)
  }

  return (
    <div
      className={isChosen ? `field  field__${color} field__chosen` : `field  field__${color}`}
      onClick={() => {
        choosePiece(id)
        isChosen ? clickCorrectField() : null
      }}
      // onMouseDown={event => isGameStarted || isTrashActive ? '' : setPiecePosition(this!, event)}
      id={id}
      style={{ backgroundColor: isCheck ? 'red' : '' }}
    >
      {
        piece ?
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
