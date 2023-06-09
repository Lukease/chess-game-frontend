import React, { useEffect, useState } from 'react'
import '../../Arena.css'
import { TField } from './types/TField'
import moveSound from '../../audio/move-self.mp3'
import captureSound from '../../audio/capture.mp3'

export function Field({
                        id,
                        piece,
                        color,
                        gameService,
                        onPieceClick,
                        correctMove,
                        makeMove,
                        isCheck,
                        lastMove,
                        handleCopy,
                        location,
                        trashActive,
                        isPositionEditorMode,
                      }: TField) {
  const [isMoving, setIsMoving] = useState<boolean>(false)
  const [isChosen, setChosen] = useState<boolean>(false)
  const [img, setImg] = useState<string>('')
  const [pieceRemoved, setPieceRemoved] = useState(false)

  useEffect(() => {
    piece ? setImg(piece.getImageUrl()) : null
  }, [piece])

  const handleMoveSound = () => {
    if (correctMove) {
      const audio = piece ? new Audio(captureSound) : new Audio(moveSound)
      audio.play()
    }
  }

  const setPiecePosition = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (piece) {
      const parentRect = event.currentTarget.getBoundingClientRect()
      const x: number = event.clientX - parentRect.left - 30
      const y: number = event.clientY - parentRect.top - 30

      setIsMoving(true)
      handleCopy(piece, x, y, true)
    }
  }

  function choosePiece(id: string) {
    onPieceClick(id)
  }

  function clickCorrectField() {
    makeMove(id)
  }

  function removePiece() {
    piece && piece.name !== 'King' && gameService.removePieceFromPositionEditor(piece.id)
      .then(() => setPieceRemoved(true))
  }

  return (
    <div
      className={isChosen || lastMove ? `field  field__${color} field__chosen` : `field  field__${color}`}
      onClick={() => {
        if (location === 'game') {
          choosePiece(id)
          correctMove ? clickCorrectField() : null
          handleMoveSound()
        } else if (location === 'position-editor') {
          if (trashActive) {
            removePiece()
          } else if (!isPositionEditorMode) {
            choosePiece(id)
          }
        }
      }}
      onMouseDown={(event) => location === 'position-editor' && isPositionEditorMode && setPiecePosition(event)}
      id={id}
      style={{ backgroundColor: isCheck ? 'red' : '' }}
    >
      {
        piece ?
          <img
            onClick={() => trashActive && location === 'position-editor' ? removePiece : null}
            className={correctMove ? `figure figure__move-figure` : 'figure'}
            id={id}
            alt={''}
            src={img}
            draggable={false}
            style={{ display: isMoving || (trashActive && pieceRemoved) ? 'none' : 'block' }}
          >
          </img>
          : <div className={correctMove ? `figure figure__move-empty` : 'figure'}></div>
      }
    </div>
  )
}
