export class FetchData {
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

    if (message){
      alert(message)
    }

    if (message == "No active Token found" && window.location.href !== 'http://localhost:3000/new-game') {
      alert(message)
      window.location.href = 'http://localhost:3000/new-game'
    }

    return data
  }
}