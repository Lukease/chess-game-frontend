import React, { useEffect, useState } from 'react'
import { THistoryOfMoves } from './types/THistoryOfMoves'

export function HistoryOfMoves({ gameService, makeMoveResponse }: THistoryOfMoves) {
  const [history, setHistory] = useState<Array<string>>([])
  const [lastMoveIndex, setLastMoveIndex] = useState<number>(0)
  const [rewindIndex, setRewindIndex] = useState<number>(0)

  useEffect(() => {
    if (makeMoveResponse?.gameInfo?.moves) {
      setHistory(makeMoveResponse.gameInfo.moves.split(','))
    }
  }, [makeMoveResponse])

  const renderMoves = (index: number) => {
    setRewindIndex(index)

  }

  const renderMovesRewindOrForwardByOne = (direction: number) => {
    const index = rewindIndex + direction

    if (index > -2 && index <= lastMoveIndex) {
      setRewindIndex(index)
      renderMoves(index)
    }
  }

  const renderNameOfMove = (whoseTurn: string, index: number) => {
    return (
      <div
        className={'history__move'}
        id={String(index)}
        onClick={() => renderMoves(index)}
      >
        {whoseTurn ? whoseTurn : ''}
      </div>
    )
  }

  const renderHistory = () => {

    const pairs = []
    for (let i = 0; i < history.length; i += 2) {
      pairs.push([history[i], history[i+1]])
    }
    return pairs
      .map((move: Array<string>, index: number) => {
        const [whiteTurn, blackTurn] = move
        const moveNumber = index + 1

        return (
          <div
            className={'history__container'}
            key={index}
          >
            <div
              className={'history__container'}
              key={index}
            >
              <div
                className={'history__number'}
              >
                {moveNumber}
              </div>
              {renderNameOfMove(whiteTurn, (index * 2) - 1)}
              {renderNameOfMove(blackTurn, (index * 2))}
            </div>
          </div>
        )
      })
  }

  return (
    <div
      className={'history'}
    >
      <p>
        History:
      </p>
      <div
        className={'history__container'}
        style={{ backgroundColor: 'rgba(41,36,36,0.8)' }}
      >
        <div className={'history__button'}
             onClick={() => renderMoves(-1)}
        > {'◀◀'}</div>
        <div className={'history__button'}
             onClick={() => renderMovesRewindOrForwardByOne(-1)}
        > {'◀'}</div>
        <div className={'history__button'}
             onClick={() => renderMovesRewindOrForwardByOne(1)}
        > {'▶'}</div>
        <div className={'history__button'}
             onClick={() => renderMoves(lastMoveIndex)}
        > {'▶▶'}</div>
      </div>
      <div className={'history__navigation'}
      >
        {renderHistory()}
      </div>
    </div>
  )
}

