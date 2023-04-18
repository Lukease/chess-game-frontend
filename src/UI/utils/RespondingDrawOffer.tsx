import React from 'react'
import { TRespondingDrawOffer } from './dto/TRespondingDrawOffer'
import { DrawOfferRequest } from '../../backend-service-connector/model/rest/draw-offer/DrawOfferRequest'

export function RespondingDrawOffer({
                                      sendDataToParent,
                                      gameServiceBackend,
                                      drawOfferId,
                                      isCreateOffer,
                                    }: TRespondingDrawOffer) {
  function responseOffer(response: boolean) {
    if (drawOfferId) {
      const userDrawOfferRequest: DrawOfferRequest = {
        gameOfferId: drawOfferId,
        playerResponse: response,
      }
      gameServiceBackend.responseDrawOffer(userDrawOfferRequest).then(sendDataToParent(false))
      response ? window.location.href = 'http://localhost:3000/new-game' : null
    } else {
      sendDataToParent(false)
    }
  }

  const handleResign = () => {
    gameServiceBackend.resignGameUser().then(() => sendDataToParent(false))
    window.location.href = 'http://localhost:3000/new-game'
  }

  function handleCreateDrawOffer() {
    gameServiceBackend.createDrawOffer().then(() => sendDataToParent(false))
  }

  return (
    <div className={'error'}>
      <div className={'error__container'}>
        <div className={'error__exit'} onClick={() => sendDataToParent(false)}>
          X
        </div>
        <p className={'error__message'}>
          {drawOfferId
            ? 'You have a draw offer, do you want to accept it?'
            : isCreateOffer
              ? 'Do you want to create a draw offer?'
              : 'Are you sure you want to resign?'
          }
        </p>
        <div className={'error__buttons-container'}>
          {drawOfferId ? (
            <>
              <button onClick={() => responseOffer(true)}>
                Accept the offer
              </button>
              <button onClick={() => responseOffer(false)}>
                Reject the offer
              </button>
            </>
          ) : isCreateOffer ? (
            <>
              <button onClick={() => handleCreateDrawOffer()}>
                Create the offer
              </button>
              <button onClick={() => sendDataToParent(false)}>Cancel</button>
            </>
          ) : (
            <>
              <button onClick={() => handleResign()}>Resign</button>
              <button onClick={() => sendDataToParent(false)}>Cancel</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}