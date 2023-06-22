import { Config } from '../config'
import { FetchData } from './FetchData'
import { HistoryRequest } from '../model/rest/history/HistoryRequest'
import { AllHistoryGamesResponse, HistoryResponse } from '../model/rest/history/HistoryResponse'

export class HistoryService {
  fetchData: FetchData
  private gameId: number
  private playAsWhite: boolean

  constructor() {
    this.fetchData = new FetchData()
    this.gameId = 0
    this.playAsWhite = true
  }

  async getHistoryOfGame(moveId: number): Promise<HistoryResponse> {
    const historyRequest: HistoryRequest = {
      gameId: 1,
      moveId: moveId,
      playAsWhite: false,
    }
    const url = Config.baseHistoryUrl + Config.getHistoryFromGamePath

    return await this.fetchData.requestAPI(url, 'PUT', historyRequest)
  }

  async getAllPlayerGames(): Promise<AllHistoryGamesResponse> {
    const url = Config.baseHistoryUrl
    return await this.fetchData.requestAPI(url, 'GET')
  }

  setGameHistory(id: number, isWhiteColor: boolean): void {
    this.gameId = id
    this.playAsWhite = isWhiteColor
  }
}