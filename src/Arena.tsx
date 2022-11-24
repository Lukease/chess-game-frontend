import React from 'react'
import './Arena.css'
import {
    Field,
    FieldNumber,
    Letter
} from './Arena_utils/fields-settings'
import {
    editorAddNewFigure,
    editorGetFigure,
    editorMouseMoveFigure,
    AddFigure,
    hideShowFigures
} from './Arena_utils/new-figure'
import {GameNavigation} from './Arena_utils/start-game'
import {setArrayToLocalStorage, setCorrectMovesOfOpponentToLocalStorage} from './Arena_utils/data-base'
import {defaultChessArrangement} from './chess_arrangement/default-chess-arrangement'
import {setCurrentColorToLocalStorage} from './Arena_utils/data-base'
import {HistoryOfMoves} from './Arena_utils/history'
import {getAllMoves, kingCheck, PromotePawn} from './Arena_utils/game'
import {setCheckToLocalStorage} from './Arena_utils/data-base/check'
import {setSpecialMoveToLocalStorage} from './Arena_utils/data-base'

class Board extends React.Component<any, any> {

    renderLetters() {
        const alpha: Array<number> = Array.from(Array(8)).map((e, i) => i + 65)
        const arrayOfLetters: Array<string> = alpha.map(letter => String.fromCharCode(letter))
        const letterField: Array<JSX.Element> = ['', ...arrayOfLetters, ''].map((letter, index) => {

            return (
                <Letter
                    value={letter}
                    key={index}
                />
            )
        })

        return letterField
    }

    renderNumbers(site: string) {
        const arrayOfNumbers: Array<JSX.Element> = Array.apply(null, Array(8)).map((x, index) => {

            return (
                <FieldNumber
                    value={index}
                    key={index}
                    site={site}
                />
            )
        })

        return arrayOfNumbers
    }

    renderColumn(id: number, columnNumber: number, columnLetter: string) {
        const fieldArray: Array<JSX.Element> = Array(8).fill('').map((name, index) => {

            return (
                <Field
                    value={(id + index) % 2 ? 'white' : 'black'}
                    key={index}
                    id={columnLetter + (index + 1)}
                />
            )
        })

        return fieldArray
    }

    render() {
        return (
            <div className={'game'}>
                <div className={'game__letters'}>
                    {this.renderLetters()}
                </div>
                <div className={'arena'}>
                    <div className={'arena__numbers'}>
                        {this.renderNumbers('left')}
                    </div>
                    <div className={'arena__chess'}>
                        <div className='field__column'>
                            {this.renderColumn(1, 1, 'A')}
                        </div>
                        <div className='field__column'>
                            {this.renderColumn(2, 2, 'B')}
                        </div>
                        <div className='field__column'>
                            {this.renderColumn(1, 3, 'C')}
                        </div>
                        <div className='field__column'>
                            {this.renderColumn(2, 4, 'D')}
                        </div>
                        <div className='field__column'>
                            {this.renderColumn(1, 5, 'E')}
                        </div>
                        <div className='field__column'>
                            {this.renderColumn(2, 6, 'F')}
                        </div>
                        <div className='field__column'>
                            {this.renderColumn(1, 7, 'G')}
                        </div>
                        <div className='field__column'>
                            {this.renderColumn(2, 8, 'H')}
                        </div>
                    </div>
                    <div className={'arena__numbers'}>
                        {this.renderNumbers('right')}
                    </div>
                </div>
                <div className={'game__letters'}>
                    {this.renderLetters()}
                </div>
            </div>
        )
    }
}

export class Arena extends React.Component<any, any> {
    setDefaultChessPosition() {
        window.location.reload()
        localStorage.clear()
        setArrayToLocalStorage(defaultChessArrangement)

        const color = document.querySelector('.game__color')!.innerHTML = 'white'

        setCurrentColorToLocalStorage(color)

        const check: boolean = false

        setCheckToLocalStorage(check)
        setSpecialMoveToLocalStorage('')

        const opponentMovesIdsArray: Array<string> = Array.from(getAllMoves())

        setCorrectMovesOfOpponentToLocalStorage(opponentMovesIdsArray)
    }

    render() {
        return (
            <div className={'navigation'}
                 onMouseDown={event => editorGetFigure(event)}
                 onMouseMove={event => editorMouseMoveFigure(event)}
                 onMouseUp={event => editorAddNewFigure(event)}
                 onClick={event => hideShowFigures(event)}
            >
                <HistoryOfMoves/>
                <AddFigure color={'white'}/>
                <GameNavigation/>
                <Board/>
                <AddFigure color={'black'}/>
                <PromotePawn/>
                <div
                    className={'game__navigation--default'}
                    onClick={this.setDefaultChessPosition}
                >
                </div>
            </div>
        )
    }
}

export default Arena