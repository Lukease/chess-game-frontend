import { Vector2d } from '../2d-vestors'
import { MovingStrategy } from './MovingStrategy'

export class LineMovingStrategy extends MovingStrategy {

  getAllPossibleDirections(): Array<Vector2d> {
    return [
      new Vector2d(0, 1),
      new Vector2d(0, -1),
      new Vector2d(1, 0),
      new Vector2d(-1, 0)]
  }
}