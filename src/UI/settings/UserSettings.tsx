import React from 'react'
import { EditUserInformation } from './EditUserInformation'
import { UserAbout } from './UserAbout'
import { GoBackNav } from '../navigation/GoBackNav'

export function UserSettings(): JSX.Element {

  return (
    <div className={'settings'}>
      <GoBackNav backToUrl={'game'}/>
      <UserAbout />
      <EditUserInformation />
    </div>
  )
}