import React, { useState } from 'react'
import { Piece } from '../../game/pieces'
import { TGameNavigation } from '../start-game/types/TGameNavigation'
import { Settings } from '../start-game/Settings'

export function GameNavigation({ gameService, movingService, navigationService, kings }: TGameNavigation) {
  const colorButton = [
    { icon: '⚫', text: 'Dark style', colorMenu: 'black' },
    { icon: '⚪', text: 'White style', colorMenu: 'white' },
  ]
  const [isGameStarted, setGameStarted] = useState<boolean>(false)
  const [isPieceEditorDisplayed, setPieceEditorDisplayed] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [idDropdown, setIdDropdown] = useState<string>('')

  const startGame = () => {
    setGameStarted(true)
    gameService.setGameStarted(true)
    movingService.setGameStarted(true)
  }

  const changePositionEditorDisplayed = () => {
    setPieceEditorDisplayed(!isPieceEditorDisplayed)
    gameService.setPositionEditorDisplayed(!isPieceEditorDisplayed)
  }

  const setMenuColor = (color: string) => {
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
              {button.text}
            </DropdownItem>
          )
        })}
      </div>
    )
  }

  function ChoosePlayer() {
    const KingsArray: Array<Piece> = kings

    return (
      <div className={'dropdown'}>{
        KingsArray.map((king, index) => {
          return (
            <DropdownItem
              leftIcon={king.getPieceIcon()}
              key={index}
              piece={king}
              color={king.color}
              onClick={() => selectPieceColor(king)}
            >
              {king.color}
            </DropdownItem>
          )
        })
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

  function NavSettings(props: any) {
    return (
      <li className={'navbar__nav--item'}>
        <a
          className={'navbar__nav--button'}
          onMouseOver={() => {
            setIdDropdown(props.id)
            setIsOpen(true)
          }}
          onClick={() => props.onClick()}
          style={{ backgroundColor: props.backgroundColor }}
          onMouseLeave={() => {
            setIdDropdown('')
            setIsOpen(false)
          }}
        >
          {props.icon}
        </a>
        {
          isOpen && idDropdown === props.id ?
            props.children
            : null
        }
      </li>
    )
  }

  function DropdownItem(props: any) {
    return (
      <div
        className={'dropdown__item'}
        onClick={() => props.onClick()}
        onMouseOver={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <span className={'dropdown__item--icon'}>
          {props.leftIcon}
        </span>
        {props.children}
      </div>
    )
  }

  return (
    <div className={'navbar'}>
      <li className={'navbar__nav--item'}>
        <a
          className={'navbar__nav--button'}
          href={'/new-game'}
        >
          {'➕'}
        </a>
      </li>
      <NavSettings
        icon={'▶'}
        onClick={isGameStarted ? undefined : startGame}
        backgroundColor={isGameStarted ? 'green' : ''}
      />
      <NavSettings
        icon={'🖊️'}
        onClick={isGameStarted ? undefined : changePositionEditorDisplayed}
        backgroundColor={isGameStarted ? 'grey' : ''}
      />
      <NavSettings
        icon={'🥷'}
        id={'1'}>
        {
          ChoosePlayer()
        }
      </NavSettings>
      <NavSettings
        icon={'🔄'}
        onClick={() => setDefaultChessPosition()}
      />
      <NavSettings
        icon={'🔔'}
        id={'2'}
      >
        <div className={'dropdown'}>
          <DropdownItem leftIcon={'🔔'}>{'No new notifications '}</DropdownItem>
        </div>
      </NavSettings>
      <NavSettings icon={'🖌️'} id={'3'}>
        {
          renderColorEditor()
        }
      </NavSettings>
      <Settings />
    </div>
  )
}
