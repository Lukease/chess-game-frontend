import { Piece } from './Piece'

export class King extends Piece {
  constructor(color: string, id: string, name: string, possibleMoves: Array<string>) {
    super(color, id, name, possibleMoves)
  }

  getImageUrl(): string {
    return require(`../../chess_icon/${this.color}-King.svg`)
  }

  getPieceIcon(): string {
    return '♔'
  }
}