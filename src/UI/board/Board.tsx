import React, { useEffect, useState } from 'react'
import { createPieceInstance, Piece } from '../../game/pieces'
import { Field } from '../field/Field'
import { TBoard } from './types/TBoard'
import { MakeMoveRequest } from '../../backend-service-connector/model/rest/game/MakeMoveRequest'

export function Board({
                        gameService,
                        isPawnPromotion,
                        gameInfo,
                        location,
                        editPieceLocation,
                        trashActive,
                        isPositionEditorMode,
                        positionEditorService,
                      }: TBoard) {
  const [pieces, setPieces] = useState<Array<Piece>>([])
  const [selectedPiece, setSelectedPiece] = useState<Piece | undefined>(undefined)
  const [kingIsChecked, setKingIsChecked] = useState<Array<string>>([])
  const [playerColor, setPlayerColor] = useState<string>('white')
  const [lastMove, setLastMove] = useState<Array<string>>([])

  useEffect(() => {
    if (gameInfo) {
      setPieces(gameInfo.pieces)
      setKingIsChecked(gameInfo.kingIsChecked ?? [])
      setPlayerColor(gameInfo.playerColor ?? 'white')
      setLastMove(gameInfo.fieldFromTo ?? [])
    }
  }, [gameInfo, location])

  const getPieceById = (id: string) => {
    if (pieces && pieces.length > 0) {
      return pieces.find(piece => piece.id === id)
    }
    return undefined
  }

  const getPiece = (fieldId: string) => {
    if (pieces) {
      const piece = getPieceById(fieldId)

      piece && piece.possibleMoves ? setSelectedPiece(piece) : setSelectedPiece(undefined)
    }
  }

  const makeMove = (id: string) => {
    if (!selectedPiece) return
    const move: MakeMoveRequest = {
      pieceFromId: selectedPiece.id,
      fieldToId: id,
      promotedPieceName: undefined,
    }

    if (selectedPiece.name === 'Pawn' && (id[1] === '8' || id[1] === '1')) {
      isPawnPromotion(move)
    } else {
      gameService.makeMove(move)
        .then(data => {
          data.pieces = data.pieces.map((pieceData: Piece) => {
            return createPieceInstance(pieceData)
          })
          setPieces(data.pieces)
        })
    }

    setSelectedPiece(undefined)
  }

  const renderFieldNumbers = () => {
    const output: Array<JSX.Element> = Array.from(Array(8)).map((x, index) => {
      const boardRow: number = playerColor === 'white' ? -index + 8 : index + 1

      return (
        <div className={'field__numbers--element'} key={index}>
          {boardRow}
        </div>
      )
    })
    return output
  }

  const doesPieceContainFieldId = (fieldId: string): boolean => {
    return Boolean(selectedPiece?.possibleMoves.map(move => move.fieldId).includes(fieldId))
  }

  const renderAllFields = (letter: string, boardColumn: number) => {
    const output: Array<JSX.Element> = Array.from(Array(8)).map((x, index) => {
      const boardRow: number = playerColor === 'white' ? -index + 8 : index + 1
      const currentPiece = getPieceById(`${letter}${boardRow}`)
      const fieldId = `${letter}${boardRow}`
      const correctMove = doesPieceContainFieldId(fieldId)
      const fieldChecked: boolean = kingIsChecked && kingIsChecked.includes(fieldId)
      const isChosen: boolean = selectedPiece?.id === fieldId
      return (
        <Field
          id={fieldId}
          piece={currentPiece}
          key={`${letter}${boardRow}`}
          color={(boardColumn + boardRow) % 2 ? 'white' : 'black'}
          onPieceClick={getPiece}
          correctMove={correctMove}
          makeMove={makeMove}
          isCheck={fieldChecked}
          lastMove={lastMove ? lastMove.includes(fieldId) : false}
          handleCopy={editPieceLocation}
          location={location}
          trashActive={trashActive}
          isChosen={isChosen}
          isPositionEditorMode={isPositionEditorMode}
          positionEditorService={positionEditorService}
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
    <div className={'game'}>
      {renderAllColumns()}
      <div className={'field__numbers'}>
        {renderFieldNumbers()}
      </div>
    </div>
  )
}