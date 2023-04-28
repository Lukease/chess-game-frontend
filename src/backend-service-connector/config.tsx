export class Config {
  static readonly baseUsersUrl = 'http://localhost:8080/users'
  static readonly getAllUsersPath = '/get-all'
  static readonly logInUserPath = '/log-in'
  static readonly editUserEmailPath = '/new-email'
  static readonly editUserLoginPath = '/new-login'
  static readonly editUserPasswordPath = '/new-password'
  static readonly getAllPlayersInfoPath = '/all-players'
  static readonly getPlayerInfoPath = '/player'

  static readonly baseGamesUrl = 'http://localhost:8080/games'
  static readonly getAllCreatedGamesPath = '/get-all'
  static readonly getActiveGamePath = '/get-active'
  static readonly getActiveGameAndReturnMovesPath = '/get-in-progress'
  static readonly resignGamePath = '/resign'
  static readonly joinGamePath = '/join-game'
  static readonly makeMovePath = '/make-move'

  static readonly baseDrawOfferUrl = 'http://localhost:8080/games/draw-offers'
  static readonly responseDrawOfferUrl = '/response'
}