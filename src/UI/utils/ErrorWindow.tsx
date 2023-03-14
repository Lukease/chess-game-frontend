import React from 'react'
import { TErrorWindow } from './dto/TErrorWindow'

export function ErrorWindow({ message, sendDataToParent }: TErrorWindow) {
  return (
    <div className={'error'}>
      <div className={'error__container'}>
        <div className={'error__exit'} onClick={()=> sendDataToParent()}>X</div>
        <p className={'error__message'}>{message}</p>
        <button onClick={()=> sendDataToParent()} >Accept</button>
      </div>
    </div>
  )
}