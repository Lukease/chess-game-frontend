import { Bishop, Knight, Pawn, Piece, Queen, Rook } from '../game/pieces'

export const addPieceArrangement = (color: string): Array<Piece> => {
  return [
    new Queen(color, 'A0', 'Queen', []),
    new Bishop(color, 'A0', 'Bishop', []),
    new Knight(color, 'A0', 'Knight', []),
    new Rook(color, 'A0', 'Rook', []),
    new Pawn(color, 'A0', 'Pawn', []),
  ]
}