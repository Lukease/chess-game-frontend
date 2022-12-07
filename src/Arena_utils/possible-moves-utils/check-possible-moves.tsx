import {
    correctMovesOfRook,
    correctMovesOfPawn,
    correctMovesOfKing,
    correctMovesOfKnight
} from '../chess-possible-move'

export const checkPossibleMoves = (figureName: string, columnNumber: number, fieldNumber: number, color: string) => {
    //
    // switch (figureName) {
    //     case 'Queen': {
    //
    //         return correctMovesOfQueen(columnNumber, fieldNumber, color)
    //     }
    //
    //     case 'King': {
    //
    //         return correctMovesOfKing(columnNumber, fieldNumber, color)
    //     }
    //
    //     case 'Bishop': {
    //
    //         return correctMovesOfBishop(columnNumber, fieldNumber, color)
    //     }
    //
    //     case 'Knight': {
    //
    //         return correctMovesOfKnight(columnNumber, fieldNumber, color)
    //     }
    //
    //     case 'Pawn': {
    //
    //         return correctMovesOfPawn(columnNumber, fieldNumber, color)
    //     }
    //
    //     case 'Rook': {
    //
    //         return correctMovesOfRook(columnNumber, fieldNumber, color)
    //     }
    //     default:
    //         return null
    // }
}