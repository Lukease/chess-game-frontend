import { Game } from '../../../backend-service-connector/model/rest/game/Game'

export type TGamesContainer = {
  games: Array<Game>
  title: string
  isWhitePlayer: boolean
}