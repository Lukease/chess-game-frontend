import {Bishop, Knight, Pawn, Piece, Queen, Rook} from '../game/pieces'


export const addPieceArrangement = (color: string) => {
    const pieceArrangement: Array<Piece> = [
        new Queen(color, 'D8', 'Queen'),
        new Bishop(color, 'F8', 'Bishop'),
        new Knight(color, 'B1', 'Knight'),
        new Rook(color, 'A1', 'Rook'),
        new Pawn(color, 'A2', 'Pawn')
    ]

    return pieceArrangement
}