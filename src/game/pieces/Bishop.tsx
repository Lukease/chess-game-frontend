import { Piece } from './Piece'
import { SpecialMoves } from '../../backend-service-connector/model/rest/game/SpecialMoves'

export class Bishop extends Piece {
  constructor(color: string, id: string, name: string, possibleMoves: Array<SpecialMoves>) {
    super(color, id, name, possibleMoves)
  }

  getImageUrl(): string {
    return require(`../../chess_icon/${this.color}-Bishop.svg`)
  }

  getPieceIcon(): string {
    return '♗'
  }
}
