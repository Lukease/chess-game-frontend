import { GameService } from '../../../backend-service-connector/service'

export type TRespondingDrawOffer = {
  sendDataToParent: any
  gameServiceBackend: GameService
  drawOfferId?: number
  isCreateOffer: boolean
}