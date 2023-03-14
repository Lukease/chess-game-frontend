import React, { useContext, useState } from 'react'
import { Context } from '../context/context'
import { User } from '../../backend-service-connector/model/rest/user/User'

export function LoginNavigation(): JSX.Element {
  const userService = useContext(Context)
  const [isSignInForm, setSignInForm] = useState(true)
  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loginMessage, setLoginMessage] = useState('')
  const [registerMessage, setRegisterMessage] = useState('')
  const [isHoverRegister, setIsHoverRegister] = useState(false)
  const [userUnderstandPolity, setUserUnderstandPolity] = useState(false)

  const signIn = async (e: any) => {
    setLoginMessage('')
    e.preventDefault()

    const userLogged = await userService.logIn(login, password)

    if (userLogged) {
      window.location.href = 'http://localhost:3000/game'

    } else {
      const incorrectData = 'Incorrect login or password'

      setLoginMessage(incorrectData)
    }

    setPassword('')
    setLogin('')
  }

  const register = async (e: any) => {
    e.preventDefault()

    const equalsPassword: boolean = password === confirmPassword
    const allUsers: Array<User> = await userService.getAllUsers()
    const userLoginExist: User | undefined = allUsers.find(user => user.login === login)
    const userEmailExist: User | undefined = allUsers.find(user => user.email === email)
    const userDontExist: boolean = !userLoginExist && !userEmailExist

    if (equalsPassword && userDontExist && userUnderstandPolity) {
      const userDto: User = new User(undefined, login, password, email, undefined, undefined)

      await userService.addNewUser(userDto)
      window.location.reload()
    }

    setMessageWhenRegisterUsedWrongData(equalsPassword, userLoginExist, userEmailExist)
  }

  const setMessageWhenRegisterUsedWrongData = (equalsPassword: boolean, userLoginExist: User | undefined,
                                               userEmailExist: User | undefined) => {
    let errorMessage = ''

    if (!equalsPassword) {
      errorMessage = 'Wrong password'
    }

    if (userLoginExist) {
      errorMessage += ' User login '
    }

    if (userEmailExist) {
      errorMessage += 'email '
    }

    if (userEmailExist || userLoginExist) {
      errorMessage += 'exist'
    }

    setPassword('')
    setConfirmPassword('')
    setRegisterMessage(errorMessage)
  }

  return (
    <form
      className={'form'}
      onSubmit={event => isSignInForm ? signIn(event) : register(event)}
    >
      <div className={'form__title'}>
        {
          isSignInForm ? 'Sign In' : 'Register'
        }
      </div>
      {
        isSignInForm && loginMessage !== '' ?
          <label
            style={{ color: 'red' }}>
            {loginMessage}
          </label>
          : null
      }
      {
        !isSignInForm && registerMessage !== '' ?
          <label
            style={{ color: 'red' }}>
            {registerMessage}
          </label>
          : null
      }
      <div className='input-container'>
        <label>Login</label>
        <input
          placeholder={'👤 set login'}
          type='text'
          name='login'
          required
          value={login}
          onChange={event => setLogin(event.target.value)} />
      </div>
      {
        isSignInForm ?
          null :
          <div className='input-container'>
            <label>Email </label>
            <input
              placeholder={'✉ set email address'}
              type='email' name='email'
              required minLength={5}
              value={email}
              onChange={event => setEmail((event.target.value))} />
          </div>
      }
      <div className='input-container'>
        <label>Password </label>
        <input
          placeholder={'🔑 set password'}
          type='password' name='password'
          required minLength={5}
          value={password}
          onChange={event => setPassword(event.target.value)} />
      </div>
      {
        isSignInForm ?
          null :
          <div className='input-container'>
            <label>Confirm Password </label>
            <input
              placeholder={'🔑 confirm password'}
              type='password' name='password'
              required minLength={5}
              value={confirmPassword}
              onChange={event => setConfirmPassword(event.target.value)} />
          </div>
      }
      {
        isSignInForm ?
          null :
          <div
            className='input-container'
            style={{ flexDirection: 'row' }}
          >
            <input
              type={'checkbox'}
              onClick={() => setUserUnderstandPolity(!userUnderstandPolity)}
              required={true}
            ></input>
            <p style={{ fontSize: '10px' }}>I understand the polity of the app</p>
          </div>
      }
      <div className='button-container'>
        <button
          type={'submit'}
        >
          {
            isSignInForm ?
              'Submit'
              : 'Create account'
          }
        </button>
      </div>
      {
        isSignInForm ?
          <a
            style={
              {
                cursor: 'pointer',
                backgroundColor: isHoverRegister ? 'grey' : '',
              }
            }
            onClick={() => setSignInForm(false)}
            onMouseEnter={() => setIsHoverRegister(true)}
            onMouseLeave={() => setIsHoverRegister(false)}
          >
            I want to register!
          </a>
          : null
      }
    </form>
  )
}