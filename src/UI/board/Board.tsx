import React, { useEffect, useState } from 'react'
import { Piece } from '../../game/pieces'
import { Field } from '../field/Field'
import { TBoard } from './types/TBoard'
import { MakeMoveResponse } from '../../backend-service-connector/model/rest/game/MakeMoveResponse'
import { MakeMoveRequest } from '../../backend-service-connector/model/rest/game/MakeMoveRequest'

export function Board({ gameService, movingService, gameServiceBackend, navigationService, historyService }: TBoard) {
  const [isTrashOn, setTrashOn] = useState(false)
  const [vector, setVector] = useState(-1)
  const [pieces, setPieces] = useState<Array<Piece>>([])
  const [fen, setFen] = useState<string>('')
  const [history, setHistory] = useState<string>('')
  const [whoseTurn, setWhoseTurn] = useState<string>('white')
  const [selectedPiece, setSelectedPiece] = useState<Piece | undefined>(undefined)
  const [promotedPiece, setPromotedPiece] = useState<Piece | undefined>(undefined)
  const [kingIsChecked, setKingIsChecked] = useState<boolean>(false)
  const [playerColor, setPlayerColor] = useState<string>('white')

  useEffect(() => {
    const setGameState = (res: MakeMoveResponse | undefined) => {
      if (res) {
        setPieces(res.pieces)
        setFen(res.gameInfo.fen)
        setWhoseTurn(res.whoseTurn)
        setKingIsChecked(res.kingIsChecked)
        setPlayerColor(res.playerColor)

        res.playerColor === 'white' ? setVector(-1) : setVector(1)
      }
    }

    gameServiceBackend.getActiveGameAndReturnMoves().then(setGameState)
    const intervalId = setInterval(() => {
      gameServiceBackend.getActiveGameAndReturnMoves().then(setGameState)
    }, 5000)

    return () => clearInterval(intervalId)
  }, [gameServiceBackend])

  const getPieceById = (id: string) => {
    return pieces ? pieces.find(piece => piece.id === id) : undefined
  }

  const getPiece = (fieldId: string) => {
    if (pieces) {
      const piece = pieces.find(currentPiece => currentPiece.id === fieldId)

      piece && piece.possibleMoves ? setSelectedPiece(piece) : setSelectedPiece(undefined)
    }
  }

  const makeMove = (id: string) => {
    if (selectedPiece?.name == 'Pawn' && (id[1] === '8' || id[1] === '1')) {
      return null
    }
    if (selectedPiece) {
      const move: MakeMoveRequest = {
        pieceFromId: selectedPiece.id,
        fieldToId: id,
        promotedPieceName: promotedPiece?.name,
      }
      gameServiceBackend.makeMove(move).then(r => console.log(r))
      setSelectedPiece(undefined)
    }
  }

  const renderFieldNumbers = () => {
    const output: Array<JSX.Element> = Array.from(Array(8)).map((x, index) => {
      const boardRow: number = vector === -1 ? -index + 8 : index + 1

      return (
        <div
          style={{ height: '12.5%' }}
          key={index}
        >
          {boardRow}
        </div>
      )
    })
    return output
  }

  const doesPieceContainFieldId = (fieldId: string): boolean => {
    return Boolean(selectedPiece?.possibleMoves.map(move => move.fieldId).includes(fieldId))
  }

  const isFieldChecked = (fieldId: string): boolean => {
    const kingPosition = pieces?.find(piece => piece.name === 'King' && piece.color === playerColor && piece.id === fieldId)
    return kingIsChecked && kingPosition != null
  }

  const renderAllFields = (letter: string, boardColumn: number) => {
    const output: Array<JSX.Element> = Array.from(Array(8)).map((x, index) => {
      const boardRow: number = vector === -1 ? -index + 8 : index + 1
      const currentPiece = getPieceById(`${letter}${boardRow}`)
      const fieldId = `${letter}${boardRow}`
      const correctMove = doesPieceContainFieldId(fieldId)
      const fieldChecked = isFieldChecked(fieldId)
      return (
        <Field
          id={fieldId}
          piece={currentPiece}
          key={`${letter}${boardRow}`}
          color={(boardColumn + boardRow) % 2 ? 'white' : 'black'}
          gameServiceBackend={gameServiceBackend}
          movingService={movingService}
          onPieceClick={getPiece}
          correctMove={correctMove}
          makeMove={makeMove}
          isCheck={fieldChecked}
        />
      )
    })
    return output
  }

  const renderAllColumns = () => {
    const output: Array<JSX.Element> = Array.from(Array(8)).map((x, index) => {
      const letter: string = String.fromCharCode(65 + index)
      const boardColumn: number = index + 1

      return (
        <div className='field__column' key={letter}>
          {<div className={'field__column--letter'}>{letter.toLowerCase()}</div>}
          {renderAllFields(letter, boardColumn)}
        </div>
      )
    })

    return output
  }

  return (
    <div className={'game'}
    >
      {renderAllColumns()}
      <div className={'field__numbers'}>
        {renderFieldNumbers()}
      </div>
    </div>
  )
}