import { GameService } from '../../../backend-service-connector/service'
import { MakeMoveResponse } from '../../../backend-service-connector/model/rest/game/MakeMoveResponse'

export type TPromotePawnPanel = {
  gameService: GameService,
  sendPromotion: any
  makeMoveResponse?: MakeMoveResponse
}