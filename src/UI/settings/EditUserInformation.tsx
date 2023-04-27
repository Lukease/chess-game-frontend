import React, { useContext, useState } from 'react'
import { User } from '../../backend-service-connector/model/rest/user/User'
import { ContextUser } from '../context/contextUser'
import { ChangePasswordRequest } from '../../backend-service-connector/model/rest/user/ChangePasswordRequest'
import { ErrorWindow } from "../utils/ErrorWindow"

export function EditUserInformation(): JSX.Element {
  const userService = useContext(ContextUser)
  const [userLogin, setUserLogin] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [oldUserPassword, setOldUserPassword] = useState('')
  const [newUserPassword, setNewUserPassword] = useState('')
  const [confirmUserPassword, setConfirmUserPassword] = useState('')
  const [error, setError] = useState('')

  const setNewUserDataToDb = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, isLogin: boolean) => {
    event.preventDefault()

    const user: User = userService.getLogInUserFromLocalStorage()

    if (isLogin) {
      setUserLogin(userLogin)
      userService.editUserLogin(userLogin)
      user.login = userLogin
    } else {
      setUserEmail(userEmail)
      userService.editUserEmail(userEmail)
      user.email = userEmail
    }

    userService.setLogInUserToLocalStorage(user)
  }

  const setNewPasswordToDb = (event: any) => {
    event.preventDefault()

    if (confirmUserPassword === newUserPassword) {
      const changePasswordRequest: ChangePasswordRequest = {
        oldPassword: oldUserPassword,
        password: newUserPassword
      }

      return userService.editUserPassword(changePasswordRequest)
    }
      return setError('Wrong password!')
  }

  const closeError = () => {
    setError('')
  }

  return (
    <div className={'editor-container'}>
      {
        error
          ? <ErrorWindow message={error} sendDataToParent={closeError} />
          : null
      }
      <h1 className={'editor-container__title'}> Edit Profile </h1>
      <label> Set login </label>
      <form className={'editor-container__nav'}>
        <input
          type={'text'}
          placeholder={'New login'}
          name='login'
          required minLength={5}
          onChange={event => setUserLogin(event.target.value)}
        />
        <button
          type={'submit'}
          onClick={event => setNewUserDataToDb(event, true)}
        >
          Edit login
        </button>
      </form>
      <label> Set email</label>
      <form className={'editor-container__nav'}>
        <input
          type={'email'}
          placeholder={'New email address'}
          required minLength={5}
          onChange={event => setUserEmail(event.target.value)}
        />
        <button
          type={'submit'}
          onClick={event => setNewUserDataToDb(event, false)}
        >
          Edit Email
        </button>
      </form>
      <label> Set Password</label>
      <form
        className={'editor-container__nav'}
        onSubmit={event =>setNewPasswordToDb(event)}
      >
        <input
          type={'password'}
          placeholder={'🔑 Old password'}
          required={true}
          onChange={event => setOldUserPassword(event.target.value)}
        />
        <input
          type={'password'}
          placeholder={'🔑 New password'}
          required={true} minLength={5}
          onChange={event => setNewUserPassword(event.target.value)}
        />
        <input
          type={'password'}
          placeholder={'🔑 Confirm new password'}
          required={true} minLength={5}
          onChange={event => setConfirmUserPassword(event.target.value)}
        />
        <button
          type={'submit'}
        >
          Edit Password
        </button>
      </form>
    </div>
  )
}