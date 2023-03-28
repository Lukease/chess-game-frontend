import { Piece } from './Piece'

export class Queen extends Piece {
  constructor(color: string, id: string, name: string, movingStrategies: Array<string>) {
    super(color, id, name, movingStrategies)
  }

  getImageUrl(): string {
    return require(`../../chess_icon/${this.color}-Queen.svg`)
  }

  getPieceIcon(): string {
    return '♕'
  }
}