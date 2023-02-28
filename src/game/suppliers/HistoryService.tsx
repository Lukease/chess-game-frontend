import {Move} from '../../UI/history/Move'
import {King, Pawn} from '../pieces'
import {Field} from '../../UI'

export class HistoryService {
    historyOfMovesBackTo: Array<Move> = []
    arrayOfMoves: Array<Move> = []
    kingCheck: Field | undefined
    allFields: Array<Field> = []
    previousMoveFields: Array<Field> = []

    addFieldToHistoryService(field: Field) {
        this.allFields = this.allFields.concat(field)
    }

    setArrayOfMoves(moves: Array<Move>) {
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

    removePieceFromField(field: Field) {
        field.removePiece()
    }

    makeMoveFromHistory(move: Move) {
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

            if (index === arraySize){
                this.makeMoveFromHistory(move)
            }
        })
    }

    undoMove(move: Move) {
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

    undoneMoveForAdditionalField(move: Move) {
        const pawn = this.createPawnForAdditionalField(move)

        move.additionalField!.setPiece(pawn, false)
    }

    createPawnForAdditionalField(move: Move) {
        const coordinate = move.additionalField!.coordinate
        const color = move.fieldTo.piece?.color === 'white' ? 'black' : 'white'

        return new Pawn(color, coordinate.boardColumn + coordinate.boardRow, 'Pawn')
    }

    removeOldKingCheckAndAddNew(move: Move) {
        if (this.kingCheck) {
            this.kingCheck.setKingCheck(false)
        }

        if (move.isCheck) {
            this.setHistoryCheck(move)
        }
    }

    setHistoryCheck(move: Move) {
        const kingPosition = this.allFields.find(field => field.piece! instanceof  King && field.piece?.color !== move.pieceFrom?.color)!

        kingPosition.setKingCheck(true)
        this.kingCheck = kingPosition
    }
}