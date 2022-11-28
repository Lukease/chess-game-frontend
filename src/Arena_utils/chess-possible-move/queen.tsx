import {Move} from './move'
import {Piece} from './piece'
import {MovingStrategies} from '../suppliers/moving-strategy-service'


export class Queen extends Piece {
  constructor(color: string, id: string, position: Array<number>, name: string) {
    super(color, id, position, name,[MovingStrategies.diagonalMoving,MovingStrategies.lineMoving])
  }
  getAllPossibleMoves(): Move[] {
    let queen: Move = new Move(false, 'A1')
    return [queen]
  }

  getImageUrl(): string {
    return `${this.color}-Queen`
  }
}