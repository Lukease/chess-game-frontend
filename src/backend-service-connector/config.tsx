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

  static readonly basePositionEditorUrl = 'http://localhost:8080/position-editor'
  static readonly getCurrentPositionEditorPieces = '/current'
  static readonly getDefaultPositionEditorPieces = '/default'
  static readonly removePieceFromPositionEditor = '/remove-piece'
  static readonly changePositionOfPiece = '/new-position'
  static readonly setOwnFen = '/set-own'

  static readonly baseDrawOfferUrl = 'http://localhost:8080/games/draw-offers'
  static readonly responseDrawOfferUrl = '/response'

  static readonly baseHistoryUrl = 'http://localhost:8080/history'
  static readonly getHistoryFromGamePath = '/get-game'
}