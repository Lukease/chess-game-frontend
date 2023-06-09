import { MakeMoveResponse } from '../../../backend-service-connector/model/rest/game/MakeMoveResponse'

export type TPromotePawnPanel = {
  sendPromotion: (promotedPieceName: string) => void
  makeMoveResponse?: MakeMoveResponse
}