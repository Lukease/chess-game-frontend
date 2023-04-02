export abstract class Piece {
  color: string
  id: string
  name: string
  possibleMoves: Array<string>

  protected constructor(color: string, id: string, name: string, possibleMoves: Array<string>) {
    this.color = color
    this.id = id
    this.name = name
    this.possibleMoves = possibleMoves
  }

  abstract getImageUrl(): string

  abstract getPieceIcon(): string
}


