import { UserLogIn } from '../model/rest/user/UserLogIn'
import { User } from '../model/rest/user/User'
import { Config } from '../config'
import { ChangePasswordRequest } from '../model/rest/user/ChangePasswordRequest'
import { PlayerInfo } from '../model/rest/user/PlayerInfo'
import { FetchData } from './FetchData'

export class UserService {
  fetchData: FetchData

  constructor() {
    this.fetchData = new FetchData()
  }

  logInUser: UserLogIn | undefined

  async getAllUsers() {
    const users: Array<User> = await this.fetchData
      .requestAPI(Config.baseUsersUrl + Config.getAllUsersPath, 'GET')
      .then(data => data)
      .catch(error => console.log(error))
    return users
  }

  async addNewUser(newUser: User) {
    return await this.fetchData
      .requestAPI(Config.baseUsersUrl, 'POST', newUser)
      .then(data => data)
      .catch(error => console.log(error))
  }

  editUserLogin(newLogin: string) {
    const url = Config.baseUsersUrl + Config.editUserLoginPath
    return this.fetchData
      .requestAPI(url, 'PUT', { login: newLogin })
      .then(data => data)
      .catch(error => console.log(error))
  }

  editUserEmail(newEmail: string) {
    const url = Config.baseUsersUrl + Config.editUserEmailPath
    return this.fetchData
      .requestAPI(url, 'PUT', { email: newEmail })
      .then(data => data)
      .catch(error => console.log(error))
  }

  editUserPassword(changePasswordRequest: ChangePasswordRequest) {
    const url = Config.baseUsersUrl + Config.editUserPasswordPath
    return this.fetchData
      .requestAPI(url, 'PUT', changePasswordRequest)
      .then(data => {
        const user: User = this.getLogInUserFromLocalStorage()
        alert('Success')
        user.password = changePasswordRequest.password
        this.setLogInUserToLocalStorage(user)
        return data
      })
      .catch(error => console.log(error))
  }

  async logIn(login: string, password: string) {
    const userLogIn: UserLogIn = { login: login, password: password }

    const url = Config.baseUsersUrl + Config.logInUserPath
    return await this.fetchData
      .requestAPI(url, 'POST', userLogIn)
      .then(data => {
        this.setLogInUserToLocalStorage(data)
        return data
      })
      .catch(() => {
        this.logInUser = undefined
      })
  }

  async getAllPlayerInfo() {
    const url = Config.baseUsersUrl + Config.getAllPlayersInfoPath
    const players: Array<PlayerInfo> = await this.fetchData
      .requestAPI(url, 'GET')
      .then(data => data)
      .catch(error => console.log(error))

    return players
  }

  async getPlayerInfo() {
    const url = Config.baseUsersUrl + Config.getPlayerInfoPath
    const players: PlayerInfo = await this.fetchData
      .requestAPI(url, 'GET')
      .then(data => data)
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
