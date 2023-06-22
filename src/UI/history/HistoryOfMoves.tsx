import React, { useEffect, useState } from 'react'
import { THistoryOfMoves } from './types/THistoryOfMoves'

export function HistoryOfMoves({ moves, location, setMoveId }: THistoryOfMoves) {
  const [history, setHistory] = useState<Array<string>>([])
  const [rewindIndex, setRewindIndex] = useState<number>(0)

  useEffect(() => {
    if (moves) {
      const movesArray = moves.split(',')
      setHistory(movesArray)
    }
  }, [moves])

  const renderMoves = (index: number) => {
    const moveId = index
    if (index >= 0 && index <= history.length - 1) {

      setRewindIndex(moveId)
      setMoveId(moveId)
    }
  }

  const renderMovesRewindOrForwardByOne = (direction: number) => {
    const index = rewindIndex + direction

    if (index >= 0 && index <= history.length - 1) {
      setRewindIndex(index)
      setMoveId(index)
    }
  }

  const renderNameOfMove = (whoseTurn: string, index: number) => {
    return (
      <div className={'history__move'} id={String(index)} onClick={() => renderMoves(index)}
           style={{ color: rewindIndex === index ? 'greenyellow' : 'inherit' }}>
        {whoseTurn ? whoseTurn : ''}
      </div>
    )
  }

  const renderHistory = () => {
    const pairs = []
    for (let i = 0; i < history.length; i += 2) {
      pairs.push([history[i], history[i + 1]])
    }
    return pairs
      .map((move: Array<string>, index: number) => {
        const [whiteTurn, blackTurn] = move
        const moveNumber = index + 1

        return (
          <div
            className={'history__container'} key={index}>
            <div className={'history__container'} key={index}>
              <div className={'history__number'}>{moveNumber}</div>
              {renderNameOfMove(whiteTurn, (index * 2))}
              {renderNameOfMove(blackTurn, (index * 2) + 1)}
            </div>
          </div>
        )
      })
  }

  function rewindHistory() {
    return (
      location === 'history' &&
      <div className={'history__container'} style={{ backgroundColor: 'rgba(41,36,36,0.8)' }}>
        <div className={'history__button'} onClick={() => renderMoves(0)}> {'◀◀'}</div>
        <div className={'history__button'} onClick={() => renderMovesRewindOrForwardByOne(-1)}> {'◀'}</div>
        <div className={'history__button'} onClick={() => renderMovesRewindOrForwardByOne(1)}> {'▶'}</div>
        <div className={'history__button'} onClick={() => renderMoves(history.length - 1)}> {'▶▶'}</div>
      </div>
    )
  }

  return (
    <div className={'history'}>
      <p>
        History:
      </p>
      {rewindHistory()}
      <div className={'history__navigation'}>
        {renderHistory()}
      </div>
    </div>
  )
}

