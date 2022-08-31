import React from 'react'
import {DeleteFigure} from '../start-game'

export function AddFigure(props: any) {

    return (
        <div className={'game__add-figure game__add-figure--hidden'}>
            <div className={`figure figure__${props.color}-Queen`}></div>
            <div className={`figure figure__${props.color}-Bishop`}></div>
            <div className={`figure figure__${props.color}-Knight`}></div>
            <div className={`figure figure__${props.color}-Rook`}></div>
            <div className={`figure figure__${props.color}-Pawn`}></div>
            <DeleteFigure/>
        </div>
    )
}