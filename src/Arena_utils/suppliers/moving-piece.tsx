import {Piece} from '../chess-possible-move'

export class MovingPiece {
    selectedPiece: Piece| undefined
    coordinateX: number = 0
    coordinateY: number = 0
}