import React, { useEffect, useState } from 'react'
import '../../Arena.css'
import { TField } from './types/TField'
import moveSound from '../../audio/move-self.mp3'
import captureSound from '../../audio/capture.mp3'

export function Field({
                        id,
                        piece,
                        color,
                        onPieceClick,
                        correctMove,
                        makeMove,
                        isCheck,
                        lastMove,
                        handleCopy,
                        location,
                        trashActive,
                        isPositionEditorMode,
                        positionEditorService,
                        isChosen
                      }: TField) {
  const [isMoving, setIsMoving] = useState<boolean>(false)
  const [img, setImg] = useState<string>('')
  const [pieceRemoved, setPieceRemoved] = useState(false)

  useEffect(() => {
    setImg(piece ? piece.getImageUrl() : '')
    setPieceRemoved(false)
  }, [piece])

  const handleMoveSound = () => {
    if (correctMove) {
      const audio = piece ? new Audio(captureSound) : new Audio(moveSound)
      audio.play()
    }
  }

  const setPiecePosition = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (piece) {
      const x: number = event.clientX - 30
      const y: number = event.clientY - 30

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
    if (piece && piece.name !== 'King') {
      positionEditorService.removePieceFromPositionEditor(piece.id).then(() => setPieceRemoved(true))
    }
  }

  const handleFieldClick = () => {
    if (location === 'game') {
      choosePiece(id)
      if (correctMove) {
        clickCorrectField()
        handleMoveSound()
      }
    } else if (location === 'position-editor') {
      if (trashActive) {
        removePiece()
      } else if (!isPositionEditorMode) {
        choosePiece(id)
      }
    }
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (location === 'position-editor' && isPositionEditorMode) {
      setPiecePosition(event)
    }
  }

  return (
    <div
      className={isChosen || lastMove ? `field  field__${color} field__chosen` : `field  field__${color}`}
      onClick={() => handleFieldClick()}
      onMouseDown={handleMouseDown}
      id={id}
      style={{ backgroundColor: isCheck ? 'red' : '' }}
    >
      {piece ? (
        <img
          onClick={() => (trashActive && location === 'position-editor' ? removePiece() : null)}
          className={correctMove ? `figure figure__move-figure` : 'figure'}
          id={id}
          alt=''
          src={img}
          draggable={false}
          style={{ display: isMoving || pieceRemoved ? 'none' : 'block' }}
        />
      ) : (
        <div className={correctMove ? `figure figure__move-empty` : 'figure'}></div>
      )}
    </div>
  )
}

