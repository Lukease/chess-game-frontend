import { MovingService } from '../../../game/suppliers'
import { MakeMoveResponse } from '../../../backend-service-connector/model/rest/game/MakeMoveResponse'

export type TAddPiecePanel = {
  movingService: MovingService
  color: string
  makeMoveResponse?:MakeMoveResponse
}