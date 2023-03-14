import { Config } from '../config'
import { Game } from '../model/rest/game/Game'
import { NewGame } from '../model/rest/game/NewGame'
import { TPlayerGame } from '../model/rest/game/dto/TPlayerGame'

export class GameServiceBackend {
  getActiveToken() {
    return JSON.parse(localStorage.getItem('logInUser')!).activeToken
  }

  async getAllCreatedGames() {
    const games: Array<Game> = await fetch(Config.baseGamesUrl + Config.getAllCreatedGamesPath, {
      method: 'GET',
    })
      .then(res => res.json())
      .catch(err => alert(err))

    return games
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

  async makeMove(move: string) {
    const activeToken: string = this.getActiveToken()

    return await fetch(Config.baseGamesUrl + Config.makeMovePath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: activeToken,
      },
      body: JSON.stringify({ move: move }),
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

  setGameToLocalStorage(player: TPlayerGame) {
    localStorage.setItem('game', JSON.stringify(player))
    window.dispatchEvent(new Event('storage'))
  }

  getGameFromLocalStorage(): TPlayerGame {
    return JSON.parse( localStorage.getItem('game')! )
  }
}