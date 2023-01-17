import React, {useState} from 'react'
import {GameService, MovingService, NavigationService} from '../../game/suppliers'
import {Piece} from '../../game/pieces'

export class GameNavigation extends React.Component<any, any> {
    gameService: GameService
    movingService: MovingService
    colorButton = [
        {icon: '⚫', text: 'Dark style', colorMenu: 'black'},
        {icon: '⚪', text: 'White style', colorMenu: 'white'}
    ]
    kings: Array<Piece>
    navigationService: NavigationService

    constructor(props: any) {
        super(props)

        this.movingService = props.movingService
        this.gameService = props.gameService
        this.navigationService = props.navigationService
        this.kings = props.kings
        this.state = {
            isGameStarted: false,
            isPieceEditorDisplayed: false,
            color: 'white',
            menuColor: 'black'
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

    setMenuColor(color: string) {
        this.navigationService.setBackgroundColor(color)
    }

    renderColorEditor() {
        return (
            <div className={'dropdown'}>{
                this.colorButton.map((button, index) => {
                    return (
                        <DropdownItem
                            leftIcon={button.icon}
                            key={index}
                            onClick={() => this.setMenuColor(button.colorMenu)}
                        >{button.text}</DropdownItem>
                    )
                })
            }
            </div>
        )
    }

    renderChoosePlayer() {
        return (
            <div className={'dropdown'}>{
                this.kings.map((king, index) => {
                    return (
                        <DropdownItem
                            leftIcon={king.getPieceIcon()}
                            key={index}
                            piece={king}
                            color={king.color}
                            onClick={() => this.selectPieceColor(king)}
                        >
                            {king.color}
                        </DropdownItem>
                    )
                })
            }
            </div>
        )
    }

    setDefaultChessPosition() {
        window.location.reload()
    }

    selectPieceColor(piece: Piece) {
        const vector: number = piece.color === 'white' ? -1 : 1

        this.navigationService.toggleSide(vector)
        this.gameService.setPlayerColor(vector)

        return piece
    }

    render() {
        return (
            <div className={'navbar'}>
                <NavSettings
                    icon={'▶'}
                    onClick={this.state.isGameStarted ? undefined : this.startGame}
                    backgroundColor={this.state.isGameStarted ? 'green' : ''}
                />
                <NavSettings
                    icon={'🖊️'}
                    onClick={this.state.isGameStarted ? undefined : this.changePositionEditorDisplayed}
                    backgroundColor={this.state.isGameStarted ? 'grey' : ''}
                />
                <NavSettings icon={'🥷'}>
                    {this.renderChoosePlayer()}
                </NavSettings>
                <NavSettings icon={'🔄'} onClick={() => this.setDefaultChessPosition()}/>
                <NavSettings icon={'🔔'} >
                    <DropdownMenu
                        leftIcon={'🔔'}
                        text={'No new notifications '}
                    ></DropdownMenu>
                </NavSettings>
                <NavSettings icon={'🖌️'}>
                    {this.renderColorEditor()}
                </NavSettings>
                <NavSettings icon={'⚙'}>
                    <DropdownMenu leftIcon={'🚪'} text={'Logout'}></DropdownMenu>
                </NavSettings>
            </div>
        )
    }
}

function NavSettings(props: any) {
    let [isOpen, setIsOpen] = useState(false)

    return (
        <li className={'navbar__nav--item'}>
            <a
                className={'navbar__nav--button'}
                onMouseOver={() => setIsOpen(!isOpen)}
                // onMouseLeave={() => setIsOpen(!isOpen)}
                onClick={() => props.onClick()}
                style={{backgroundColor: props.backgroundColor}}
            >
                {props.icon}
            </a>
            {isOpen ? props.children : null}
        </li>
    )
}

function DropdownItem(props: any) {
    return (
        <div className={'dropdown__item'}
             onClick={() => props.onClick()}
        >
            <span className={'dropdown__item--icon'}>{props.leftIcon}</span>

            {props.children}
        </div>
    )
}

function DropdownMenu(props: any) {
    return (
        <div className={'dropdown'}>
            <DropdownItem leftIcon={props.leftIcon}>{props.text}</DropdownItem>
        </div>
    )
}