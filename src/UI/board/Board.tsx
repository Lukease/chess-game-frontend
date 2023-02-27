import React, {useState} from 'react'
import {CoordinateService} from '../../game/suppliers'
import {Piece} from '../../game/pieces'
import {Field} from './Field'
import {TBoard} from './types/TBoard'

function Board({gameService, movingService, navigationService, pieces, historyService}: TBoard) {
    const [piecesArray, setPiecesArray] = useState<Array<Piece>>(pieces)
    const [allFields, setAllFields] = useState<Array<Field>>([])
    const [isTrashOn, setIsTrashOn] = useState<boolean>(false)
    const [vector, setVector] = useState<number>(-1)

    // movingService.board = this
    // gameService.board = this
    // navigationService.board = this

    const setVectorDirection = (direction: number) => {
        setVector(direction)
    }

    const getPieceById = (id: string) => {
        const coordinate = CoordinateService.getCoordinateById(id)

        return piecesArray.find(piece => piece.currentCoordinate === coordinate)!
    }

    const removePieceFromArray = (piece: Piece) => {
        const filteredPieces = piecesArray.filter(chess => chess !== piece)

        setPiecesArray(filteredPieces)
    }

    const deletePiece = (field: Field) => {
        if (isTrashOn) {
            const pieceId = field.id

            removePieceFromArray(getPieceById(pieceId))
        }
    }

    const setTrashToggle = (active: boolean) => {
        setIsTrashOn(!active)
    }

    const renderFieldNumbers = () => {
        return Array(8).map((x, index) => {
            const boardRow: number = vector === -1 ? -index + 8 : index + 1

            return (
                <div
                    style={{height: '12.5%'}}
                    key={index}
                >
                    {boardRow}
                </div>
            )
        })
    }

    const renderAllFields = (letter: string, boardColumn: number) => {
        return Array(8).map((x, index) => {
            const boardRow: number = vector === -1 ? -index + 8 : index + 1
            const currentPiece: Piece = getPieceById(`${letter}${boardRow}`)

            return (
                <Field
                    rowNumber={boardRow}
                    id={`${letter}${boardRow}`}
                    columnNumber={boardColumn}
                    piece={currentPiece}
                    key={`${letter}${boardRow}`}
                    color={(boardColumn + boardRow) % 2 ? 'white' : 'black'}
                    gameService={gameService}
                    movingService={movingService}
                    historyService={historyService}
                />
            )
        })
    }

    const renderAllColumns = () => {
        return Array(8).map((x, index) => {
            const letter: string = String.fromCharCode(64 + (index + 1))
            const boardColumn: number = index + 1

            return (
                <div className='field__column'
                     key={letter}
                >
                    {<div className={'field__column--letter'}>{letter.toLowerCase()}</div>}
                    {
                        renderAllFields(letter, boardColumn)
                    }
                </div>
            )

        })
    }

    return (
        <div className={'game'}
             onClick={() => deletePiece}
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

export default Board