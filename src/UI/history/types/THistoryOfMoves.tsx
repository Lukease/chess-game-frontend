import React from 'react'

export type THistoryOfMoves ={
  moves?: string
  location: string
  setMoveId: React.Dispatch<React.SetStateAction<number>>
}