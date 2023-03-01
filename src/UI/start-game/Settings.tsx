import React from 'react'

export function Settings() {
  return(
    <li className={'navbar__nav--item'}>
      <a
        className={'navbar__nav--button'}
        href={'/settings'}
        style={{ color: 'white' }}
      >
        ⚙
      </a>
    </li>
  )
}