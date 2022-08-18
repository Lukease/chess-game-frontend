import React from 'react'
import './Arena.css'
import {Field, FieldNumber, Letter} from './Arena_utils'
import {
    addNewFigure,
    getFigure,
    mouseMoveFigure,
    AddBlackFigure,
    AddWhiteFigure,
    hideShowFigures
} from './Arena_utils/new-figure'

class GameNavigation extends React.Component<any, any> {
    render() {
        return (
            <div className={'game__navigation'}>
                <button className={'game__navigation--start'}>
                    Start Game
                </button>
                <button
                    className={'game__navigation--editor'}
                >
                    Position Editor
                </button>
            </div>
        )
    }
}

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

function Arena() {

    return (
        <div className={'navigation'}
             onMouseDown={event => getFigure(event)}
             onMouseMove={event => mouseMoveFigure(event)}
             onMouseUp={event => addNewFigure(event)}
             onClick={event => hideShowFigures(event)}
        >
            <AddWhiteFigure/>
            <GameNavigation/>
            <Board/>
            <AddBlackFigure/>
        </div>
    )
}

export default Arena