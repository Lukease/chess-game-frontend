import React, { useState } from 'react'
import '../../Arena.css'
import { GameNavigation } from '../start-game'
import { HistoryOfMoves } from '../history'
import { Board } from '../board'
import { Piece } from '../../game/pieces'
import { TArena } from './types/TArena'
import { AddPiecePanel } from '../new-figure/AddPiecePanel'
import { PromotePawnPanel } from '../new-figure/PromotePawnPanel'

export function Arena({ gameService, movingService, navigationService, historyService, gameServiceBackend }: TArena) {
  const [isMovingPiece, setMovingPiece] = useState(false)
  const [selectedPiece, setSelectedPiece] = useState<Piece | undefined>(undefined)
  const [coordinateX, setCoordinateX] = useState<number>(0)
  const [coordinateY, setCoordinateY] = useState<number>(0)
  const [movingId, setMovingId] = useState<string>('')
  const [newPieceId, setNewPieceId] = useState<string>('')
  const [backgroundColor, setBackgroundColor] = useState<string>('')

  const addNewPiecePiece = (isMoving: boolean, piece: Piece, x: number, y: number, id: string) => {
    const setId = id ? id : ''

    setMovingPiece(isMoving)
    setSelectedPiece(piece)
    setMovingId(setId)
    setCoordinateX(x - 30)
    setCoordinateY(y - 30)
  }

  const editorMouseMoveFigure = (event: any) => {
    if (isMovingPiece) {
      const x: number = event.clientX - 30
      const y: number = event.clientY - 30

      setCoordinateX(x)
      setCoordinateY(y)
    }
  }

  const addNewPieceToField = () => {
    if (isMovingPiece) {
      setMovingPiece(false)
      document.body.style.cursor = 'auto'

      let newPieceId: string
      const mouseUpTarget = document.elementsFromPoint(coordinateX, coordinateY)

      mouseUpTarget.forEach(element => {
        if (element.id !== '' && element.id !== 'root') {
          setNewPieceId(element.id)
          newPieceId = element.id
        }
      })
      movingService.setCurrentPiecePosition(newPieceId!, selectedPiece!, movingId)
    }
  }


  return (
    <div className={'content'}
         onMouseMove={editorMouseMoveFigure}
         onMouseUp={() => addNewPieceToField()}
         style={{ backgroundImage: `linear-gradient(#413f3f, ${backgroundColor})` }}
    >
      {
        isMovingPiece ?
          <img
            className={'figure'}
            style={
              {
                left: isMovingPiece ? `${coordinateX}px` : '',
                top: isMovingPiece ? `${coordinateY}px` : '',
                position: 'absolute',
                display: isMovingPiece ? 'flex' : 'none',
              }
            }
            src={selectedPiece!.getImageUrl()}
            alt={''}
            draggable={false}
          >

          </img> :
          <div
            style={{ position: 'absolute' }}
          >
          </div>
      }
      <GameNavigation
        gameService={gameService}
        movingService={movingService}
        navigationService={navigationService}
      />
      <HistoryOfMoves
        gameService={gameService}
        historyService={historyService}
      />
      <div className={'game__arena'}>
        <AddPiecePanel
          color={'black'}
          gameService={gameService}
          movingService={movingService}
        />
        <Board
          gameService={gameService}
          movingService={movingService}
          gameServiceBackend={gameServiceBackend}
          navigationService={navigationService}
          historyService={historyService}
        />
        <AddPiecePanel
          color={'white'}
          gameService={gameService}
          movingService={movingService}
        />
        <PromotePawnPanel gameServiceBackend={gameServiceBackend} />
      </div>
    </div>
  )
}

export default Arena