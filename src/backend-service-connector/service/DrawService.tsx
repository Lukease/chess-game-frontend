import { Config } from '../config'
import { DrawOfferRequest } from '../model/rest/draw-offer/DrawOfferRequest'

export class DrawService {
  getActiveToken() {
    return JSON.parse(localStorage.getItem('logInUser')!).activeToken
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
    return await fetch(Config.baseGamesUrl + Config.getAllCreatedGamesPath, {
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
}