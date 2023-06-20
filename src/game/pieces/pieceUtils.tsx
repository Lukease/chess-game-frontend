import { Piece } from './Piece'
import { Knight } from './Knight'
import { Bishop } from './Bishop'
import { Rook } from './Rook'
import { Queen } from './Queen'
import { King } from './King'
import { Pawn } from './Pawn'

export const createPieceInstance = (pieceData: Piece) => {
  switch (pieceData.name) {
    case 'Knight':
      return new Knight(pieceData.color, pieceData.id, pieceData.name, pieceData.possibleMoves)
    case 'Bishop':
      return new Bishop(pieceData.color, pieceData.id, pieceData.name, pieceData.possibleMoves)
    case 'Rook':
      return new Rook(pieceData.color, pieceData.id, pieceData.name, pieceData.possibleMoves)
    case 'Queen':
      return new Queen(pieceData.color, pieceData.id, pieceData.name, pieceData.possibleMoves)
    case 'King':
      return new King(pieceData.color, pieceData.id, pieceData.name, pieceData.possibleMoves)
    default:
      return new Pawn(pieceData.color, pieceData.id, pieceData.name, pieceData.possibleMoves)
  }
}