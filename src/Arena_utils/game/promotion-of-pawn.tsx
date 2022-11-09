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

    SelectFigure(event: any): void {
        this.setState((prevState: { isToggleOn: boolean }) => ({
            isToggleOn: !prevState.isToggleOn,
        }))

        let localStorageChess: Array<Figure> = getItemFromLocalStorage()
        let localStorageChessHistory: Array<LastMove> = getHistoryFromLocalStorage()
        const historySize: number = localStorageChessHistory.length - 1
        const arraySize: number = localStorageChess.length - 1
        let color: string = 'white'

        if (localStorageChess[arraySize].name.includes('black')) {
            color = 'black'
        }

        const selectedFigure: string = `${color}-${event.target.title}`.replace(' ', '')

        localStorageChess[arraySize].name = selectedFigure
        localStorageChess[arraySize].color = color

        const currentFieldImg: HTMLElement = document.getElementById(localStorageChess[arraySize].id)!

        currentFieldImg.className = ''
        currentFieldImg.classList.add('figure')
        currentFieldImg.classList.add(`figure__${selectedFigure}`)

        localStorageChessHistory[historySize].currentName = selectedFigure

        setArrayToLocalStorage(localStorageChess)
        setHistoryOfMovesToLocalStorage(localStorageChessHistory)
    }

    render() {
        return (
            <div className={`select`}
                 id={'select-container'}
                 style={{display: !this.state.isToggleOn ? 'none' : 'flex'}}
            >
                <div className={`select__nav`}>
                    <div className={`select__new-figure`}
                         onClick={this.SelectFigure}
                         title={'Queen'}
                    > ♕
                    </div>
                    <div className={`select__new-figure`}
                         onClick={this.SelectFigure}
                         title={'Knight'}
                    > ♘
                    </div>
                    <div className={`select__new-figure`}
                         onClick={this.SelectFigure}
                         title={'Rook'}
                    > ♖
                    </div>
                    <div className={`select__new-figure`}
                         onClick={this.SelectFigure}
                         title={'Bishop'}
                    > ♗
                    </div>
                </div>
            </div>
        )
    }
}

export const showNewFigureForPlayer = (fieldNumber: number, fieldId: string, nameOfFigure: string, event: any) => {
    if (fieldNumber === 1 || fieldNumber === 8) {
        if (nameOfFigure === 'Pawn') {
            const selectFigureContainer: Element = document.querySelector('.select')!

            selectFigureContainer.setAttribute('style', 'display: flex')
        }
    }
}
