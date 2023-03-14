import { GameServiceBackend } from '../../../backend-service-connector/service/GameServiceBackend'

export type TCreateNewGame = {
  setIsLoading: any
  gameServiceBackend: GameServiceBackend
  setVisibleCreate: any
  setError: any
}