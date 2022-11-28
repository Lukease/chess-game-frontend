import {Move} from './move'
import {MovingStrategy} from "./moving-strategy";

export abstract class Piece {
    color: string
    id: string
    position: Array<number>
    name: string
    movingStrategies: Array<MovingStrategy>

    constructor(color: string, id: string, position: Array<number>, name:string, movingStrategies: Array<MovingStrategy>) {
        this.color = color
        this.id = id
        this.position = position
        this.name = name
        this.movingStrategies = movingStrategies
    }

    abstract getAllPossibleMoves(): Move[]

    abstract getImageUrl(): string

}
