import { Coordinate } from '../chess-possible-move'
import { CoordinateService } from '../suppliers'

export abstract class Piece {
  color: string
  currentCoordinate: Coordinate
  startingCoordinate: Coordinate
  name: string
  movingStrategies: Array<string>
  hasMoved = false

  protected constructor(color: string, id: string, name: string, movingStrategies: Array<string>) {
    this.color = color
    this.currentCoordinate = CoordinateService.getCoordinateById(id)
    this.name = name
    this.movingStrategies = movingStrategies
    this.startingCoordinate = this.currentCoordinate
  }

  abstract getImageUrl(): string

  abstract getPieceIcon(): string
}


