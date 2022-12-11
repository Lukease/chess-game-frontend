import React from 'react'
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
        this.gameService.setGameStarted(true)
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
                    onClick={this.startGame}
                    disabled={this.state.isGameStarted}
                >
                    Start Game
                </button>
                <button
                    onClick={this.changePositionEditorDisplayed}
                    disabled={this.state.isGameStarted}
                >
                    Position Editor
                </button>
            </div>
        )
    }
}