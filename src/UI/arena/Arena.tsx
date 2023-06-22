import React, { useEffect, useState } from 'react'
import '../../Arena.css'
import { GameNavigation } from '../start-game'
import { HistoryOfMoves } from '../history'
import { Board } from '../board'
import { createPieceInstance, Piece } from '../../game/pieces'
import { TArena } from './types/TArena'
import { AddPiecePanel } from '../new-figure/AddPiecePanel'
import { PromotePawnPanel } from '../new-figure/PromotePawnPanel'
import { GameInfo } from '../game-info/GameInfo'
import { MakeMoveRequest } from '../../backend-service-connector/model/rest/game/MakeMoveRequest'
import { MakeMoveResponse } from '../../backend-service-connector/model/rest/game/MakeMoveResponse'
import { GoBackNav } from '../navigation/GoBackNav'
import { NewPosition } from '../../backend-service-connector/model/rest/game/NewPosition'
import { PositionEditorInfo } from '../../backend-service-connector/model/rest/game/PositionEditorInfo'
import { MovedPiece } from './MovedPiece'
import { NewFen } from './NewFen'

export function Arena({ historyService, gameService, positionEditorService }: TArena) {
  const [selectedPiece, setSelectedPiece] = useState<Piece | undefined>(undefined)
  const [coordinateX, setCoordinateX] = useState<number>(0)
  const [coordinateY, setCoordinateY] = useState<number>(0)
  const [makeMoveRequest, setMakeMoveRequest] = useState<MakeMoveRequest | undefined>(undefined)
  const [gameInfo, setGameInfo] = useState<MakeMoveResponse | undefined>()
  const [isTrashActive, setTrashActive] = useState(false)
  const [location, setLocation] = useState<string>('')
  const [isMoving, setIsMoving] = useState(false)
  const [isFromBoard, setIsFromBoard] = useState(false)
  const [isPositionEditorMode, setPositionEditorMode] = useState(false)
  const [moveId, setMoveId] = useState<number>(0)

  useEffect(() => {
    const currentURL = window.location.href
    const path = currentURL.split('/')
    const location = path[path.length - 1]

    setLocation(location)

    const fetchData = async () => {
      try {
        let response

        if (currentURL.includes('game')) {
          response = await gameService.getActiveGameAndReturnMoves()
        } else if (currentURL.includes('position-editor')) {
          response = await positionEditorService.getCurrentPositionEditorPieces()
        } else if (currentURL.includes('history')) {
          response = await historyService.getHistoryOfGame(moveId)
        }

        if (response) {
          const transformedResponse: MakeMoveResponse = {
            pieces: response.pieces.map((pieceData: Piece) => createPieceInstance(pieceData)),
            kingIsChecked: response.kingIsChecked,
            gameInfo: response.gameInfo,
            fieldFromTo: response.fieldFromTo,
          }

          setGameInfo(transformedResponse)
        }
      } catch (error) {
        window.location.href = 'http://localhost:3000/new-game'
      }
    }

    fetchData()

    const intervalId = setInterval(fetchData, 5000)

    return () => clearInterval(intervalId)
  }, [gameService, historyService, location, moveId, positionEditorService])


  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isMoving) {
      const parentRect = event.currentTarget.getBoundingClientRect()
      const x: number = event.clientX - parentRect.left - 30
      const y: number = event.clientY - parentRect.top - 30

      document.body.style.cursor = 'none'
      setCoordinateX(x)
      setCoordinateY(y)
    }
  }

  const handleMouseUp = () => {
    if (isMoving) {
      setIsMoving(false)
      document.body.style.cursor = 'auto'
      const mouseUpTarget = document.elementsFromPoint(coordinateX + 30, coordinateY + 30)
      const newPieceId = mouseUpTarget.find(element => element.id !== '' && element.id !== 'root')?.id

      if (newPieceId && selectedPiece) {
        const newPiecePosition: NewPosition = {
          piece: selectedPiece,
          newId: newPieceId,
          isFromBoard: isFromBoard,
        }

        positionEditorService.ChangePositionOfPieceFromPositionEditor(newPiecePosition).then(r => {
          r.pieces = r.pieces.map((pieceData: Piece) => {
            return createPieceInstance(pieceData)
          })
          setGameInfo(r)
        })
      }
    }
  }

  const handleCopy = (copiedPiece: Piece, x: number, y: number, pieceFromBoard: boolean) => {
    setCoordinateX(x)
    setCoordinateY(y)
    setIsMoving(true)
    setSelectedPiece(copiedPiece)
    setIsFromBoard(pieceFromBoard)
  }

  const makePromotion = (promotedPieceName: string) => {
    if (!makeMoveRequest) return
    gameService.makeMove({
      pieceFromId: makeMoveRequest.pieceFromId,
      fieldToId: makeMoveRequest.fieldToId,
      promotedPieceName: promotedPieceName,
    }).then(r => console.log(r))
  }

  const toggleTrash = (isActive: boolean) => {
    setTrashActive(!isActive)
  }

  const toggleMode = (isEditorMode: boolean) => {
    setPositionEditorMode(!isEditorMode)
  }

  function setDefaultChessPosition() {
    positionEditorService.getDefaultPositionEditorPieces().then(newPositionEditorState => {
      newPositionEditorState.pieces = newPositionEditorState.pieces.map((pieceData: Piece) => {
        return createPieceInstance(pieceData)
      })
      window.location.reload()
      setGameInfo(newPositionEditorState)
    })
  }

  function handleNewPieces(newFenInfo: PositionEditorInfo) {
    newFenInfo.pieces = newFenInfo.pieces.map((pieceData: Piece) => {
      return createPieceInstance(pieceData)
    })
    setGameInfo(newFenInfo)
  }

  return (
    <div className={'game-content'} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      {isMoving && selectedPiece &&
        <MovedPiece selectedPiece={selectedPiece} coordinateY={coordinateY} coordinateX={coordinateX} />}
      {location !== 'game' && <GoBackNav defaultChessPosition={setDefaultChessPosition} />}
      {location === 'game' && (
        <>
          <GameNavigation gameService={gameService} />
          <GameInfo currentGame={gameInfo} />
        </>
      )}
      <div className={'game__arena'}>
        {location === 'position-editor' && (
          <AddPiecePanel color={'black'} trashActive={isTrashActive}
                         setTrashActive={toggleTrash} handleCopy={handleCopy} setMode={toggleMode}
                         isPositionEditorMode={isPositionEditorMode} />
        )}
        <Board
          gameService={gameService}
          isPawnPromotion={setMakeMoveRequest}
          gameInfo={gameInfo}
          location={location}
          editPieceLocation={handleCopy}
          trashActive={isTrashActive}
          isPositionEditorMode={isPositionEditorMode}
          positionEditorService={positionEditorService}
        />
        {location === 'position-editor' && (
          <AddPiecePanel color={'white'} trashActive={isTrashActive}
                         setTrashActive={toggleTrash} handleCopy={handleCopy} setMode={toggleMode}
                         isPositionEditorMode={isPositionEditorMode} />
        )}
        {makeMoveRequest &&
          <PromotePawnPanel sendPromotion={makePromotion} makeMoveResponse={gameInfo}
                            fieldToId={makeMoveRequest.fieldToId} />}
      </div>
      {gameInfo?.gameInfo && location !== 'position-editor' &&
        <HistoryOfMoves moves={gameInfo.gameInfo.moves} location={location} setMoveId={setMoveId} />}
      {location === 'position-editor' &&
        <NewFen positionEditorService={positionEditorService} handleNewPieces={handleNewPieces} />}
    </div>
  )
}

export default Arena