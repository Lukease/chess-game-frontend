import { Config } from '../config'
import { Game } from '../model/rest/game/Game'
import { NewGame } from '../model/rest/game/NewGame'
import { TPlayerGame } from '../model/rest/game/dto/TPlayerGame'
import { MakeMoveRequest } from '../model/rest/game/MakeMoveRequest'
import { DrawOfferRequest } from '../model/rest/draw-offer/DrawOfferRequest'

export class GameServiceBackend {
  getActiveToken() {
    return JSON.parse(localStorage.getItem('logInUser')!).activeToken
  }

  async resignGameUser() {
    const activeToken: string = this.getActiveToken()
    const games: Array<Game> = await fetch(Config.baseGamesUrl + Config.resignGamePath, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: activeToken,
      },
    })
      .then(res => res.json())
      .catch(err => alert(err))

    return games
  }

  async getAllCreatedGames() {
    const activeToken: string = this.getActiveToken()
    const games: Array<Game> = await fetch(Config.baseGamesUrl + Config.getAllCreatedGamesPath, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: activeToken,
      },
    })
      .then(res => {

        return res.json()
      })
    // .catch(err => alert(err))

    return games
  }

  async getActiveGame() {
    const activeToken: string = this.getActiveToken()
    const games: Game = await fetch(Config.baseGamesUrl + Config.getActiveGamePath, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: activeToken,
      },
    })
      .then(res => res.json())
      .catch(err => alert(err))

    return games
  }

  async getActiveGameAndReturnMoves(): Promise<any> {
    const activeToken: string = this.getActiveToken()
    return await fetch(Config.baseGamesUrl + Config.getActiveGameAndReturnMovesPath, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: activeToken,
      },
    })
      .then(res => res.json())
  }

  async createGame(newGame: NewGame) {
    const activeToken: string = this.getActiveToken()

    return await fetch(Config.baseGamesUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: activeToken,
      },
      body: JSON.stringify(newGame),
    })
      .then(response => {
        return response.json()
          .then((data) => {
            return data
          })
          .catch(error => {
            alert(error)
          })
      })
  }

  async makeMove(move: MakeMoveRequest) {
    const activeToken: string = this.getActiveToken()
    console.log(move)
    return await fetch(Config.baseGamesUrl + Config.makeMovePath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: activeToken,
      },
      body: JSON.stringify(move),
    })
  }

  async joinGame(gameId: number) {
    const activeToken: string = this.getActiveToken()

    return await fetch(Config.baseGamesUrl + Config.joinGamePath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: activeToken,
      },
      body: JSON.stringify({ gameId: gameId }),
    })
      .then(response => {
        return response.json()
          .then((data) => {
            return data
          })
          .catch(() => alert('Game not found, refresh page!'))
      })
  }

  async createDrawOffer() {
    const activeToken: string = this.getActiveToken()
    return await fetch(Config.baseDrawOfferUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: activeToken,
      },
    })
      .then(response => {
        return response.json()
          .then((data) => {
            return data
          })
          .catch(error => {
            alert(error)
          })
      })
  }

  async responseDrawOffer(drawOfferRequest: DrawOfferRequest) {
    const activeToken: string = this.getActiveToken()

    return await fetch(Config.baseDrawOfferUrl + Config.responseDrawOfferUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: activeToken,
      },
      body: JSON.stringify(drawOfferRequest),
    })
      .then(response => {
        return response.json()
          .then((data) => {
            return data
          })
          .catch(error => {
            alert(error)
          })
      })
  }

  async getDrawOffer() {
    const activeToken: string = this.getActiveToken()
    return await fetch(Config.baseDrawOfferUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: activeToken,
      },
    })
      .then(res => res.json())
      .catch(err => alert(err))
  }

  setGameToLocalStorage(player: TPlayerGame) {
    localStorage.setItem('game', JSON.stringify(player))
    window.dispatchEvent(new Event('storage'))
  }

  getGameFromLocalStorage(): TPlayerGame {
    return JSON.parse(localStorage.getItem('game')!)
  }
}