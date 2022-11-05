import React from 'react'
import {
    getHistoryFromLocalStorage,
    getItemFromLocalStorage,
    setArrayToLocalStorage,
    setHistoryOfMovesToLocalStorage
} from '../data-base'
import {Figure, LastMove} from '../../types'

export class PromotePawn extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {isToggleOn: false}
        this.SelectFigure = this.SelectFigure.bind(this)
    }

    SelectFigure(props: any) {
        this.setState((prevState: { isToggleOn: boolean }) => ({
            isToggleOn: !prevState.isToggleOn,
        }))

        let localStorageChess: Array<Figure> = getItemFromLocalStorage()
        // let localStorageChessHistory: Array<LastMove> = getHistoryFromLocalStorage()
        // const historySize: number = localStorageChessHistory.length - 1
        const arraySize: number = localStorageChess.length - 1
        let color: string = 'white'

        if (localStorageChess[arraySize].name.includes('black')){
            color = 'black'
        }

        const selectedFigure: string = `${color}-${props.target.innerHTML}`.replace(' ', '')

        localStorageChess[arraySize].name = selectedFigure
        localStorageChess[arraySize].color = color

        const currentFieldImg: HTMLElement = document.getElementById(localStorageChess[arraySize].id)!

        currentFieldImg.className = ''
        currentFieldImg.classList.add('figure')
        currentFieldImg.classList.add(`figure__${selectedFigure}`)

        // localStorageChessHistory[historySize].currentName = selectedFigure

        setArrayToLocalStorage(localStorageChess)
        // setHistoryOfMovesToLocalStorage(localStorageChessHistory)
    }

    render() {
        return (
            <div className={`select`}
                 id={'select-container'}
                 style={{display: !this.state.isToggleOn ? 'none' : 'flex'}}
            >
                <div className={`select__nav`}> Select new figure:</div>
                <div className={`select__new-figure`}
                     onClick={this.SelectFigure}
                     title={'Queen'}
                > Queen
                </div>
                <div className={`select__new-figure`}
                     onClick={this.SelectFigure}
                     title={'Knight'}
                > Knight
                </div>
                <div className={`select__new-figure`}
                     onClick={this.SelectFigure}
                     title={'Rook'}
                > Rook
                </div>
                <div className={`select__new-figure`}
                     onClick={this.SelectFigure}
                     title={'Bishop'}
                > Bishop
                </div>
                <div className={`select__nav`}> ♕ ♘ ♖ ♗</div>
            </div>
        )
    }
}

export const promotionOfPawn = (fieldNumber: number, fieldId: string, nameOfFigure: string) => {
    if (fieldNumber === 1 || fieldNumber === 8) {
        if (nameOfFigure === 'Pawn') {
            const selectFigureContainer: Element = document.querySelector('.select')!

            selectFigureContainer.setAttribute('style', 'display: flex')

            // const localStorageChess: Array<Figure> = getItemFromLocalStorage()
            // let gameArrangement: Array<Figure> = localStorageChess.filter(chess => chess.id !== fieldId)
            //
            // setArrayToLocalStorage(gameArrangement)
        }
    }
}