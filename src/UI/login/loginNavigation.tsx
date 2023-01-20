import React, {Component, useState} from 'react'
import {UserService} from '../../backend-service-connector/service'
import {UserDto} from '../../backend-service-connector/model/rest/userDto'

function LoginNavigation(props: any) {
    const userService = props.userService
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
        const allUsers: Array<UserDto> = await userService.getAllUsers()
        const user = allUsers.find(user => user.login === login && user.password === password)

        if (user) {
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
        const allUsers: Array<UserDto> = await userService.getAllUsers()
        const userLoginExist: UserDto | undefined = allUsers.find(user => user.login === login)
        const userEmailExist: UserDto | undefined = allUsers.find(user => user.email === email)
        const userDontExist: boolean = !userLoginExist && !userEmailExist

        if (equalsPassword && userDontExist && userUnderstandPolity) {
            const userDto: UserDto = new UserDto(undefined, login, password, email)
            await userService.addNewUser(userDto)
            window.location.href = 'http://localhost:3000/game'
        }
        
        setMessageWhenRegisterUsedWrongData(equalsPassword, userLoginExist, userEmailExist)
    }

    const setMessageWhenRegisterUsedWrongData = (equalsPassword: boolean, userLoginExist: UserDto | undefined, userEmailExist:  UserDto | undefined) => {
        let errorMessage: string = ''

        if (!equalsPassword) {
            errorMessage = 'Wrong password'
        }

        if (userLoginExist) {
            errorMessage += ' User login '
        }

        if (userEmailExist) {
            errorMessage += 'email '
        }

        if (userEmailExist || userLoginExist){
            errorMessage += 'exist'
        }

        setPassword('')
        setConfirmPassword('')
        setRegisterMessage(errorMessage)
    }

    return (
        <form
            className={'form'}
            onSubmit={(event) => isSignInForm ? signIn(event) : register(event)}
        >
            <div className={'form__title'}>
                {isSignInForm ? 'Sign In' : 'Register'}
            </div>
            {
                isSignInForm && loginMessage !== '' ?
                    <label
                        style={{color: 'red'}}>
                        {loginMessage}
                    </label>
                    : null
            }
            {
                !isSignInForm && registerMessage !== '' ?
                    <label
                        style={{color: 'red'}}>
                        {registerMessage}
                    </label>
                    : null
            }
            <div className='input-container'>
                <label>Login</label>
                <input
                    placeholder={'👤 set login'}
                    type='text' name='login'
                    required
                    value={login}
                    onChange={event => setLogin(event.target.value)}/>
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
                            onChange={event => setEmail((event.target.value))}/>

                    </div>
            }
            <div className='input-container'>
                <label>Password </label>
                <input
                    placeholder={'🔑 set password'}
                    type='password' name='password'
                    required minLength={5}
                    value={password}
                    onChange={event => setPassword(event.target.value)}/>

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
                            onChange={event => setConfirmPassword(event.target.value)}/>
                    </div>
            }
            {
                isSignInForm ?
                    null :
                    <div
                        className='input-container'
                        style={{flexDirection: 'row'}}
                    >
                        <input
                            type={'checkbox'}
                            onClick={() => setUserUnderstandPolity(!userUnderstandPolity)}
                            required={true}
                        ></input>
                        <p style={{fontSize: '10px'}}>I understand the polity of the app</p>

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
                                backgroundColor: isHoverRegister ? 'blue' : ''
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

export class Navigation extends Component<any, any> {
    userService: UserService

    constructor(props: any) {
        super(props)

        this.userService = props.userService
    }

    render() {
        return (
            <LoginNavigation userService={this.userService}/>
        )
    }
}