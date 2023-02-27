import React from 'react'
import {EditUserInformation} from './EditUserInformation'
import {UserAbout} from './UserAbout'

export function UserSettings(): JSX.Element {

    return (
        <div className={'home'}>
            <div className={'context'}>
                <div className={'dashboard'}>
                    <div className={'settings__nav'}>
                        <UserAbout />
                        <EditUserInformation />
                    </div>
                </div>
            </div>
        </div>
    )
}