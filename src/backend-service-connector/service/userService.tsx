import {UserDto} from '../model/rest/userDto'
import {Config} from '../config'

export class UserService {
    getAllUsers() {
        let allUsers: Array<UserDto> = []
        fetch(Config.baseUrl + Config.getAllUsersPath, {
            method: 'GET'
        })
            .then(async response => allUsers = allUsers.concat(JSON.parse(await response.text())))
            .then(r => console.log(r))
            .catch(error => console.log(error))

        return allUsers
    }

    addNewUser(newUser: UserDto) {
        fetch(Config.baseUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
            body: JSON.stringify(newUser)
        })
            .then(response => console.log(response.json()) )
            .catch(error => console.log(error))

        return newUser
    }

    removeUserByLogin(login: string){
        fetch(Config.baseUrl+`?login=${login}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        })
            .then(response => response.json())
            .catch(error => error)

        return login
    }
}