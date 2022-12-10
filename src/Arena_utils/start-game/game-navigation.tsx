import React from 'react'
import {getHistoryFromLocalStorage} from '../data-base'
import {renderHistoryFromLocalStorage} from '../history'
import {LastMove} from '../../types'
import {GameService} from '../suppliers/game-service'

export class GameNavigation extends React.Component<any, any> {
    gameService: GameService

    constructor(props: any) {
        super(props)

        this.gameService = props.gameService
        this.state = {
            isGameStarted: false,
            isPieceEditorDisplayed: false,
            color: 'white'
        }
        this.gameService.gameNavigation = this
    }

    startGame = () => {
        this.setState({isGameStarted: true})

        const historyOfMoves: Array<LastMove> = getHistoryFromLocalStorage()!

        if (historyOfMoves) {
            renderHistoryFromLocalStorage(historyOfMoves)
        }
    }

    changeTurn(color: string) {
        this.setState({color: color})
    }

    changePositionEditorDisplayed = () => {
        const isDisplayed: boolean = this.state.isPieceEditorDisplayed

        this.setState({isPieceEditorDisplayed: !isDisplayed})
        this.gameService.setPositionEditorDisplayed(!isDisplayed)
    }

    render() {
        return (
            <div className={'game__navigation'}>
                <button
                    className={'game__navigation--start'}
                    onClick={this.startGame}
                    disabled={this.state.isGameStarted}
                >
                    Start Game
                </button>
                <button
                    className={'game__navigation--editor'}
                    onClick={this.changePositionEditorDisplayed}
                    disabled={this.state.isGameStarted}
                >
                    Position Editor
                </button>
                <div
                    className={'game__whose-turn'}
                >
                    Whose turn:
                </div>
                <div
                    id={'color'}
                    className={'game__color'}
                >
                    {this.state.color}
                </div>

            </div>
        )
    }
}