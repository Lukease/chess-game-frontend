import React from "react";

export function UserAbout(props: any) {
    const userService = props.userService
    // const user = await userService.getUserByLogin('Luisek996')


    return (
        <div className={'user'}>
            <div className={'user__image'}>👤</div>
            <div className={'user__about'}>
                <div className={'user__container'}>
                    <h3>Login:</h3>
                    <div className={'user__container--nav'}>
                        <span>luisek</span>
                    </div>
                </div>
                <div className={'user__container'}>
                    <h3>Email:</h3>
                    <span>luisek@gmail.com</span>
                </div>
                <div className={'user__container'}>
                    <h3>Password:</h3>
                    <span>Password</span>
                </div>
            </div>
        </div>
    )
}