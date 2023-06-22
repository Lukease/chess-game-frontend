import { Game } from '../game/Game'
import { Piece } from '../../../../game/pieces'

export type AllHistoryGamesResponse = {
  gamesAsWhite: Array<Game>
  gamesAsBlack: Array<Game>
}

export type HistoryResponse = {
  pieces: Array<Piece>
  fieldFromTo: Array<string>
  gameInfo: Game
  kingIsChecked: Array<string>
}