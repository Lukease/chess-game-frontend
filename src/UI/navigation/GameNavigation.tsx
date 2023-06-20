import React, { useState } from 'react'
import { TGameNavigation } from '../start-game/types/TGameNavigation'
import { Settings } from '../start-game/Settings'
import { RespondingDrawOffer } from '../utils/RespondingDrawOffer'
import { Dropdown } from './Dropdown'
import { DropdownItem } from './DropdownItem'

export function GameNavigation({ gameService }: TGameNavigation) {
  const [windowResponseOffer, setWindowResponseOffer] = useState(false)
  const [drawOfferId, setDrawOfferId] = useState<number | undefined>(undefined)
  const [createOffer, setOffer] = useState(false)

  async function getDrawOffers() {
    const res = await gameService.getDrawOffer()
    if (res) {
      setDrawOfferId(res.id)
    }
  }

  function resignGame() {
    setWindowResponseOffer(true)
  }

  function createDrawOffer() {
    setWindowResponseOffer(true)
    setOffer(true)
  }

  return (
    <div className='navbar'>
      {/*<div className='navbar__nav--item'>*/}
      {/*  <a className='navbar__nav--button' href='/new-game'>*/}
      {/*    ➕*/}
      {/*  </a>*/}
      {/*</div>*/}
      <div className='navbar__nav--item'>
        <a className='navbar__nav--button' onClick={resignGame}>
          🚪
        </a>
      </div>
      <div className='navbar__nav--item'>
        <a className='navbar__nav--button' onClick={createDrawOffer}>
          🟰
        </a>
      </div>
      <Dropdown leftIcon='🔔' onClick={getDrawOffers}>
        {windowResponseOffer && drawOfferId && (
          <DropdownItem
            leftIcon='🔔'
            onClick={() => setDrawOfferId(drawOfferId)}
          >
            Draw Offer!
          </DropdownItem>
        )}
      </Dropdown>
      <div className='navbar__nav--item'>
        <a
          className='navbar__nav--button'
          onClick={() => setWindowResponseOffer(true)}
          onMouseLeave={() => setWindowResponseOffer(false)}
        >
          🖌️
        </a>
        {/* renderColorEditor() */}
      </div>
      <Settings />
      {windowResponseOffer && (
        <RespondingDrawOffer
          sendDataToParent={setWindowResponseOffer}
          gameServiceBackend={gameService}
          drawOfferId={drawOfferId}
          isCreateOffer={createOffer}
        />
      )}
    </div>
  )
}
