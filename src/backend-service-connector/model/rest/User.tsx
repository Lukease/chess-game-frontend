export class User {
  id: number | undefined
  login: string
  password: string
  email: string
  activeToken: string | undefined
  validUtil: string | undefined

  constructor(id: number | undefined, login: string, password: string, email: string,
              activeToken: string | undefined, validUtil: string | undefined) {
    this.id = id
    this.login = login
    this.password = password
    this.email = email
    this.activeToken = activeToken
    this.validUtil = validUtil
  }
}