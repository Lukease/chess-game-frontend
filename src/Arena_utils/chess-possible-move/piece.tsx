import {Move} from './move'

export abstract class Piece {
    color: string
    id: string
    position: Array<number>
    name: string

    constructor(color: string, id: string, position: Array<number>, name:string) {
        this.color = color
        this.id = id
        this.position = position
        this.name = name
    }

    abstract getAllPossibleMoves(): Move[]

    abstract getImageUrl(): string

}
