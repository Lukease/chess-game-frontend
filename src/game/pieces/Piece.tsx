import { SpecialMoves } from '../../backend-service-connector/model/rest/game/SpecialMoves'

export abstract class Piece {
  color: string
  id: string
  name: string
  possibleMoves: Array<SpecialMoves>

  protected constructor(color: string, id: string, name: string, possibleMoves: Array<SpecialMoves>) {
    this.color = color
    this.id = id
    this.name = name
    this.possibleMoves = possibleMoves
  }

  abstract getImageUrl(): string

  abstract getPieceIcon(): string
}


