import { Vector2d } from '../2d-vestors'

export abstract class MovingStrategy {
  abstract getAllPossibleDirections(): Array<Vector2d>
}
