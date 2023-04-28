import { UserLogIn } from '../model/rest/user/UserLogIn'
import { User } from '../model/rest/user/User'
import { Config } from '../config'
import { ChangePasswordRequest } from '../model/rest/user/ChangePasswordRequest'
import { PlayerInfo } from '../model/rest/user/PlayerInfo'

export class UserService {
  logInUser: UserLogIn | undefined

  getActiveToken() {
    return JSON.parse(localStorage.getItem('logInUser')!).activeToken
  }

  async getAllUsers() {
    const users: Array<User> = await fetch(Config.baseUsersUrl + Config.getAllUsersPath, {
      method: 'GET',
    })
      .then((response) => {
        return response.json().then((data) => {

          return data
        })
      })
      .catch(error => console.log(error))

    return users

  }

  async addNewUser(newUser: User) {
    return await fetch(Config.baseUsersUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(newUser),
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

  editUserLogin(newLogin: string) {
    const activeToken: string = this.getActiveToken()

    fetch(Config.baseUsersUrl + Config.editUserLoginPath, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: activeToken,
      },
      body: JSON.stringify({ login: newLogin }),
    })
      .then(response => response.json())
      .catch(error => error)
  }

  editUserEmail(newEmail: string) {
    const activeToken: string = this.getActiveToken()

    fetch(Config.baseUsersUrl + Config.editUserEmailPath, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: activeToken,
      },
      body: JSON.stringify({ email: newEmail }),
    })
      .then(response => response.json())
      .catch(error => error)
  }

  editUserPassword(changePasswordRequest: ChangePasswordRequest) {
    const activeToken: string = this.getActiveToken()

    fetch(Config.baseUsersUrl + Config.editUserPasswordPath, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: activeToken,
      },
      body: JSON.stringify(changePasswordRequest),
    })
      .then(response => {
        if (response.ok) {
          const user: User = this.getLogInUserFromLocalStorage()

          alert('Succes')
          user.password = changePasswordRequest.password
          this.setLogInUserToLocalStorage(user)

          return response.json()
        } else {
          alert('Wrong data!')
        }
      })
      .catch(error => error)
  }

  async logIn(login: string, password: string) {
    const userLogIn: UserLogIn = { login: login, password: password }

    return await fetch(Config.baseUsersUrl + Config.logInUserPath, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(userLogIn),
    })
      .then(response => {
        return response.json()
          .then((data) => {
            this.logInUser = data
            this.setLogInUserToLocalStorage(data)

            return data
          })
          .catch(() => {
            this.logInUser = undefined
          })
      })
  }

  async getAllPlayerInfo() {
    const players: Array<PlayerInfo> = await fetch(Config.baseUsersUrl + Config.getAllPlayersInfoPath, {
      method: 'GET',
    })
      .then((response) => {
        return response.json().then((data) => {

          return data
        })
      })
      .catch(error => console.log(error))

    return players

  }

  async getPlayerInfo() {
    const activeToken: string = this.getActiveToken()

    const players: PlayerInfo = await fetch(Config.baseUsersUrl + Config.getPlayerInfoPath, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: activeToken,
      }
    })
      .then((response) => {
        return response.json().then((data) => {

          return data
        })
      })
      .catch(error => console.log(error))

    return players

  }
  setLogInUserToLocalStorage(user: User | undefined) {
    localStorage.setItem('logInUser', JSON.stringify(user))
    window.dispatchEvent(new Event('storage'))
  }

  getLogInUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem('logInUser')!)
  }
}