import { Config } from '../config'
import { FetchData } from './FetchData'
import { PositionEditorInfo } from '../model/rest/game/PositionEditorInfo'
import { HistoryRequest } from '../model/rest/history/HistoryRequest'
import { AllHistoryGamesResponse } from '../model/rest/history/HistoryResponse'

export class HistoryService {
  fetchData: FetchData
  private gameId: number
  private playAsWhite: boolean

  constructor() {
    this.fetchData = new FetchData()
    this.gameId = 0
    this.playAsWhite = true
  }

  async getHistoryOfGame(moveId: number): Promise<PositionEditorInfo> {
    const historyRequest: HistoryRequest = { gameId: this.gameId, moveId: moveId, playAsWhite: this.playAsWhite }
    const url = Config.baseHistoryUrl + Config.getHistoryFromGamePath
    return await this.fetchData.requestAPI(url, 'GET', historyRequest)
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