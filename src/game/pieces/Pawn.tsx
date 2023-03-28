import { Piece } from './Piece'

export class Pawn extends Piece {

  constructor(color: string, id: string, name: string, movingStrategies: Array<string>) {
    super(color, id, name, movingStrategies)
  }

  getImageUrl(): string {
    return require(`../../chess_icon/${this.color}-Pawn.svg`)
  }

  getPieceIcon(): string {
    return ''
  }

}