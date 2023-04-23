import React, { useState } from 'react'
import { TGameNavigation } from '../start-game/types/TGameNavigation'
import { Settings } from '../start-game/Settings'
import { RespondingDrawOffer } from '../utils/RespondingDrawOffer'
import { DrawOffer } from '../../backend-service-connector/model/rest/draw-offer/DrawOffer'

export function GameNavigation({ movingService, navigationService, gameServiceBackend }: TGameNavigation) {
  const colorButton = [
    { icon: '⚫', text: 'Dark style', colorMenu: 'black' },
    { icon: '⚪', text: 'White style', colorMenu: 'white' },
  ]
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [idDropdown, setIdDropdown] = useState<string>('')
  const [windowResponseOffer, setWindowResponseOffer] = useState<boolean>(false)
  const [drawOfferId, setDrawOfferId] = useState<number | undefined>(undefined)
  const [createOffer, setOffer] = useState<boolean>(false)
  const [drawOffer, setDrawOffer] = useState<number | undefined>(undefined)

  async function getDrawOffers() {
    await gameServiceBackend.getDrawOffer().then((res: DrawOffer | undefined) => {
      if (res) {
        setDrawOffer(res.id)
      }
    })
  }

  function NavSettings(props: any) {
    return (
      <div className={'navbar__nav--item'}>
        <a
          className={'navbar__nav--button'}
          onMouseOver={() => {
            setIdDropdown(props.id)
            setIsOpen(true)
            if (props.id === '2') {
              getDrawOffers()
            }
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
      </div>
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

  async function resignGame() {
    setWindowResponseOffer(true)
  }

  function createDrawOffer() {
    setWindowResponseOffer(true)
    setOffer(true)
  }

  return (
    <div className={'navbar'}>
      <div className={'navbar__nav--item'}>
        <a
          className={'navbar__nav--button'}
          href={'/new-game'}
        >
          {'➕'}
        </a>
      </div>
      <div className={'navbar__nav--item'}>
        <a
          className={'navbar__nav--button'}
          onClick={() => resignGame()}
        >
          {'🚪'}
        </a>
      </div>
      <div className={'navbar__nav--item'}>
        <a
          className={'navbar__nav--button'}
          onClick={() => createDrawOffer()}
        >
          {'🟰'}
        </a>
      </div>
      <NavSettings icon={'🔔'} id={'2'}>
        {drawOffer ? (
          <div className={'dropdown'}>
            <DropdownItem
              leftIcon={'🔔'}
              onClick={() => {
                setWindowResponseOffer(true)
                setDrawOfferId(drawOffer)
              }}
            >
              {'Draw Offer!'}
            </DropdownItem>
          </div>
        ) : null}
      </NavSettings>

      <NavSettings icon={'🖌️'} id={'3'}>
        {
          // renderColorEditor()
        }
      </NavSettings>
      <Settings />
      {
        windowResponseOffer ?
          <RespondingDrawOffer
            sendDataToParent={setWindowResponseOffer}
            gameServiceBackend={gameServiceBackend}
            drawOfferId={drawOfferId}
            isCreateOffer={createOffer}
          ></RespondingDrawOffer>
          : null
      }
    </div>
  )
}
