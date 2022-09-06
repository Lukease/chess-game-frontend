import {correctMovesOfRook} from './rook'
import {correctMovesOfBishop} from './bishop'

export const correctMovesOfQueen = (columnNumber: number, fieldNumber: number, color: string) => {
  return [...correctMovesOfRook(columnNumber,fieldNumber,color), ...correctMovesOfBishop(columnNumber,fieldNumber,color)]
}