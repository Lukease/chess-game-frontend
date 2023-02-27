import {Vector2d} from '../2dVectors'

export abstract class MovingStrategy {
    abstract getAllPossibleDirections(): Array<Vector2d>
}