export class DrawOfferRequest {
  gameOfferId: number
  playerResponse: boolean

  constructor(gameOfferId: number, playerResponse: boolean) {
    this.gameOfferId = gameOfferId
    this.playerResponse = playerResponse
  }
}