import React, { useContext, useEffect, useState } from 'react'
import { ContextUser } from '../context/contextUser'
import { User } from '../../backend-service-connector/model/rest/user/User'

export function UserAbout(): JSX.Element {
  const userService = useContext(ContextUser)
  const [userLogin, setUserLogin] = useState('')
  const [userEmail, setUserEmail] = useState('')

  window.addEventListener('storage', () => {
    const changedData: User = userService.getLogInUserFromLocalStorage()

    setUserLogin(changedData.login)
    setUserEmail(changedData.email)
  })

  useEffect(() => {
    const loggedUser: User = userService.getLogInUserFromLocalStorage()

    setUserLogin(loggedUser.login)
    setUserEmail(loggedUser.email)
  }, [])

  return (
    <div className={'user'}>
      <div className={'user__image'}></div>
      <div className={'user__about'}>
        <div className={'user__container'}>
          <h3>Login:</h3>
          <div className={'user__container--nav'}>
            <span>{userLogin}</span>
          </div>
        </div>
        <div className={'user__container'}>
          <h3>Email:</h3>
          <span>{userEmail}</span>
        </div>
      </div>
    </div>
  )
}