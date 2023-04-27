import React, { useEffect, useState } from 'react'
import { addPieceArrangement } from '../../chess_arrangement'
import { Piece } from '../../game/pieces'
import { TAddPiecePanel } from './types/TAddPiecePanel'

export function AddPiecePanel({ color, movingService, makeMoveResponse }: TAddPiecePanel) {
  const [isTrashActive, setTrashActive] = useState(false)
  const [isPositionEditorDisplayed, setPositionEditorDisplayed] = useState(false)
  const [coordinateX, setCoordinateX] = useState(0)
  const [coordinateY, setCoordinateY] = useState(0)
  const [addNewPiece, setNewPiece] = useState<Array<Piece>>([])
  const [isMoving, setMoving] = useState(false)

  useEffect(() => {
    if (makeMoveResponse) {
      const pieces = addPieceArrangement(makeMoveResponse.playerColor)

      setNewPiece(pieces)
    }
  }, [makeMoveResponse])


  const isDeleteIconActive = (isFromOtherService: boolean) => {
    const isActive: boolean = isTrashActive

    setTrashActive(!isActive)

    if (!isFromOtherService) {
      // gameService.setTrashActive(!isActive)
    }
  }

  const togglePositionEditorDisplayed = () => {
    // const isDisplayed = gameService.isPositionEditorDisplayed

    // setPositionEditorDisplayed(isDisplayed)
  }

  const selectPiece = (piece: Piece, event: any) => {
    const coordinateX = event.clientX
    const coordinateY = event.clientY
    setMoving(true)
    setCoordinate(event)

    document.body.style.cursor = 'none'
    movingService.movePiece(piece, coordinateX, coordinateY, '', false)
  }

  const setCoordinate = (event: any) => {
    setCoordinateX(event.screenX - 50)
    setCoordinateY(event.screenY - 30)
  }

  const removePiece = () => {
    setMoving(false)
  }

  const renderPieces = () => {
    const output: Array<JSX.Element> = addNewPiece.map((piece, index) => {

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
            onMouseDown={event => isTrashActive ? '' : selectPiece(piece, event)}
          >
          </img>
        </div>
      )
    })

    return output
  }

  return (
    <div
      className={'panel'}
      style={{ display: isPositionEditorDisplayed ? `flex` : `none` }}
      onChange={() => togglePositionEditorDisplayed()}
    >
      <div className={'field'}
      ></div>
      <div className={'panel__add'}>
        {
          renderPieces()
        }
        <div
          className={'content__trash'}
          style={{ backgroundColor: isTrashActive ? `firebrick` : `` }}
          onClick={() => isDeleteIconActive(false)}
          id={'trashIcon'}
        >
        </div>
      </div>
      <div className={'field'}
      ></div>
    </div>
  )
}