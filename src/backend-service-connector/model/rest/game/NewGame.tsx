export class NewGame {
  isWhitePlayer: boolean
  timePerPlayerInSeconds: number

  constructor(isWhitePlayer: boolean, timePerPlayerInSeconds: number) {
    this.isWhitePlayer = isWhitePlayer
    this.timePerPlayerInSeconds = timePerPlayerInSeconds
  }
}