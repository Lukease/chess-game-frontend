import React, { useState } from 'react'
import '../../Arena.css'
import { GameNavigation } from '../start-game'
import { HistoryOfMoves } from '../history'
import { Board } from '../board'
import { Piece } from '../../game/pieces'
import { TArena } from './types/TArena'
import { AddPiecePanel } from '../new-figure/AddPiecePanel'
import { PromotePawnPanel } from '../new-figure/PromotePawnPanel'
import { GameInfo } from '../game-info/GameInfo'
import { MakeMoveRequest } from '../../backend-service-connector/model/rest/game/MakeMoveRequest'

export function Arena({ movingService, navigationService, historyService, gameServiceBackend }: TArena) {
  const [isMovingPiece, setMovingPiece] = useState(false)
  const [selectedPiece, setSelectedPiece] = useState<Piece | undefined>(undefined)
  const [coordinateX, setCoordinateX] = useState<number>(0)
  const [coordinateY, setCoordinateY] = useState<number>(0)
  const [movingId, setMovingId] = useState<string>('')
  const [newPieceId, setNewPieceId] = useState<string>('')
  const [backgroundColor, setBackgroundColor] = useState<string>('')
  const [makeMoveRequest, setMakeMoveRequest] = useState<MakeMoveRequest | undefined>(undefined)
  const [promotedPieceName, setPromotedPieceName] = useState<string>('')

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

  const makePromotion = (promotedPieceName: string) => {
    if (!makeMoveRequest) return
    gameServiceBackend.makeMove({
      pieceFromId: makeMoveRequest.pieceFromId,
      fieldToId: makeMoveRequest.fieldToId,
      promotedPieceName: promotedPieceName,
    }).then(r => console.log(r))
  }

  return (
    <div className={'content'}
         onMouseMove={editorMouseMoveFigure}
         onMouseUp={() => addNewPieceToField()}
         style={{ backgroundImage: `linear-gradient(#413f3f, ${backgroundColor})` }}
    >
      <GameNavigation
        movingService={movingService}
        navigationService={navigationService}
        gameServiceBackend={gameServiceBackend}
      />
      <HistoryOfMoves gameServiceBackend={gameServiceBackend} />
      <div className={'game__arena'}>
        <AddPiecePanel
          color={'black'}
          movingService={movingService}
        />
        <Board
          movingService={movingService}
          gameServiceBackend={gameServiceBackend}
          navigationService={navigationService}
          historyService={historyService}
          isPawnPromotion={setMakeMoveRequest}
        />
        <AddPiecePanel
          color={'white'}
          movingService={movingService}
        />
        {
          makeMoveRequest ?
            <PromotePawnPanel gameServiceBackend={gameServiceBackend} sendPromotion={makePromotion} />
            : null
        }
      </div>
      <GameInfo gameServiceBackend={gameServiceBackend}></GameInfo>
    </div>
  )
}

export default Arena