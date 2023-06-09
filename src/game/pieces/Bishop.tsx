import { Piece } from './Piece'
import { SpecialMoves } from '../../backend-service-connector/model/rest/game/SpecialMoves'
import blackBishop from '../../chess_icon/black-Bishop.svg'
import whiteBishop from '../../chess_icon/white-Bishop.svg'

export class Bishop extends Piece {
  constructor(color: string, id: string, name: string, possibleMoves: Array<SpecialMoves>) {
    super(color, id, name, possibleMoves)
  }

  getImageUrl(): string {
    return this.color === 'white' ? whiteBishop : blackBishop
  }

  getPieceIcon(): string {
    return '♗'
  }
}
