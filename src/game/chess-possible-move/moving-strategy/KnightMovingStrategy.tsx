import { Vector2d } from '../2d-vestors'
import { MovingStrategy } from './MovingStrategy'

export class KnightMovingStrategy extends MovingStrategy {
  getAllPossibleDirections(): Array<Vector2d> {
    return [
      new Vector2d(-1, 2),
      new Vector2d(-1, -2),
      new Vector2d(1, -2),
      new Vector2d(1, 2),
      new Vector2d(2, 1),
      new Vector2d(2, -1),
      new Vector2d(-2, 1),
      new Vector2d(-2, -1),
    ]
  }
}