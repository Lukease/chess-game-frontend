import React, { useState } from 'react'
import { TNewFen } from './types/TNewFen'

export function NewFen({ positionEditorService, handleNewPieces }: TNewFen) {
  const [fen, setFen] = useState<string>('')

  function setNewFen() {
    positionEditorService.setOwnFenInPositionEditor(fen).then(r => handleNewPieces(r))
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newFen = event.target.value.replace(/\s/g, '')

    setFen(newFen)
  }

  return (
    <div className='game__fen-container'>
      <label className='game__fen-container--title'>FEN</label>
      <input
        type='text'
        className='game__fen-container--input'
        placeholder='Set Your Own FEN'
        style={{ width: '400px' }}
        value={fen}
        onChange={e => handleInputChange(e)} />
      <button onClick={setNewFen}>Set FEN</button>
    </div>
  )
}