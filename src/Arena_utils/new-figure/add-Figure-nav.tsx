import React from 'react'
import {DeleteFigure} from '../start-game'

export class AddWhiteFigure extends React.Component<any, any> {

    render() {
    return (
        <div className={'game__add-figure game__add-figure--hidden'}>
            <div className={`figure figure__white-Queen`}></div>
            <div className={`figure figure__white-Bishop`}></div>
            <div className={`figure figure__white-Knight`}></div>
            <div className={`figure figure__white-Rook`}></div>
            <div className={`figure figure__white-Pawn`}></div>
            <DeleteFigure/>
        </div>
    )
}
}

export class AddBlackFigure extends React.Component<any, any> {

    render() {
        return (
            <div className={'game__add-figure game__add-figure--hidden'}>
                <div className={'figure figure__black-Queen'}></div>
                <div className={'figure figure__black-Bishop'}></div>
                <div className={'figure figure__black-Knight'}></div>
                <div className={'figure figure__black-Rook'}></div>
                <div className={'figure figure__black-Pawn'}></div>
                <DeleteFigure/>
            </div>
        )
    }
}