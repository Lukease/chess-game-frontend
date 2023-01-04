import React, {useState} from 'react'
import {GameService, MovingService} from '../../game/suppliers'

export class GameNavigation extends React.Component<any, any> {
    gameService: GameService
    movingService: MovingService
    colorButton = [
        {color: '⚫', text: 'Dark style'},
        {color: '⚪', text: 'White style'}
    ]
    kings = [
        {icon: '♔', color: 'white'},
        {icon: '♚', color: 'black'}
    ]

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

    renderColorEditor() {
        return (
            this.colorButton.map((button, index) => {
                return (
                    <DropdownItem leftIcon={button.color} key={index}>{button.text}</DropdownItem>
                )
            })
        )
    }

    renderChoosePlayer() {
        return (
            this.kings.map((king, index) => {
                return (
                    <DropdownItem leftIcon={king.icon} key={index}>{king.color}</DropdownItem>
                )
            })
        )
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
                <NavSettings icon={'🥷'}>
                    <div className={'dropdown'}>
                        {this.renderChoosePlayer()}
                    </div>
                </NavSettings>
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
                        {this.renderColorEditor()}
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

function DropdownItem(props: any) {
    return (
        <a className={'dropdown__item'}>
            <span className={'dropdown__item--icon'}>{props.leftIcon}</span>

            {props.children}
        </a>
    )
}

function DropdownMenu(props: any) {
    return (
        <div className={'dropdown'}>
            <DropdownItem leftIcon={props.leftIcon}>{props.text}</DropdownItem>
        </div>
    )
}