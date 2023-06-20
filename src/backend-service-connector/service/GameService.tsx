import { Config } from '../config'
import { NewGame } from '../model/rest/game/NewGame'
import { TPlayerGame } from '../model/rest/game/dto/TPlayerGame'
import { MakeMoveRequest } from '../model/rest/game/MakeMoveRequest'
import { DrawOfferRequest } from '../model/rest/game/DrawOfferRequest'
import { Game } from '../model/rest/game/Game'
import { FetchData } from './FetchData'

export class GameService {
  fetchData: FetchData

  constructor() {
    this.fetchData = new FetchData()
  }

  async resignGameUser() {
    const url = Config.baseGamesUrl + Config.resignGamePath
    return await this.fetchData.requestAPI(url, 'PUT')
  }

  async getAllCreatedGames(): Promise<Array<Game>> {
    const url = Config.baseGamesUrl + Config.getAllCreatedGamesPath
    return await this.fetchData.requestAPI(url, 'GET')
  }

  async getActiveGame() {
    const url = Config.baseGamesUrl + Config.getActiveGamePath
    return await this.fetchData.requestAPI(url, 'GET')
  }

  async getActiveGameAndReturnMoves() {
    const url = Config.baseGamesUrl + Config.getActiveGameAndReturnMovesPath
    return await this.fetchData.requestAPI(url, 'GET')
  }

  async createGame(newGame: NewGame) {
    const url = Config.baseGamesUrl
    return await this.fetchData.requestAPI(url, 'POST', newGame)
  }

  async makeMove(move: MakeMoveRequest) {
    const url = Config.baseGamesUrl + Config.makeMovePath
    return await this.fetchData.requestAPI(url, 'POST', move)
  }

  async joinGame(gameId: number) {
    const url = Config.baseGamesUrl + Config.joinGamePath
    return await this.fetchData.requestAPI(url, 'POST', { gameId })
  }

  async createDrawOffer() {
    const url = Config.baseDrawOfferUrl
    return await this.fetchData.requestAPI(url, 'POST')
  }

  async responseDrawOffer(drawOfferRequest: DrawOfferRequest) {
    const url = Config.baseDrawOfferUrl + Config.responseDrawOfferUrl
    return await this.fetchData.requestAPI(url, 'PUT', drawOfferRequest)
  }

  async getDrawOffer() {
    const url = Config.baseDrawOfferUrl
    return await this.fetchData.requestAPI(url, 'GET')
  }

  setGameToLocalStorage(player: TPlayerGame) {
    localStorage.setItem('game', JSON.stringify(player))
  }
}