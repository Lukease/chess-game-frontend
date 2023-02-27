import React, {useContext, useState} from 'react'
import {Move} from './Move'
import {HistoryServiceContext} from '../context/Context'

export default function HistoryOfMoves() {
    const historyService= useContext(HistoryServiceContext)
    const [history, setHistory] = useState<Array<string>>([])
    const [lastMoveIndex, setLastMoveIndex] = useState<number>(0)
    const [rewindIndex, setRewindIndex] = useState<number>(0)

    const renderMoves = (index: number) => {
        setRewindIndex(index)
        historyService.renderHistory(index)
    }

    const renderMovesRewindOrForwardByOne = (direction: number) => {
        const index = rewindIndex + direction

        if (index > -2 && index <= lastMoveIndex) {
            setRewindIndex(index)
            renderMoves(index)
        }
    }

    const setHistoryOfMoves = (arrayOfMoves: Array<Move>) => {
        historyService.setArrayOfMoves(arrayOfMoves)
        setRewindIndex((arrayOfMoves.length - 1))
        setLastMoveIndex((arrayOfMoves.length - 1))

        const historyOfMoves = arrayOfMoves.map(move => move.nameOfMove)
            .reduce((acc, item, currentIndex) => {
                if (!acc) {
                    return item
                } else {
                    return currentIndex % 2 === 0 ? acc + item : `${acc}, ${item};`
                }
            }, '')!
            .split(';')
            .filter(move => move !== '')

        setHistory(historyOfMoves)

    }

    const renderNameOfMove = (whoseTurn: string, index: number) => {
        return (
            <div
                className={'history__move'}
                id={String(index)}
                onClick={() => renderMoves(index)}
            >
                {
                    whoseTurn ? whoseTurn : ''
                }
            </div>
        )
    }

    const renderHistory = () => {
        return history.map((move: string, index: number) => {
            const [whiteTurn, blackTurn] = move.split(',')
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
                        {
                            renderNameOfMove(whiteTurn, (index * 2) - 1)
                        }
                        {
                            renderNameOfMove(blackTurn, (index * 2))
                        }
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
                style={{backgroundColor: 'rgba(41,36,36,0.8)'}}
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
                {
                    renderHistory()
                }
            </div>
        </div>
    )
}

