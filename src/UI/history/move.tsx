import {Field} from '../field'
import {MoveType, MoveTypes} from '../../game/suppliers/move-type'
import {Piece} from '../../game/pieces'

export class Move {
    id: number | undefined
    specialMove: MoveType | undefined
    fieldFrom: Field
    fieldTo: Field
    additionalField: Field | undefined
    nameOfMove: string = ''
    secondMove: Move | undefined

    constructor(id: number| undefined, selectedField: Field, fieldTo: Field, fieldFromName: string, specialMove: MoveType, additionalField: Field | undefined = undefined, promotedPiece: Piece | undefined = undefined, secondMove: Move | undefined = undefined) {
        this.id = id
        this.specialMove = specialMove
        this.fieldFrom = selectedField
        this.fieldTo = fieldTo
        this.additionalField = additionalField
        this.setNameOfMove(fieldFromName!, promotedPiece)
        this.secondMove = secondMove
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