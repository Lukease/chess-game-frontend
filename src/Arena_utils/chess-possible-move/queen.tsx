import {Piece} from './piece'
import {MovingStrategies} from '../suppliers/moving-strategy-service'
import {Coordinate} from "./coordinate";


export class Queen extends Piece {
  constructor(color: string, id: string,  name: string) {
    super(color, id,  name,[MovingStrategies.diagonalMoving,MovingStrategies.lineMoving])
  }
  getAllPossibleMoves(): Array<Coordinate> {
    let queen: Coordinate = new Coordinate(1,1,'A','1')
    return [queen]
  }

  getImageUrl(): string {
    return `${this.color}-Queen`
  }

  canJump(): boolean {
    return false;
  }
}