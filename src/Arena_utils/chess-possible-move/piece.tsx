import {MovingStrategy} from "./moving-strategy";
import {Coordinate} from "./coordinate";
import {CoordinateService} from "../suppliers/coordinate-service";

export abstract class Piece {
    color: string
    coordinate: Coordinate
    name: string
    movingStrategies: Array<MovingStrategy>

    protected constructor(color: string, id: string, name: string, movingStrategies: Array<MovingStrategy>) {
        this.color = color
        this.coordinate = CoordinateService.getCoordinateById(id)
        this.name = name
        this.movingStrategies = movingStrategies
    }

    abstract getAllPossibleMoves(): Array<Coordinate>

    abstract canJump(): boolean

    abstract getImageUrl(): string

}
