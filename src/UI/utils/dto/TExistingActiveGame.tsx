import { GameServiceBackend } from '../../../backend-service-connector/service/GameServiceBackend'

export type TExistingActiveGame ={
  gameServiceBackend: GameServiceBackend
  sendDataToParent: any
  activeGameId: number
}