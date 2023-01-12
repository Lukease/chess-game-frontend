import {Field} from '../../../UI'
import {Piece} from '../../pieces'

export type PieceCheckedKing = {
    emptyFields: Array<Field>,
    pieces: Array<Piece>
}