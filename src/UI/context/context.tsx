import { UserService } from '../../backend-service-connector/service'
import { createContext } from 'react'

const userService = new UserService()

export const Context = createContext(userService)
