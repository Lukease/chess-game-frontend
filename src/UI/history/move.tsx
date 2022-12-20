import {Field} from '../field'
import {MoveType, MoveTypes} from '../../game/suppliers/move-type'
import {Piece} from '../../game/pieces'

export class Move {
    specialMove: MoveType | undefined
    fieldFrom: Field
    fieldTo: Field
    additionalField: Field | undefined
    nameOfMove: string = ''

    constructor(selectedField: Field, fieldTo: Field, fieldFromName: string, capturedField: Field | undefined, specialMove: MoveType | undefined, promotedPiece: Piece | undefined) {
        this.specialMove = specialMove
        this.fieldFrom = selectedField
        this.fieldTo = fieldTo
        this.additionalField = capturedField
        this.setNameOfMove(fieldFromName!, promotedPiece)
    }

    setNameOfMove(fieldFrom: string, piece: Piece | undefined) {
        if (this.specialMove?.specialName) {
            this.nameOfMove = this.specialMove.name
        } else {
            const icon: string = this.fieldFrom.piece!.getPieceIcon()
            const capture: string = this.fieldTo.piece !== undefined ? 'x' : ''

            this.nameOfMove = icon + fieldFrom + capture + this.fieldTo.id.toLowerCase() + this.specialMove!.name
        }

        if (this.specialMove === MoveTypes.PROM && Piece) {
            this.nameOfMove += piece?.getPieceIcon()
        }
    }

}