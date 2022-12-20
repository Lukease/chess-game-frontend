import {MovingStrategy, Vector2d, Coordinate} from '../chess-possible-move'
import {CoordinateService} from '../suppliers'
import {MoveType} from "../suppliers/move-type"

export abstract class Piece {
    color: string
    currentCoordinate: Coordinate
    startingCoordinate: Coordinate
    name: string
    movingStrategies: Array<MovingStrategy>
    hasMoved: boolean = false

    protected constructor(color: string, id: string, name: string, movingStrategies: Array<MovingStrategy>) {
        this.color = color
        this.currentCoordinate = CoordinateService.getCoordinateById(id)
        this.name = name
        this.movingStrategies = movingStrategies
        this.startingCoordinate = this.currentCoordinate
    }

    abstract getAllPossibleDirections(): Array<Vector2d>

    getAllPossibleDirectionsWithColor(): Array<Vector2d> {
        if (this.name === 'Pawn' && this.color === 'black') {
            return this.getAllPossibleDirections().map(direction => new Vector2d(direction.x, direction.y * -1))
        } else {
            return this.getAllPossibleDirections()
        }

    }

    abstract getImageUrl(): string

    canDelete() {
        return true
    }

    isInStartingPosition() {
        return this.startingCoordinate === this.currentCoordinate
    }

    getSpecialMoves(): Array<MoveType> {
        return []
    }

    setHasMoved(): boolean {
        return this.hasMoved = true
    }

    abstract canMoveMultipleSquares(): boolean

    abstract getPieceIcon(): string

    abstract canGoToTheSameField(): boolean

    isPawn(): boolean {
        return false
    }
}


