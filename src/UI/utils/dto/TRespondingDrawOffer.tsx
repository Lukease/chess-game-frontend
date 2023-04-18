import { GameServiceBackend } from '../../../backend-service-connector/service'

export type TRespondingDrawOffer = {
  sendDataToParent: any
  gameServiceBackend: GameServiceBackend
  drawOfferId?: number
  isCreateOffer: boolean
}