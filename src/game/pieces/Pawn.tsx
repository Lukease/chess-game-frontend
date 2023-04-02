import { Piece } from './Piece'

export class Pawn extends Piece {
  constructor(color: string, id: string, name: string, possibleMoves: Array<string>) {
    super(color, id, name, possibleMoves)
  }

  getImageUrl(): string {
    return require(`../../chess_icon/${this.color}-Pawn.svg`)
  }

  getPieceIcon(): string {
    return ''
  }
}