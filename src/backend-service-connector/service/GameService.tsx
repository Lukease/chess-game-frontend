import { Config } from '../config'
import { NewGame } from '../model/rest/game/NewGame'
import { TPlayerGame } from '../model/rest/game/dto/TPlayerGame'
import { MakeMoveRequest } from '../model/rest/game/MakeMoveRequest'
import { DrawOfferRequest } from '../model/rest/game/DrawOfferRequest'
import { Game } from '../model/rest/game/Game'
import { NewPosition } from '../model/rest/game/NewPosition'

export class GameService {
  getActiveToken() {
    return JSON.parse(localStorage.getItem('logInUser')!).activeToken
  }

  async requestAPI(url: string, method: string, body?: any) {
    const activeToken = this.getActiveToken()

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: activeToken,
    }

    const requestOptions = {
      method,
      headers,
      body: JSON.stringify(body),
    }


    const response = await fetch(url, requestOptions)
    const data = await response.json()

    const { message, status } = data
    console.log(status)
    console.log(message)
    if (message == "No active Token found" && window.location.href !== 'http://localhost:3000/new-game') {
      alert(message)
      window.location.href = 'http://localhost:3000/new-game'
    }

    return data
  }

  async resignGameUser() {
    const url = Config.baseGamesUrl + Config.resignGamePath
    return await this.requestAPI(url, 'PUT')
  }

  async getAllCreatedGames(): Promise<Array<Game>> {
    const url = Config.baseGamesUrl + Config.getAllCreatedGamesPath
    return await this.requestAPI(url, 'GET')
  }

  async getActiveGame() {
    const url = Config.baseGamesUrl + Config.getActiveGamePath
    return await this.requestAPI(url, 'GET')
  }

  async getActiveGameAndReturnMoves() {
    const url = Config.baseGamesUrl + Config.getActiveGameAndReturnMovesPath
    return await this.requestAPI(url, 'GET')
  }

  async createGame(newGame: NewGame) {
    const url = Config.baseGamesUrl
    return await this.requestAPI(url, 'POST', newGame)
  }

  async makeMove(move: MakeMoveRequest) {
    const url = Config.baseGamesUrl + Config.makeMovePath
    return await this.requestAPI(url, 'POST', move)
  }

  async joinGame(gameId: number) {
    const url = Config.baseGamesUrl + Config.joinGamePath
    return await this.requestAPI(url, 'POST', { gameId })
  }

  async createDrawOffer() {
    const url = Config.baseDrawOfferUrl
    return await this.requestAPI(url, 'POST')
  }

  async responseDrawOffer(drawOfferRequest: DrawOfferRequest) {
    const url = Config.baseDrawOfferUrl + Config.responseDrawOfferUrl
    return await this.requestAPI(url, 'PUT', drawOfferRequest)
  }

  async getDrawOffer() {
    const url = Config.baseDrawOfferUrl
    return await this.requestAPI(url, 'GET')
  }

  async getCurrentPositionEditorPieces() {
    const url = Config.baseGamesUrl + Config.getCurrentPositionEditorPieces
    return await this.requestAPI(url, 'GET')
  }

  async getDefaultPositionEditorPieces() {
    const url = Config.baseGamesUrl + Config.getDefaultPositionEditorPieces
    return await this.requestAPI(url, 'GET')
  }

  async removePieceFromPositionEditor(removedPieceId: string) {
    const url = Config.baseGamesUrl + Config.removePieceFromPositionEditor + `?pieceId=${removedPieceId}`
    return await this.requestAPI(url, 'PUT')
  }

  async ChangePositionOfPieceFromPositionEditor(newPosition: NewPosition) {
    const url = Config.baseGamesUrl + Config.changePositionOfPiece
    return await this.requestAPI(url, 'PUT', newPosition)
  }

  setGameToLocalStorage(player: TPlayerGame) {
    localStorage.setItem('game', JSON.stringify(player))
  }
}