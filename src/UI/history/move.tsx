import {Field} from '../field'

export class Move {
    specialMove: string
    fieldFrom: Field
    fieldTo: Field
    additionalField: Field | undefined
    nameOfMove: string = ''

    constructor(specialMove: string, selectedField: Field, fieldTo: Field, fieldFrom: string, capturedField: Field | undefined) {
        this.specialMove = specialMove
        this.fieldFrom = selectedField
        this.fieldTo = fieldTo
        this.additionalField = capturedField
        this.setNameOfMove(fieldFrom)
    }

    setNameOfMove(fieldFrom: string) {
        const icon: string = this.fieldFrom.piece!.getPieceIcon()
        const capture: string = this.fieldTo.piece !== undefined ? 'x' : ''

        this.nameOfMove = icon + fieldFrom + capture + this.fieldTo.id.toLowerCase()
        console.log(this.nameOfMove)
    }
}