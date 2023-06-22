import React from 'react'
import { TMovedPiece } from './types/TMovedPiece'

export function MovedPiece({selectedPiece,coordinateX,coordinateY}: TMovedPiece){
  return(
    <div className={'field'} style={{ position: 'absolute', left: `${coordinateX}px`, top: `${coordinateY}px` }}>
      <img
        className={'figure'}
        src={selectedPiece.getImageUrl()}
        key={selectedPiece.id}
        alt={''}
        draggable={false}
      />
    </div>
  )
}