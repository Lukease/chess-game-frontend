import {correctMovesOfRook} from './rook'
import {correctMovesOfBishop} from './bishop'
import {Move} from './move'
import {Piece} from './piece'


export class Queen extends Piece {
  getAllPossibleMoves(): Move[] {
    let queen: Move = new Move(false, 'A1')
    return [queen]
  }

  getImageUrl(): string {
    return `${this.color}-Queen`
  }
}

export const correctMovesOfQueen = (columnNumber: number, fieldNumber: number, color: string) => {
  return [...correctMovesOfRook(columnNumber,fieldNumber,color), ...correctMovesOfBishop(columnNumber,fieldNumber,color)]
}