import React from 'react'

export class GameNavigation extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {isToggleOn: false}
        this.state = {isTrashClicked: false}
        this.handleClick = this.handleClick.bind(this)
        this.deleteIcon = this.deleteIcon.bind(this)
    }

    handleClick() {
        this.setState((prevState: { isToggleOn: boolean }) => ({
            isToggleOn: !prevState.isToggleOn,
            isTrashClicked: false
        }))

        const addFigureColumn: NodeListOf<Element> = document.querySelectorAll('.game__add-figure')

        addFigureColumn.forEach(column => {
            if (!column.classList.contains('game__add-figure--hidden')) {
                column.classList.add('game__add-figure--hidden')
            }
        })

        document.getElementById('color')!.innerHTML = 'white'
        alert('let s start! White starts.')
    }

    deleteIcon() {
        this.setState((prevState: { isTrashClicked: boolean }) => ({
            isTrashClicked: !prevState.isTrashClicked
        }))
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
                <button
                    className={!!this.state.isTrashClicked ? 'navigation__trash field__chosen' : 'navigation__trash'}
                    disabled={!!this.state.isToggleOn}
                    onClick={this.deleteIcon}
                    id={'trashIcon'}
                >
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