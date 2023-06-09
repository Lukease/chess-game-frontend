import { TGoBackNav } from './dto/TGoBackNav'
import React from 'react'
import { Settings } from '../start-game/Settings'

export function GoBackNav({ defaultChessPosition }: TGoBackNav) {

  function setDefaultChessPosition() {
    defaultChessPosition && defaultChessPosition()
  }

  return (
    <div className={'navbar'}>
      <div className={'navbar__nav--item'}>
        <a
          className={'navbar__nav--button'}
          href={`/new-game`}
          style={{ color: 'white' }}
        >
          {'↩'}
        </a>
      </div>
      {window.location.href === 'http://localhost:3000/position-editor' ?
        <div className={'navbar__nav--item'}>
          <div
            className={'navbar__nav--button'}
            style={{ color: 'white' }}
            onClick={() => setDefaultChessPosition()}
          >
            {'🔄'}
          </div>
        </div> :
        <div className={'navbar__nav--item'}>
          <a
            className={'navbar__nav--button'}
            href={`/position-editor`}
            style={{ color: 'white' }}
          >
            {'✏️'}
          </a>
        </div>}
      <div className={'navbar__nav--item'}>
        <a
          className={'navbar__nav--button'}
          href={`/players-info`}
          style={{ color: 'white' }}
        >
          {'👨‍👨‍👦‍👦'}
        </a>
      </div>
      <Settings />
    </div>
  )
}