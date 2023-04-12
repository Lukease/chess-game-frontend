import React, { useEffect, useState } from 'react'
import { King, Piece } from '../../game/pieces'
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
  const [kingIsChecked, setKingIsChecked] = useState<boolean>(false)
  const [playerColor, setPlayerColor] = useState<string>('white')

  useEffect(() => {

    getGameInProgress().then((res: MakeMoveResponse) => {
      setPieces(res.pieces)
      setFen(res.gameDto.fen)
      setWhoseTurn(res.whoseTurn)
      setKingIsChecked(res.kingIsChecked)
      setPlayerColor(res.playerColor)

      if (res.playerColor === 'white') {
        setVector(-1)
      } else {
        setVector(1)
      }
    })

    const intervalId = setInterval(() => {
      getGameInProgress().then((res: MakeMoveResponse) => {
        setPieces(res.pieces)
        setFen(res.gameDto.fen)
        setWhoseTurn(res.whoseTurn)
        setKingIsChecked(res.kingIsChecked)
        setPlayerColor(res.playerColor)
      })
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

  const getGameInProgress = async (): Promise<MakeMoveResponse> => {
    const response = await gameServiceBackend.getActiveGameAndReturnMoves()
    return {
      pieces: response.pieces,
      whoseTurn: response.whoseTurn,
      gameDto: response.gameDto,
      playerColor: response.playerColor,
      kingIsChecked: response.kingIsChecked,
    }
  }

  const getPieceById = (id: string) => {
    if (pieces) {
      return pieces.find(piece => piece.id === id)
    }
  }

  const getPiece = (fieldId: string) => {
    const piece = pieces.find(currentPiece => currentPiece.id === fieldId)

    piece && piece.possibleMoves ? setSelectedPiece(piece) : setSelectedPiece(undefined)
  }

  const makeMove = (id: string, specialMove: string) => {
    if (selectedPiece) {
      const move: MakeMoveRequest = {
        moveId: id,
        piece: selectedPiece,
        moveName: specialMove ? specialMove : '',
      }
      gameServiceBackend.makeMove(move).then(r => console.log(r))
    }
  }

  const removePieceFromArray = (piece: Piece) => {
    const newArray = pieces.filter(chess => chess !== piece)

    setPieces(newArray)
  }

  // const deletePiece=(field: Field)=> {
  //   if (isTrashOn) {
  //     const pieceId = field.id
  //
  //     removePieceFromArray(getPieceById(pieceId))
  //   }
  // }

  // const setTrashToggle = (active: boolean) => {
  //   setState({ isTrashOn: !active })
  // }

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
    if (selectedPiece) {
      return selectedPiece.possibleMoves.some(move => {
        return move.fieldId === fieldId
      })
    } else {
      return false
    }
  }

  const isFieldChecked = (fieldId: string): boolean => {
    const kingPosition = pieces.find(piece => piece.name=== 'King' && piece.color === playerColor && piece.id === fieldId)
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
          // rowNumber={boardRow}
          id={fieldId}
          // columnNumber={boardColumn}
          piece={currentPiece}
          key={`${letter}${boardRow}`}
          color={(boardColumn + boardRow) % 2 ? 'white' : 'black'}
          gameServiceBackend={gameServiceBackend}
          movingService={movingService}
          onPieceClick={getPiece}
          correctMove={correctMove}
          makeMove={makeMove}
          isCheck={fieldChecked}
          // historyService={historyService}
        />
      )
    })
    return output
  }

  const renderAllColumns = () => {
    const output: Array<JSX.Element> = Array.from(Array(8)).map((x, index) => {
      const letter: string = String.fromCharCode(64 + (index + 1))
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
      // onClick={() => deletePiece}
    >
      {renderAllColumns()}
      <div className={'field__numbers'}>
        {renderFieldNumbers()}
      </div>
    </div>
  )

}