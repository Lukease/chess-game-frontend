import React from 'react'
import {getColorFromLocalStorage} from '../data-base'

export class GameNavigation extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {isToggleOn: false}
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState((prevState: { isToggleOn: boolean }) => ({
            isToggleOn: !prevState.isToggleOn,
        }))

        const addFigureColumn: NodeListOf<Element> = document.querySelectorAll('.game__add-figure')

        addFigureColumn.forEach(column => {
            if (!column.classList.contains('game__add-figure--hidden')) {
                column.classList.add('game__add-figure--hidden')
            }
        })

        document.getElementById('color')!.innerHTML = getColorFromLocalStorage()
    }

    render() {
        return (
            <div className={'game__navigation'}>
                <button
                    className={'game__navigation--start'}
                    onClick={this.handleClick}
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
                    black/white
                </div>
            </div>
        )
    }
}