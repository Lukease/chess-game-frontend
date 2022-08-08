import {
    correctMovesOfQueen,
    correctMovesOfBishop,
    correctMovesOfKnight,
    correctMovesOfRook,
    correctMovesOfKing,
    correctMovesOfPawn
} from './chess-move'

export const correctMoves = (figureName: string, columnNumber: number, fieldNumber: number) => {

    switch (figureName) {
        case 'Queen': {
            correctMovesOfQueen(columnNumber, fieldNumber)

            return
        }

        case 'King': {
            correctMovesOfKing(columnNumber, fieldNumber)

            return
        }

        case 'Bishop': {
            correctMovesOfBishop(columnNumber, fieldNumber)

            return
        }

        case 'Knight': {
            correctMovesOfKnight(columnNumber, fieldNumber)

            return
        }

        case 'Pawn': {
            correctMovesOfPawn(columnNumber, fieldNumber)

            return
        }

        case 'Rook': {
            correctMovesOfRook(columnNumber, fieldNumber)

            return
        }
        default:
            return null
    }
}