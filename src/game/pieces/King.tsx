import { Piece } from './Piece'
import { SpecialMoves } from '../../backend-service-connector/model/rest/game/SpecialMoves'
import blackKing from '../../chess_icon/black-King.svg'
import whiteKing from '../../chess_icon/white-King.svg'

export class King extends Piece {
  constructor(color: string, id: string, name: string, possibleMoves: Array<SpecialMoves>) {
    super(color, id, name, possibleMoves)
  }

  getImageUrl(): string {
    return this.color === 'white' ? whiteKing : blackKing
  }

  getPieceIcon(): string {
    return '♔'
  }
}