import React, { useEffect, useState } from 'react'
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
import { MakeMoveResponse } from '../../backend-service-connector/model/rest/game/MakeMoveResponse'

export function Arena({ movingService, navigationService, historyService, gameService: gameService }: TArena) {
  const [isMovingPiece, setMovingPiece] = useState(false)
  const [selectedPiece, setSelectedPiece] = useState<Piece | undefined>(undefined)
  const [coordinateX, setCoordinateX] = useState<number>(0)
  const [coordinateY, setCoordinateY] = useState<number>(0)
  const [movingId, setMovingId] = useState<string>('')
  const [newPieceId, setNewPieceId] = useState<string>('')
  const [backgroundColor, setBackgroundColor] = useState<string>('')
  const [makeMoveRequest, setMakeMoveRequest] = useState<MakeMoveRequest | undefined>(undefined)
  const [promotedPieceName, setPromotedPieceName] = useState<string>('')
  const [gameInfo, setGameInfo] = useState<MakeMoveResponse | undefined>(undefined)


  useEffect(() => {
    const setGameState = (response: MakeMoveResponse | undefined) => {
      if (response) {
        setGameInfo(response)
      }
    }

    gameService.getActiveGameAndReturnMoves().then(setGameState)
    const intervalId = setInterval(() => {
      gameService.getActiveGameAndReturnMoves().then(setGameState)
    }, 5000)

    return () => clearInterval(intervalId)
  }, [gameService])

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
    gameService.makeMove({
      pieceFromId: makeMoveRequest.pieceFromId,
      fieldToId: makeMoveRequest.fieldToId,
      promotedPieceName: promotedPieceName,
    }).then(r => console.log(r))
  }

  return (
    <div className={'charts'}
         onMouseMove={editorMouseMoveFigure}
         onMouseUp={() => addNewPieceToField()}
         style={{ backgroundImage: `linear-gradient(#413f3f, ${backgroundColor})` }}
    >
      <GameNavigation movingService={movingService} navigationService={navigationService} gameService={gameService} />
      <HistoryOfMoves gameService={gameService} makeMoveResponse={gameInfo}/>
      <div className={'game__arena'}>
        <AddPiecePanel color={'black'} movingService={movingService} makeMoveResponse={gameInfo} />
        <Board
          movingService={movingService}
          gameService={gameService}
          navigationService={navigationService}
          historyService={historyService}
          isPawnPromotion={setMakeMoveRequest}
          makeMoveResponse={gameInfo}
        />
        <AddPiecePanel color={'white'} movingService={movingService} makeMoveResponse={gameInfo} />
        {
          makeMoveRequest ?
            <PromotePawnPanel gameService={gameService} sendPromotion={makePromotion} makeMoveResponse={gameInfo} />
            : null
        }
      </div>
      <GameInfo gameService={gameService} makeMoveResponse={gameInfo}></GameInfo>
    </div>
  )
}

export default Arena