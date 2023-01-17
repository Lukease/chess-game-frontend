import {UserDto} from '../model/rest/userDto'
import {Config} from '../config'

export class UserService {
    allUsers: Array<UserDto> = []

    async getAllUsers() {
        const users: Array<UserDto> = await fetch(Config.baseUrl + Config.getAllUsersPath, {
            method: 'GET'
        })
            .then((response) => {
                return response.json().then((data) => {

                    return data
                })
            })
            .catch(error => console.log(error))

        this.allUsers = users.map(value => value)
        return users

    }

    async addNewUser(newUser: UserDto) {
        return await fetch(Config.baseUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
            body: JSON.stringify(newUser)
        })
            .then(response => {
                return response.json()
                    .then((data) => {
                        return data
                    })
                    .catch(error => {
                        return error
                    })
            })
    }

    removeUserByLogin(login
                          :
                          string
    ) {
        fetch(Config.baseUrl + `?login=${login}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        })
            .then(response => response.json())
            .catch(error => error)

        return login
    }

    getUserByLogin(login
                       :
                       string
    ) {
        fetch(Config.baseUrl + `?login=${login}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        })
            .then(response => response.json())
            .catch(error => error)

        return login
    }

    editUserEmailById(userId
                          :
                          number, newEmail
                          :
                          string
    ) {
        fetch(Config.baseUrl + `/${userId}/${newEmail}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        })
            .then(response => response.json())
            .catch(error => error)
    }

    editUserPasswordById(userId
                             :
                             number, newEmail
                             :
                             string
    ) {
        fetch(Config.baseUrl + `/${userId}/${newEmail}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        })
            .then(response => response.json())
            .catch(error => error)
    }

    editUserLoginById(userId
                          :
                          number, newEmail
                          :
                          string
    ) {
        fetch(Config.baseUrl + `/${userId}/${newEmail}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        })
            .then(response => response.json())
            .catch(error => error)
    }

}