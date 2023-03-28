import { Piece } from './Piece'

export class Knight extends Piece {
  constructor(color: string, id: string, name: string, movingStrategies: Array<string>) {
    super(color, id, name, movingStrategies)
  }

  getImageUrl(): string {
    return require(`../../chess_icon/${this.color}-Knight.svg`)
  }

  getPieceIcon(): string {
    return '♘'
  }

}

