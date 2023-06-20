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

export function Arena({
                        movingService,
                        navigationService,
                        historyService,
                        gameService,
                        positionEditorService,
                      }: TArena) {
  const [selectedPiece, setSelectedPiece] = useState<Piece | undefined>(undefined)
  const [coordinateX, setCoordinateX] = useState<number>(0)
  const [coordinateY, setCoordinateY] = useState<number>(0)
  const [makeMoveRequest, setMakeMoveRequest] = useState<MakeMoveRequest | undefined>(undefined)
  const [gameInfo, setGameInfo] = useState<MakeMoveResponse | undefined>()
  const [isTrashActive, setTrashActive] = useState(false)
  const [positionEditorInfo, setPositionEditorInfo] = useState<PositionEditorInfo | undefined>(undefined)
  const [location, setLocation] = useState<string>('')
  const [isMoving, setIsMoving] = useState(false)
  const [isFromBoard, setIsFromBoard] = useState(false)
  const [isPositionEditorMode, setPositionEditorMode] = useState(false)
  const [moveId, setMoveId] = useState<number>(0)

  useEffect(() => {
    const setGameState = (response: MakeMoveResponse | undefined) => {
      if (response) {
        setGameInfo(response)
      }
    }

    const currentURL = window.location.href
    const path = currentURL.split('/')

    setLocation(path[path.length - 1])

    const fetchData = () => {
      if (currentURL.includes('game')) {
        gameService.getActiveGameAndReturnMoves()
          .then(r => {
            r.pieces = r.pieces.map((pieceData: Piece) => {
              return createPieceInstance(pieceData)
            })
            setGameState(r)
          })
          .catch(error => {
            alert(`An error occurred while fetching the game: ${error.message}`)
            window.location.href = 'http://localhost:3000/new-game'
          })
      } else if (currentURL.includes('position-editor')) {
        positionEditorService.getCurrentPositionEditorPieces()
          .then(r => {
            r.pieces = r.pieces.map((pieceData: Piece) => {
              return createPieceInstance(pieceData)
            })
            setPositionEditorInfo(r)
          })
          .catch(error => {
            alert(`An error occurred while fetching the position editor pieces: ${error.message}`)
            window.location.href = 'http://localhost:3000/new-game'
          })
      } else if (currentURL.includes('history')) {
        historyService.getHistoryOfGame(moveId)
          .then(r => {
            r.pieces = r.pieces.map((pieceData: Piece) => {
              return createPieceInstance(pieceData)
            })
            setPositionEditorInfo(r)
          })
      }
    }

    fetchData()
    const intervalId = setInterval(fetchData, 5000)

    return () => clearInterval(intervalId)
  }, [gameService])

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
      const mouseUpTarget = document.elementsFromPoint(coordinateX, coordinateY - 30)
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
          setPositionEditorInfo(r)
        })
        console.log('New position:', coordinateX, coordinateY, newPiecePosition)
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
      setPositionEditorInfo(newPositionEditorState)
    })
  }

  function handleNewPieces(newFenInfo: PositionEditorInfo) {
    newFenInfo.pieces = newFenInfo.pieces.map((pieceData: Piece) => {
      return createPieceInstance(pieceData)
    })
    setPositionEditorInfo(newFenInfo)
  }

  return (
    <div className={'game-content'} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      {isMoving && selectedPiece && (
        <MovedPiece selectedPiece={selectedPiece} coordinateY={coordinateY} coordinateX={coordinateX} />
      )}
      {location === 'position-editor' && <GoBackNav defaultChessPosition={setDefaultChessPosition} />}
      {location === 'game' && (
        <>
          <GameNavigation gameService={gameService} />
          <GameInfo makeMoveResponse={gameInfo} />
        </>
      )}
      <div className={'game__arena'}>
        {location === 'position-editor' && (
          <AddPiecePanel color={'black'} trashActive={isTrashActive}
                         setTrashActive={toggleTrash} handleCopy={handleCopy} setMode={toggleMode}
                         isPositionEditorMode={isPositionEditorMode} />
        )}
        <Board
          movingService={movingService}
          gameService={gameService}
          navigationService={navigationService}
          historyService={historyService}
          isPawnPromotion={setMakeMoveRequest}
          makeMoveResponse={gameInfo}
          positionEditorInfo={positionEditorInfo}
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
        {makeMoveRequest && (
          <PromotePawnPanel sendPromotion={makePromotion} makeMoveResponse={gameInfo} />
        )}
      </div>
      {location !== 'position-editor' && <HistoryOfMoves gameService={gameService} makeMoveResponse={gameInfo} />}
      {location === 'position-editor' &&
        <NewFen positionEditorService={positionEditorService} handleNewPieces={handleNewPieces}></NewFen>}
    </div>
  )
}

export default Arena