import { Piece } from './Piece'

export class Bishop extends Piece {
  constructor(color: string, id: string, name: string, movingStrategies: Array<string>) {
    super(color, id, name, movingStrategies)
  }

  getImageUrl(): string {
    return require(`../../chess_icon/${this.color}-Bishop.svg`)
  }

  getPieceIcon(): string {
    return '♗'
  }

}
