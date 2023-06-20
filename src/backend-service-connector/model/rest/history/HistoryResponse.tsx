import { Game } from '../game/Game'

export type AllHistoryGamesResponse ={
  gamesAsWhite: Array<Game>
  gamesAsBlack: Array<Game>
}