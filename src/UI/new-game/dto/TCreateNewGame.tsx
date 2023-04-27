import { GameService } from '../../../backend-service-connector/service/GameService'

export type TCreateNewGame = {
  setIsLoading: any
  gameServiceBackend: GameService
  setVisibleCreate: any
  setError: any
}