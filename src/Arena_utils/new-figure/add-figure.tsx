import {Bishop, King, Knight, Pawn, Queen, Rook} from '../chess-possible-move'


export const addPiece = (figureName: string, columnNumber: number, fieldNumber: number, color: string, id: string) => {

    switch (figureName) {
        case 'Queen': {

            return new Queen(color,id,[columnNumber,fieldNumber],figureName)
        }

        case 'King': {

            return new King(color,id,[columnNumber,fieldNumber],figureName)
        }

        case 'Bishop': {

            return new Bishop(color,id,[columnNumber,fieldNumber],figureName)
        }

        case 'Knight': {

            return new Knight(color,id,[columnNumber,fieldNumber],figureName)
        }

        case 'Pawn': {

            return new Pawn(color,id,[columnNumber,fieldNumber],figureName)
        }

        case 'Rook': {

            return new Rook(color,id,[columnNumber,fieldNumber],figureName)
        }
        default:
            return null
    }
}