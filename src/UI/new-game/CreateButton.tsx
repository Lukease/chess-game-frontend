import React from 'react'
import { TCreateButton } from './dto/TCreateButton'

export function CreateButton({setVisibleCreate}: TCreateButton) {
  return (
    <div className={'create-button'}>
      <button onClick={() => setVisibleCreate(true)}>New Game</button>
    </div>
  )
}