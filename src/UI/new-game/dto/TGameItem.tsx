import { User } from '../../../backend-service-connector/model/rest/user/User'

export type TGameItem = {
  id: number
  timePerPlayerInSeconds: number
  gameStatus: string
  createdBy: User
  enterGame: any
  playerColor: string
}