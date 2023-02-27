import {MoveType} from '../../game/suppliers'
import {Piece} from '../../game/pieces'
import {Field} from '../board'

export class Move {
    id: number | undefined
    specialMove: MoveType | undefined
    fieldFrom: Field
    pieceFrom: Piece | undefined
    fieldTo: Field
    pieceTo: Piece | undefined
    additionalField: Field | undefined
    nameOfMove: string | undefined
    secondMove: Move | undefined
    promotedPiece: Piece | undefined
    isCheck: boolean

    constructor(id: number | undefined, selectedField: Field, pieceFrom: Piece | undefined, fieldTo: Field, pieceTo: Piece | undefined,
                fieldFromName: string, specialMove: MoveType, isCheck: boolean, additionalField: Field | undefined = undefined,
                promotedPiece: Piece | undefined = undefined, secondMove: Move | undefined = undefined) {
        this.id = id
        this.specialMove = specialMove
        this.fieldFrom = selectedField
        this.pieceFrom = pieceFrom
        this.fieldTo = fieldTo
        this.pieceTo = pieceTo
        this.additionalField = additionalField
        this.promotedPiece = promotedPiece
        this.isCheck = isCheck
        this.setNameOfMove(fieldFromName!, promotedPiece)
        this.secondMove = secondMove
    }

    setNameOfMove(fieldFromName: string, piece: Piece | undefined) {
        if (this.specialMove?.specialName) {
            this.setSpecialMoveName()
        } else {
            this.setIconOfMoveAndAddAllLetters(fieldFromName)
        }

        this.setPiecePromotion(piece!)
    }

    setSpecialMoveName() {
        this.nameOfMove = this.specialMove!.name
    }

    setIconOfMoveAndAddAllLetters(fieldFromName: string) {
        const icon: string = this.fieldFrom.piece!.getPieceIcon()
        const capture: string = this.fieldTo.piece !== undefined ? 'x' : ''

        this.nameOfMove = icon + fieldFromName + capture + this.fieldTo.id.toLowerCase() + this.specialMove!.name
    }

    setPiecePromotion(piece: Piece) {
        if (this.specialMove === MoveType.PROM && Piece) {
            this.nameOfMove += piece?.getPieceIcon()
        }
    }
}