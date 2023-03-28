import React, { useEffect, useState } from 'react'
import { CoordinateService } from '../../game/suppliers'
import { Piece } from '../../game/pieces'
import { Field } from '../field/Field'
import { TBoard } from './types/TBoard'
import { defaultChessArrangement } from '../../chess_arrangement'

export function Board({ gameService, movingService, navigationService, historyService }: TBoard) {
  const [isTrashOn, setTrashOn] = useState(false)
  const [vector, setVector] = useState(-1)
  const [pieces, setPieces] = useState<Array<Piece>>([])
  const [allFields, setAllFields] = useState<Array<string>>([])

  useEffect(() => {
    const direction = 'white'
    //todo fetch color
    if (direction === 'white') {
      setVector(-1)
    } else {
      setVector(1)
    }

    setPieces(defaultChessArrangement)
  }, [])

  const getPieceById = (id: string) => {
    const coordinate = CoordinateService.getCoordinateById(id)

    return pieces.find(piece => piece.currentCoordinate === coordinate)!
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

  const renderAllFields = (letter: string, boardColumn: number) => {
    const output: Array<JSX.Element> = Array.from(Array(8)).map((x, index) => {
      const boardRow: number = vector === -1 ? -index + 8 : index + 1
      const currentPiece: Piece = getPieceById(`${letter}${boardRow}`)

      return (
        <Field
          // rowNumber={boardRow}
          id={`${letter}${boardRow}`}
          // columnNumber={boardColumn}
          selectedPiece={currentPiece}
          key={`${letter}${boardRow}`}
          color={(boardColumn + boardRow) % 2 ? 'white' : 'black'}
          gameService={gameService}
          movingService={movingService}
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
        <div className='field__column'
             key={letter}
        >
          {
            <div className={'field__column--letter'}>{letter.toLowerCase()}</div>
          }
          {
            renderAllFields(letter, boardColumn)
          }
        </div>
      )
    })

    return output
  }


  return (
    <div className={'game'}
      // onClick={() => deletePiece}
    >
      {
        renderAllColumns()
      }
      <div className={'field__numbers'}>
        {
          renderFieldNumbers()
        }
      </div>
    </div>
  )

}