import React, {useState} from 'react'
import {GameService, MovingService} from '../../game/suppliers'
import {SelectPlayer} from "./select-player";

export class GameNavigation extends React.Component<any, any> {
    gameService: GameService
    movingService: MovingService

    constructor(props: any) {
        super(props)

        this.movingService = props.movingService
        this.gameService = props.gameService
        this.state = {
            isGameStarted: false,
            isPieceEditorDisplayed: false,
            color: 'white'
        }
        this.gameService.gameNavigation = this
        this.movingService.gameNavigation = this
    }

    startGame = () => {
        this.setState({isGameStarted: true})
        this.gameService.setGameStarted(true)
        this.movingService.setGameStarted(true)
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
            <div className={'navbar'}>
                <li className={'navbar__nav--item'}>
                    <a
                        className={'navbar__nav--button'}
                        onClick={this.state.isGameStarted ? undefined : this.startGame}
                        style={{backgroundColor: this.state.isGameStarted ? 'green' : ''}}
                    >
                        ▶
                    </a>
                </li>
                <li className={'navbar__nav--item'}>
                    <a
                        className={'navbar__nav--button'}
                        onClick={this.state.isGameStarted ? undefined : this.changePositionEditorDisplayed}
                        style={{backgroundColor: this.state.isGameStarted ? 'grey' : ''}}
                    >
                        🖊️
                    </a>
                </li>
                <li className={'navbar__nav--item'}>
                    <a
                        className={'navbar__nav--button'}
                    >
                        🔄
                    </a>
                </li>
                <NavSettings icon={'🔔'}>
                    <DropdownMenu leftIcon={'🔔'} text={'No new notifications '}></DropdownMenu>
                </NavSettings>
                <NavSettings icon={'🖌️'}>
                    <div className={'dropdown'}>
                        <a className={'dropdown__item'}>
                            <span className={'dropdown__item--icon'}>{'⚫'}</span>

                            {'Dark style'}
                        </a>
                        <a className={'dropdown__item'}>
                            <span className={'dropdown__item--icon'}>{'⚪'}</span>

                            {'White style'}
                        </a>
                    </div>
                </NavSettings>
                <NavSettings icon={'⚙'}>
                    <DropdownMenu leftIcon={'🚪'} text={'Logout'}></DropdownMenu>
                </NavSettings>
            </div>
        )
    }
}

function NavSettings(props: any) {
    const [open, setOpen] = useState(false)

    return (
        <li className={'navbar__nav--item'}>
            <a
                className={'navbar__nav--button'}
                onMouseOver={() => setOpen(!open)}
                onMouseLeave={() => setOpen(!open)}
            >
                {props.icon}
            </a>

            {open ? props.children : null}
        </li>
    )
}

function DropdownMenu(props: any) {
    function DropdownItem(props: any) {
        return (
            <a className={'dropdown__item'}>
                <span className={'dropdown__item--icon'}>{props.leftIcon}</span>

                {props.children}
            </a>
        )
    }

    return (
        <div className={'dropdown'}>
            <DropdownItem leftIcon={props.leftIcon}>{props.text}</DropdownItem>
        </div>

    )
}