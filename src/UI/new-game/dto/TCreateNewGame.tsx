import { GameService } from '../../../backend-service-connector/service'
import React from 'react'

export type TCreateNewGame = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  gameServiceBackend: GameService
  setVisibleCreate: React.Dispatch<React.SetStateAction<boolean>>
  setError: React.Dispatch<React.SetStateAction<string>>
}