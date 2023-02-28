import React from 'react'
import { GameService, MovingService, CoordinateService, NavigationService, HistoryService } from '../../game/suppliers'
import { Piece } from '../../game/pieces'
import { Field } from '../field/Field'
import { TBoard } from './types/TBoard'

export class Board extends React.Component<any, any> {
  pieces: Array<Piece>
  gameService: GameService
  allFields: Array<Field>
  movingService: MovingService
  navigationService: NavigationService
  historyService: HistoryService

  constructor({ gameService, movingService, navigationService, pieces, historyService }: TBoard) {
    super({ gameService, movingService, navigationService, pieces, historyService })

    this.deletePiece = this.deletePiece.bind(this)
    this.pieces = pieces
    this.gameService = gameService
    this.movingService = movingService
    this.navigationService = navigationService
    this.historyService = historyService
    this.allFields = []
    this.state = {
      isTrashOn: false,
      vector: -1,
    }

    this.movingService.board = this
    this.gameService.board = this
    this.navigationService.board = this
  }

  setVectorDirection(direction: number) {
    this.setState({
      vector: direction,
    })
  }

  getPieceById(id: string) {
    const coordinate = CoordinateService.getCoordinateById(id)

    return this.pieces.find(piece => piece.currentCoordinate === coordinate)!
  }

  removePieceFromArray(piece: Piece) {
    this.pieces = this.pieces.filter(chess => chess !== piece)
  }

  deletePiece(field: Field) {
    if (this.state.isTrashOn) {
      const pieceId = field.id

      this.removePieceFromArray(this.getPieceById(pieceId))
    }
  }

  setTrashToggle(active: boolean) {
    this.setState({ isTrashOn: !active })
  }

  renderFieldNumbers() {
    let output: Array<JSX.Element> = Array.apply(null, Array(8)).map((x, index) => {
      const boardRow: number = this.state.vector === -1 ? -index + 8 : index + 1

      return (

        <div
          style={{ height: '12.5%' }}
          key={index}
        >{boardRow}</div>
      )
    })
    return output
  }

  renderAllFields(letter: string, boardColumn: number) {
    let output: Array<JSX.Element> = Array.apply(null, Array(8)).map((x, index) => {
      const boardRow: number = this.state.vector === -1 ? -index + 8 : index + 1
      const currentPiece: Piece = this.getPieceById(`${letter}${boardRow}`)

      return (
        <Field
          rowNumber={boardRow}
          id={`${letter}${boardRow}`}
          columnNumber={boardColumn}
          piece={currentPiece}
          key={`${letter}${boardRow}`}
          color={(boardColumn + boardRow) % 2 ? 'white' : 'black'}
          gameService={this.gameService}
          movingService={this.movingService}
          historyService={this.historyService}
        />
      )
    })
    return output
  }

  renderAllColumns() {
    let output: Array<JSX.Element> = Array.apply(null, Array(8)).map((x, index) => {
      const letter: string = String.fromCharCode(64 + (index + 1))
      const boardColumn: number = index + 1

      return (
        <div className='field__column'
             key={letter}
        >
          {<div className={'field__column--letter'}>{letter.toLowerCase()}</div>}
          {this.renderAllFields(letter, boardColumn)}
        </div>
      )

    })

    return output
  }

  render() {
    return (
      <div className={'game'}
           onClick={() => this.deletePiece}
      >
        {this.renderAllColumns()}
        <div className={'field__numbers'}>
          {this.renderFieldNumbers()}
        </div>
      </div>
    )
  }
}