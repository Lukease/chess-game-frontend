import { Piece } from './Piece'

export class Queen extends Piece {
  constructor(color: string, id: string, name: string, possibleMoves: Array<string>) {
    super(color, id, name, possibleMoves)
  }

  getImageUrl(): string {
    return require(`../../chess_icon/${this.color}-Queen.svg`)
  }

  getPieceIcon(): string {
    return '♕'
  }
}