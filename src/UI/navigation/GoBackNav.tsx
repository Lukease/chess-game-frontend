import { TGoBackNav } from './dto/TGoBackNav'
import React from 'react'
import { Settings } from '../start-game/Settings'

export function GoBackNav({backToUrl}: TGoBackNav) {
  return(
    <div className={'navbar'}>
      <div className={'navbar__nav--item'}>
        <a
          className={'navbar__nav--button'}
          href={`/${backToUrl}`}
          style={{color: 'white'}}
        >
          {'↩'}
        </a>
      </div>
      <div className={'navbar__nav--item'}>
        <a
          className={'navbar__nav--button'}
          href={`/players-info`}
          style={{color: 'white'}}
        >
          {'👨‍👨‍👦‍👦'}
        </a>
      </div>
      <Settings/>
    </div>
  )
}