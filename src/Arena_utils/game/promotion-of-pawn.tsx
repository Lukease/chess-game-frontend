import React from 'react'
import {
    getItemFromLocalStorage,
    setArrayToLocalStorage,
} from '../data-base'
import {Figure} from '../../types'
import {addMoveToHistory} from '../history'

let figureId: string
let oldId: string

export class PromotePawn extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.SelectFigure = this.SelectFigure.bind(this)
    }

    SelectFigure(event: any): void {
        const selectFigureContainer: Element = document.querySelector('.select')!

        selectFigureContainer.setAttribute('style', 'display: none')

        let localStorageChess: Array<Figure> = getItemFromLocalStorage()
        const newId: number = figureId.charAt(0).charCodeAt(0) - 64
        let figureColor: string = 'white'
        const currentFieldImg: HTMLElement = document.getElementById(figureId)!
        let promotedField: Figure = localStorageChess.find(figure => figure.id === figureId)!
        let oldFigureName: string = 'empty'
        let fieldNumber: number = 8

        if (promotedField) {
            oldFigureName = promotedField.name

        }

        if (figureId.includes('1')) {
            figureColor = 'black'
            fieldNumber = 1
        }

        const selectedFigure: string = `${figureColor}-${event.target.title}`.replace(' ', '')

        localStorageChess = localStorageChess.filter(figure => figure.id !== oldId)!
        localStorageChess = localStorageChess.filter(figure => figure.id !== figureId)!

        const addFigure: Figure = ({
            id: figureId,
            name: selectedFigure,
            position: [newId, fieldNumber],
            color: figureColor
        })

        localStorageChess = localStorageChess.concat(addFigure)

        currentFieldImg.className = ''
        currentFieldImg.classList.add('figure')
        currentFieldImg.classList.add(`figure__${selectedFigure}`)

        addMoveToHistory(selectedFigure, oldFigureName, oldId, figureId)
        setArrayToLocalStorage(localStorageChess)
    }

    render() {
        return (
            <div className={`select`}
                 id={'select-container'}
                 style={{display: `none`}}
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

export const showNewFigureForPlayer = (fieldNumber: number, fieldId: string, nameOfFigure: string, idBefore: string) => {
    if (fieldNumber === 1 || fieldNumber === 8) {
        if (nameOfFigure === 'Pawn') {
            const selectFigureContainer: Element = document.querySelector('.select')!

            oldId = idBefore
            figureId = fieldId
            selectFigureContainer.setAttribute('style', 'display: flex')
        }
    }
}
