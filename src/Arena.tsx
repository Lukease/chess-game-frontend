import React from 'react'
import './Arena.css'
import whiteKing from './chess-icon/black-king.svg'
import whiteQueen from './chess-icon/black-queen.svg'
import whiteKnight from './chess-icon/black-knight.svg'
import whitePawn from './chess-icon/black-pawn.svg'
import whiteRook from './chess-icon/black-rook.svg'
import whiteBishop from './chess-icon/black-bishop.svg'
import blackKnight from './chess-icon/white-knight.svg'
import blackQueen from './chess-icon/white-queen.svg'
import blackKing from './chess-icon/white-King.svg'
import blackBishop from './chess-icon/white-bishop.svg'
import blackPawn from './chess-icon/white-pawn.svg'
import blackRook from './chess-icon/white-rook.svg'
import {Field, FieldNumber, Letter} from './Arena_utils'

class Board extends React.Component<any, any> {
    renderLetters() {
        const alpha: Array<number> = Array.from(Array(8)).map((e, i) => i + 65)
        const arrayOfLetters: Array<string> = alpha.map(letter => String.fromCharCode(letter))
        const letterField: Array<any> = ['', ...arrayOfLetters, ''].map((letter, index) => {
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
        const arrayOfNumbers: Array<any> = Array.apply(null, Array(8)).map((x, index) => {
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

    renderField(id: number, nameChess: Array<string>, fieldLetter: string) {
        const [whiteFigure, whitePawn, blackPawn, blackFigure] = nameChess
        const emptyArray: Array<string> = Array(4).fill('')

        const figureArray: Array<any> = [whiteFigure, whitePawn, ...emptyArray, blackPawn, blackFigure].map((name, index) => {

            return (
                <Field
                    value={(id + index) % 2 ? 'white' : 'black'}
                    figureName={name}
                    isFigure={!!name}
                    number={index + 1}
                    letter={fieldLetter}
                    key={index}
                    color={name.includes('white') ? 'white' : 'black'}
                    id={fieldLetter + (index + 1)}
                />
            )
        })

        return figureArray
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
                            {this.renderField(1, [whiteRook, whitePawn, blackPawn, blackRook], 'A')}
                        </div>
                        <div className='field__column'>
                            {this.renderField(2, [whiteKnight, whitePawn, blackPawn, blackKnight], 'B')}
                        </div>
                        <div className='field__column'>
                            {this.renderField(1, [whiteBishop, whitePawn, blackPawn, blackBishop], 'C')}
                        </div>
                        <div className='field__column'>
                            {this.renderField(2, [whiteQueen, whitePawn, blackPawn, blackKing], 'D')}
                        </div>
                        <div className='field__column'>
                            {this.renderField(1, [whiteKing, whitePawn, blackPawn, blackQueen], 'E')}
                        </div>
                        <div className='field__column'>
                            {this.renderField(2, [whiteBishop, whitePawn, blackPawn, blackBishop], 'F')}
                        </div>
                        <div className='field__column'>
                            {this.renderField(1, [whiteKnight, whitePawn, blackPawn, blackKnight], 'G')}
                        </div>
                        <div className='field__column'>
                            {this.renderField(2, [whiteRook, whitePawn, blackPawn, blackRook], 'H')}
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