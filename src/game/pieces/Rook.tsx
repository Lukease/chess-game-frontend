import { Piece } from './Piece'

export class Rook extends Piece {
  constructor(color: string, id: string, name: string, movingStrategies: Array<string>) {
    super(color, id, name, movingStrategies)
  }

  getImageUrl(): string {
    return require(`../../chess_icon/${this.color}-Rook.svg`)
  }

  getPieceIcon(): string {
    return '♖'
  }
}
