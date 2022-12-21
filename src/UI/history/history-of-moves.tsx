import React from 'react'
import {GameService} from '../../game/suppliers'

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

    renderMoves(nameOfMove: string) {
        this.gameService.renderHistory(nameOfMove)
    }

    setHistoryOfMoves(movesArray: string) {
        this.setState({
            history: movesArray.split(';')
                .filter((history: string) => history !== '')
        })
    }

    renderHistory() {
        return this.state.history
            .map((move: string, index: number) => {
                const [whiteTurn, blackTurn] = move.split(',')
                const number = index + 1

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
                                {number}
                            </div>
                            <div
                                className={'history__move'}
                                onClick={() => this.renderMoves(whiteTurn)}
                            >
                                {whiteTurn}
                            </div>
                            <div
                                className={'history__move'}
                                onClick={() => this.renderMoves(blackTurn)}
                            >
                                {blackTurn ? blackTurn : ''}
                            </div>
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

