import React from 'react'
import {GameService} from '../../game/suppliers'
import {Move} from './move'

export class HistoryOfMoves extends React.Component<any, any> {
    gameService: GameService

    constructor(props: any) {
        super(props)

        this.gameService = props.gameService
        this.gameService.historyOfMoves = this
        this.state = {
            history: []
        }
    }

    renderMoves(index: number) {
        this.gameService.renderHistory(index)
    }

    setHistoryOfMoves(arrayOfMoves: Array<Move>) {
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
                .filter(move => move !== '')
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
                            {this.renderNameOfMove(whiteTurn, (index * 2))}
                            {this.renderNameOfMove(blackTurn, (index * 2) + 1)}
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
                    style={{backgroundColor: 'rgba(41,36,36,0.8)'}}
                >

                    {/*<img src={require('/src/menu-icons/history-back.png').default}></img>*/}

                </div>
                <div className={'history__navigation'}
                >
                    {this.renderHistory()}
                </div>
            </div>
        )
    }
}

