import React, {useState} from 'react'
import {Piece} from '../../game/pieces'
import {NavSettings} from './NavSettings'
import {DropdownMenu} from './DropdownMenu'
import {DropdownItem} from './DropdownItem'
import {TGameNavigation} from '../board/types/TGameNavigation'

function GameNavigation({gameService, movingService, navigationService, kings}: TGameNavigation) {
    const [isGameStarted, setGameStarted] = useState<boolean>(false)
    const [isPieceEditorDisplayed, setPieceEditorDisplayed] = useState<boolean>(false)
    const [color, setColor] = useState<string>('white')
    const [menuColor, setMenuColor] = useState<string>('black')
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [openId, setOpenId] = useState<number | undefined>(undefined)
    const colorButton = [
        {icon: '⚫', text: 'Dark style', colorMenu: 'black'},
        {icon: '⚪', text: 'White style', colorMenu: 'white'}
    ]

    const startGame = () => {
        setGameStarted(true)
        gameService.setGameStarted(true)
        movingService.setGameStarted(true)
    }

    const changeTurn = (playerColor: string) => {
        setColor(playerColor)
    }

    const changePositionEditorDisplayed = () => {
        const isDisplayed: boolean = isPieceEditorDisplayed

        setPieceEditorDisplayed(!isDisplayed)
        gameService.setPositionEditorDisplayed(!isDisplayed)
    }

    const setBoardColor = (color: string) => {
        navigationService.setBackgroundColor(color)
    }

    const renderColorEditor = () => {
        return (
            <div className={'dropdown'}>{
                colorButton.map((button, index) => {
                    return (
                        <DropdownItem
                            leftIcon={button.icon}
                            key={index}
                            onClick={() => setMenuColor(button.colorMenu)}
                        >
                            {
                                button.text
                            }
                        </DropdownItem>
                    )
                })
            }
            </div>
        )
    }

    const renderChoosePlayer = () => {
        return (
            <div className={'dropdown'}>{
                kings ?
                    kings.map((king, index) => {
                        return (
                            <DropdownItem
                                leftIcon={king.getPieceIcon()}
                                key={index}
                                piece={king}
                                color={king.color}
                                onClick={() => selectPieceColor(king)}
                            >
                                {
                                    king.color
                                }
                            </DropdownItem>
                        )
                    })
                    : null
            }
            </div>
        )
    }

    const setDefaultChessPosition = () => {
        window.location.reload()
    }

    const selectPieceColor = (piece: Piece) => {
        const vector: number = piece.color === 'white' ? -1 : 1

        navigationService.toggleSide(vector)
        gameService.setPlayerColor(vector)

        return piece
    }

    return (
        <div className={'navbar'}>
            <NavSettings
                icon={'▶'}
                id={1}
                // onClick={() => isGameStarted ? undefined : startGame()}
                backgroundColor={isGameStarted ? 'green' : ''}
            >

            </NavSettings>
            <NavSettings
                icon={'🖊️'}
                id={2}
                onClick={() => isGameStarted ? undefined : changePositionEditorDisplayed()}
                backgroundColor={isGameStarted ? 'grey' : ''}
                ></NavSettings>
            <NavSettings
                icon={'🥷'}
                id={3}
                backgroundColor={undefined}
            >
                {
                    renderChoosePlayer()
                }
            </NavSettings>
            <NavSettings
                icon={'🔄'}
                id={3}
                onClick={() => setDefaultChessPosition()}
            />
            <NavSettings
                icon={'🖌️'}
                id={5}
                backgroundColor={undefined}
            >
                {
                    renderColorEditor()
                }
            </NavSettings>
            <li className={'navbar__nav--item'}>
                <a
                    className={'navbar__nav--button'}
                    href={'/settings'}
                    style={{color: 'white'}}
                >
                    ⚙
                </a>
            </li>
        </div>
    )
}

export default GameNavigation