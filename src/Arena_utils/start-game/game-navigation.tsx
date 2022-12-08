import React from 'react'
import {getHistoryFromLocalStorage} from '../data-base'
import {renderHistoryFromLocalStorage} from '../history'
import {LastMove} from '../../types'
import {GameService} from '../suppliers/game-service'

export class GameNavigation extends React.Component<any, any> {
    isPositionEditor: boolean
    gameService: GameService

    constructor(props: any) {
        super(props)

        this.gameService = props.gameService
        this.isPositionEditor = true
        this.state = {
            isToggleOn: false,
            color: 'white',
        }
        this.gameService.gameNavigation = this
        this.StartGame = this.StartGame.bind(this)
    }

    StartGame() {
        this.setState((prevState: { isToggleOn: boolean }) => ({
            isToggleOn: !prevState.isToggleOn,
        }))

        const addFigureColumn: NodeListOf<Element> = document.querySelectorAll('.game__add-figure')

        addFigureColumn.forEach(column => {
            if (!column.classList.contains('game__add-figure--hidden')) {
                column.classList.add('game__add-figure--hidden')
            }
        })


        const historyOfMoves: Array<LastMove> = getHistoryFromLocalStorage()!

        if (historyOfMoves) {
            renderHistoryFromLocalStorage(historyOfMoves)
        }
    }

    changeTurn(color1: string) {
        this.setState({color: color1})
    }

    render() {
        return (
            <div className={'game__navigation'}>
                <button
                    className={'game__navigation--start'}
                    onClick={this.StartGame}
                    disabled={!!this.state.isToggleOn}
                >
                    Start Game
                </button>
                <button
                    className={'game__navigation--editor'}
                    disabled={!!this.state.isToggleOn}
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