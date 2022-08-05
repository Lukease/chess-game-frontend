import React from 'react'
import './Arena.css'
import {Field, FieldNumber, Letter} from './Arena_utils'

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
                    value={index + 1}
                    key={index}
                    site={site}
                />
            )
        })

        return arrayOfNumbers
    }

    renderField(id: number, fieldLetter: string) {
        const fieldArray: Array<JSX.Element> = Array(8).fill('').map((name, index) => {

            return (
                <Field
                    value={(id + index) % 2 ? 'white' : 'black'}
                    key={index}
                    id={fieldLetter + (index + 1)}
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
                            {this.renderField(1, 'A')}
                        </div>
                        <div className='field__column'>
                            {this.renderField(2, 'B')}
                        </div>
                        <div className='field__column'>
                            {this.renderField(1, 'C')}
                        </div>
                        <div className='field__column'>
                            {this.renderField(2, 'D')}
                        </div>
                        <div className='field__column'>
                            {this.renderField(1, 'E')}
                        </div>
                        <div className='field__column'>
                            {this.renderField(2, 'F')}
                        </div>
                        <div className='field__column'>
                            {this.renderField(1, 'G')}
                        </div>
                        <div className='field__column'>
                            {this.renderField(2, 'H')}
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
        <div>
            <Board/>
        </div>
    )
}

export default Arena