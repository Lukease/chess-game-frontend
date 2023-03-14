import { TGoBackNav } from './dto/TGoBackNav'
import React from 'react'

export function GoBackNav({backToUrl}: TGoBackNav) {
  return(
    <div className={'navbar'}>
      <li className={'navbar__nav--item'}>
        <a
          className={'navbar__nav--button'}
          href={`/${backToUrl}`}
          style={{color: 'white'}}
        >
          {'↩'}
        </a>
      </li>
    </div>
  )
}