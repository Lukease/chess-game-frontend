import { King, Pawn } from '../pieces'

export class HistoryService {
  historyOfMovesBackTo: Array<any> = []
  arrayOfMoves: Array<any> = []
  kingCheck: any | undefined
  allFields: Array<any> = []
  previousMoveFields: Array<any> = []

  addFieldToHistoryService(field: any) {
    this.allFields = this.allFields.concat(field)
  }

  setArrayOfMoves(moves: Array<any>) {
    this.arrayOfMoves = moves

    const arrayLength = moves.length - 1
    const lastMove = moves[arrayLength]

    this.previousMoveFields = [lastMove.fieldFrom, lastMove.fieldTo]
  }

  renderHistory(moveId: number) {
    this.backToActualPositionIfHistoryElementClicked()
    this.addHistoryOfMovesFromClickedElement(moveId)
    this.undoneMoveToClickedElement()
  }

  backToActualPositionIfHistoryElementClicked() {
    if (this.historyOfMovesBackTo) {
      this.historyOfMovesBackTo.reverse().forEach(move => {
        this.removeOldKingCheckAndAddNew(move)

        if (move.secondMove) {
          this.makeMoveFromHistory(move.secondMove)
        }

        if (move.additionalField) {
          this.removePieceFromField(move.additionalField)
        }

        this.makeMoveFromHistory(move)

        if (move.promotedPiece) {
          move.fieldTo.setPiece(move.promotedPiece!, true)
        }
      })
    }
  }

  removePieceFromField(field: any) {
    field.removePiece()
  }

  makeMoveFromHistory(move: any) {
    this.disableHighlightHistoryFields()
    move.fieldTo.setPiece(move.pieceFrom!, true)
    move.fieldFrom.removePiece()
    this.previousMoveFields = [move.fieldFrom, move.fieldTo]
    this.highlightHistoryLasMoveFields()
  }

  disableHighlightHistoryFields() {
    this.previousMoveFields.forEach(field => {
      field.setActive(false)
    })
  }

  highlightHistoryLasMoveFields() {
    this.previousMoveFields.forEach(field => {
      field.setActive(true)
    })
  }

  addHistoryOfMovesFromClickedElement(moveId: number) {
    this.historyOfMovesBackTo = this.arrayOfMoves.filter(move => move.id! > moveId)
      .reverse()
  }

  undoneMoveToClickedElement() {
    const arraySize = this.historyOfMovesBackTo.length - 1
    this.historyOfMovesBackTo.forEach((move, index) => {
      this.removeOldKingCheckAndAddNew(move)

      if (move.secondMove) {
        this.undoMove(move.secondMove)
      }

      if (move.additionalField) {
        this.undoneMoveForAdditionalField(move)
      }

      if (move.promotedPiece) {
        move.fieldFrom.setPiece(move.pieceFrom!, true)
      }

      this.undoMove(move)

      if (index === arraySize) {
        this.makeMoveFromHistory(move)
      }
    })
  }

  undoMove(move: any) {
    this.disableHighlightHistoryFields()
    move.fieldFrom.setPiece(move.pieceFrom!, true)
    this.previousMoveFields = [move.fieldFrom, move.fieldTo]
    this.highlightHistoryLasMoveFields()

    if (move.pieceTo) {
      move.fieldTo.setPiece(move.pieceTo!, true)
    } else {
      move.fieldTo.removePiece()
    }
  }

  undoneMoveForAdditionalField(move: any) {
    const pawn = this.createPawnForAdditionalField(move)

    move.additionalField!.setPiece(pawn, false)
  }

  createPawnForAdditionalField(move: any) {
    const coordinate = move.additionalField!.coordinate
    const color = move.fieldTo.piece?.color === 'white' ? 'black' : 'white'

    return new Pawn(color, coordinate.boardColumn + coordinate.boardRow, 'Pawn', [])
  }

  removeOldKingCheckAndAddNew(move: any) {
    if (this.kingCheck) {
      this.kingCheck.setKingCheck(false)
    }

    if (move.isCheck) {
      this.setHistoryCheck(move)
    }
  }

  setHistoryCheck(move: any) {
    const kingPosition = this.allFields.find(field => field.piece! instanceof King && field.piece?.color !== move.pieceFrom?.color)!

    kingPosition.setKingCheck(true)
    this.kingCheck = kingPosition
  }
}