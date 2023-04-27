import { GameService } from '../../../backend-service-connector/service'
import { MakeMoveResponse } from '../../../backend-service-connector/model/rest/game/MakeMoveResponse'

export type TGameInfo = {
  gameService: GameService
  makeMoveResponse?:MakeMoveResponse
}