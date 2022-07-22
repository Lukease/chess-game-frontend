import React from 'react'
import './Arena.css'
import king from './chess-icon/chess-king-solid.svg'
import queen from './chess-icon/chess-queen-solid.svg'
import knight from './chess-icon/chess-knight-solid.svg'
import pawn from './chess-icon/chess-pawn-solid.svg'
import rook from './chess-icon/chess-rook-solid.svg'
import bishop from './chess-icon/chess-bishop-solid.svg'
import knightReg from './chess-icon/chess-knight-regular.svg'
import queenReg from './chess-icon/chess-queen-regular.svg'
import kingReg from './chess-icon/chess-king-regular.svg'
import bishopReg from './chess-icon/chess-bishop-regular.svg'
import pawnReg from './chess-icon/chess-pawn-regular.svg'
import rookReg from './chess-icon/chess-rook-regular.svg'
import {Field, FieldNumber, Letter} from './Arena_utils'

class Board extends React.Component<any, any> {
    renderLetters(letter: string) {
        return (
            <Letter
                value={letter}
            />
        )
    }

    renderNumbers(fieldNumber: number) {
        return (
            <FieldNumber
                value={fieldNumber}
            />
        )
    }

    renderField(color: string, name: string, chess: boolean) {
        return (
            <Field
                value={color}
                iconName={name}
                isFigure={chess}
            />
        )
    }

    render() {
        return (
            <div className={'game'}>
                <div className={'game__letters'}>
                    {this.renderLetters('')}
                    {this.renderLetters('A')}
                    {this.renderLetters('B')}
                    {this.renderLetters('C')}
                    {this.renderLetters('D')}
                    {this.renderLetters('E')}
                    {this.renderLetters('F')}
                    {this.renderLetters('G')}
                    {this.renderLetters('H')}
                    {this.renderLetters('')}
                </div>
                <div className={'arena'}>
                    <div className={'numbers'}>
                        {this.renderNumbers(8)}
                        {this.renderNumbers(7)}
                        {this.renderNumbers(6)}
                        {this.renderNumbers(5)}
                        {this.renderNumbers(4)}
                        {this.renderNumbers(3)}
                        {this.renderNumbers(2)}
                        {this.renderNumbers(1)}
                    </div>
                    <div>
                        <div className='field-row'>
                            {this.renderField('black', rook, true)}
                            {this.renderField('white', knight, true)}
                            {this.renderField('black', bishop, true)}
                            {this.renderField('white', queen, true)}
                            {this.renderField('black', king, true)}
                            {this.renderField('white', bishop, true)}
                            {this.renderField('black', knight, true)}
                            {this.renderField('white', rook, true)}
                        </div>
                        <div className='field-row'>
                            {this.renderField('white', pawn, true)}
                            {this.renderField('black', pawn, true)}
                            {this.renderField('white', pawn, true)}
                            {this.renderField('black', pawn, true)}
                            {this.renderField('white', pawn, true)}
                            {this.renderField('black', pawn, true)}
                            {this.renderField('white', pawn, true)}
                            {this.renderField('black', pawn, true)}
                        </div>
                        <div className='field-row'>
                            {this.renderField('black', '', false)}
                            {this.renderField('white', '', false)}
                            {this.renderField('black', '', false)}
                            {this.renderField('white', '', false)}
                            {this.renderField('black', '', false)}
                            {this.renderField('white', '', false)}
                            {this.renderField('black', '', false)}
                            {this.renderField('white', '', false)}
                        </div>
                        <div className='field-row'>
                            {this.renderField('white', '', false)}
                            {this.renderField('black', '', false)}
                            {this.renderField('white', '', false)}
                            {this.renderField('black', '', false)}
                            {this.renderField('white', '', false)}
                            {this.renderField('black', '', false)}
                            {this.renderField('white', '', false)}
                            {this.renderField('black', '', false)}
                        </div>
                        <div className='field-row'>
                            {this.renderField('black', '', false)}
                            {this.renderField('white', '', false)}
                            {this.renderField('black', '', false)}
                            {this.renderField('white', '', false)}
                            {this.renderField('black', '', false)}
                            {this.renderField('white', '', false)}
                            {this.renderField('black', '', false)}
                            {this.renderField('white', '', false)}
                        </div>
                        <div className='field-row'>
                            {this.renderField('white', '', false)}
                            {this.renderField('black', '', false)}
                            {this.renderField('white', '', false)}
                            {this.renderField('black', '', false)}
                            {this.renderField('white', '', false)}
                            {this.renderField('black', '', false)}
                            {this.renderField('white', '', false)}
                            {this.renderField('black', '', false)}
                        </div>
                        <div className='field-row'>
                            {this.renderField('black', pawnReg, true)}
                            {this.renderField('white', pawnReg, true)}
                            {this.renderField('black', pawnReg, true)}
                            {this.renderField('white', pawnReg, true)}
                            {this.renderField('black', pawnReg, true)}
                            {this.renderField('white', pawnReg, true)}
                            {this.renderField('black', pawnReg, true)}
                            {this.renderField('white', pawnReg, true)}
                        </div>
                        <div className='field-row'>
                            {this.renderField('white', rookReg, true)}
                            {this.renderField('black', knightReg, true)}
                            {this.renderField('white', bishopReg, true)}
                            {this.renderField('black', kingReg, true)}
                            {this.renderField('white', queenReg, true)}
                            {this.renderField('black', bishopReg, true)}
                            {this.renderField('white', knightReg, true)}
                            {this.renderField('black', rookReg, true)}
                        </div>
                    </div>
                    <div className={'numbers'}>
                        {this.renderNumbers(8)}
                        {this.renderNumbers(7)}
                        {this.renderNumbers(6)}
                        {this.renderNumbers(5)}
                        {this.renderNumbers(4)}
                        {this.renderNumbers(3)}
                        {this.renderNumbers(2)}
                        {this.renderNumbers(1)}
                    </div>
                </div>
                <div className={'game__letters game'}>
                    {this.renderLetters('')}
                    {this.renderLetters('A')}
                    {this.renderLetters('B')}
                    {this.renderLetters('C')}
                    {this.renderLetters('D')}
                    {this.renderLetters('E')}
                    {this.renderLetters('F')}
                    {this.renderLetters('G')}
                    {this.renderLetters('H')}
                    {this.renderLetters('')}
                </div>
            </div>
        )
    }
}

function Arena() {
    return (
        <div className={'arena'}>
            <Board/>
        </div>
    )
}

export default Arena