import React from 'react'
import { addPieceArrangement } from '../../chess_arrangement'
import { TAddPiecePanel } from './types/TAddPiecePanel'
import trash from '../../icons/garbage-trash-svgrepo-com.svg'
import hand from '../../icons/cursor-hand-icon.svg'
import { Piece } from '../../game/pieces'

export function AddPiecePanel({
                                color,
                                trashActive,
                                setTrashActive,
                                handleCopy,
                                setMode,
                                isPositionEditorMode,
                              }: TAddPiecePanel) {

  const renderPieces = () => {
    const output: Array<JSX.Element> = addPieceArrangement(color).map((piece, index) => {
      return (
        <div className={'field'} key={index} onMouseDown={(event) => selectPiece(event, piece)}>
          <img
            className={'figure'}
            src={piece.getImageUrl()}
            key={index}
            alt={''}
            draggable={false}
          >
          </img>
        </div>
      )
    })

    return output
  }

  const selectPiece = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, piece: Piece) => {
    const parentRect = event.currentTarget.getBoundingClientRect()
    const x: number = event.clientX - parentRect.left - 30
    const y: number = event.clientY - parentRect.top - 30

    setTrashActive(true)
    setMode(true)
    handleCopy(piece, x, y, false)
  }

  return (
    <div className={'panel'}>
      <div className={'field'}></div>
      <div className={'panel__add'}>
        <div
          style={{ backgroundColor: isPositionEditorMode ? `greenyellow` : `` }}
          onClick={() => {
            setMode(isPositionEditorMode)
            setTrashActive(true)
          }}
        >
          <img
            className={'figure'}
            src={hand}
            alt={''}
          />
        </div>
        {
          renderPieces()
        }
        <div
          style={{ backgroundColor: trashActive ? `firebrick` : `` }}
          onClick={() => {
            setMode(true)
            setTrashActive(trashActive)
          }}
        >
          <img
            className={'figure'}
            src={trash}
            alt={''}
          />
        </div>
      </div>
      <div className={'field'}></div>
    </div>
  )
}