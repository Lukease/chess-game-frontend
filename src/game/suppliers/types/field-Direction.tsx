import {Field} from '../../../UI'
import {Vector2d} from '../../chess-possible-move'

export type FieldDirection = {
    field: Field,
    direction: Array<Vector2d>
}