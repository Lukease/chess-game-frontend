import { UserLogIn } from '../model/rest/UserLogIn'
import { User } from '../model/rest/User'
import { Config } from '../config'

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

  async logIn(login: string, password: string) {
    const userLogIn: UserLogIn = new UserLogIn(login, password)

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

  setLogInUserToLocalStorage(user: User | undefined) {
    localStorage.setItem('logInUser', JSON.stringify(user))
    window.dispatchEvent(new Event('storage'))
  }

  getLogInUserFromLocalStorage() {
    return JSON.parse(localStorage.getItem('logInUser')!)
  }
}