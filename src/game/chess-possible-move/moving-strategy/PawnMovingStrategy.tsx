import {Vector2d} from '../2dVectors'
import {MovingStrategy} from './MovingStrategy'

export class PawnMovingStrategy extends MovingStrategy {
    getAllPossibleDirections(): Array<Vector2d> {
        return [
            new Vector2d(0,1),
        ]
    }
}