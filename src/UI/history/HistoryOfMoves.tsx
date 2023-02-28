import React from 'react'
import { GameService } from '../../game/suppliers'
import { Move } from './Move'
import { HistoryService } from '../../game/suppliers'
import { THistoryOfMoves } from './types/THistoryOfMoves'

export class HistoryOfMoves extends React.Component<any, any> {
  gameService: GameService
  historyService: HistoryService

  constructor({ historyService, gameService }: THistoryOfMoves) {
    super({ historyService, gameService })

    this.gameService = gameService
    this.historyService = historyService
    this.gameService.historyOfMoves = this
    this.state = {
      history: [],
      lastMoveIndex: 0,
      rewindIndex: 0,
    }
  }

  renderMoves(index: number) {
    this.setRewindIndex(index)
    this.historyService.renderHistory(index)
  }

  renderMovesRewindOrForwardByOne(direction: number) {
    const rewindIndex = this.state.rewindIndex + direction

    if (rewindIndex > -2 && rewindIndex <= this.state.lastMoveIndex) {
      this.setRewindIndex(rewindIndex)
      this.renderMoves(rewindIndex)
    }
  }

  setRewindIndex(index: number) {
    this.setState({ rewindIndex: index })
  }

  setLastMoveIndex(index: number) {
    this.setState({ lastMoveIndex: index })
  }

  setHistoryOfMoves(arrayOfMoves: Array<Move>) {
    this.historyService.setArrayOfMoves(arrayOfMoves)
    this.setRewindIndex((arrayOfMoves.length - 1))
    this.setLastMoveIndex((arrayOfMoves.length - 1))
    this.setState({
      history: arrayOfMoves.map(move => move.nameOfMove)
        .reduce((acc, item, currentIndex) => {
          if (acc === '') {
            return item
          }

          if (currentIndex % 2 === 0) {
            return acc + item
          } else {

            return `${acc}, ${item};`
          }
        }, '')
        .split(';')
        .filter(move => move !== ''),
    })
  }

  renderNameOfMove(whoseTurn: string, index: number) {
    return (
      <div
        className={'history__move'}
        id={String(index)}
        onClick={() => this.renderMoves(index)}
      >
        {whoseTurn ? whoseTurn : ''}
      </div>
    )
  }

  renderHistory() {
    return this.state.history
      .map((move: string, index: number) => {
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
              {this.renderNameOfMove(whiteTurn, (index * 2) - 1)}
              {this.renderNameOfMove(blackTurn, (index * 2))}
            </div>
          </div>
        )
      })
  }

  render() {
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
               onClick={() => this.renderMoves(-1)}
          > {'◀◀'}</div>
          <div className={'history__button'}
               onClick={() => this.renderMovesRewindOrForwardByOne(-1)}
          > {'◀'}</div>
          <div className={'history__button'}
               onClick={() => this.renderMovesRewindOrForwardByOne(1)}
          > {'▶'}</div>
          <div className={'history__button'}
               onClick={() => this.renderMoves(this.state.lastMoveIndex)}
          > {'▶▶'}</div>

        </div>
        <div className={'history__navigation'}
        >
          {this.renderHistory()}
        </div>
      </div>
    )
  }
}

