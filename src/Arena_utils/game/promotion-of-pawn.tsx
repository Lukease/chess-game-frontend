import React from 'react'
import {
    getItemFromLocalStorage,
    setArrayToLocalStorage,
} from '../data-base'
import {Figure} from '../../types'
import {addMoveToHistory} from '../history'

let id: string
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
        const newFigureId: string = id
        const newId: string =  id.charAt(0)
        let pawnId: string = oldId
        let figureColor: string = 'white'
        const currentFieldImg: HTMLElement = document.getElementById(newFigureId)!
        const promotedField: Figure = localStorageChess.find(figure => figure.id === newFigureId)!
        const oldFigureName: string = promotedField.name

        if (id.includes('1')){
            pawnId = `${newId}2`
            figureColor = 'black'
        }

        const selectedFigure: string = `${figureColor}-${event.target.title}`.replace(' ', '')
        const newFigure: Figure = localStorageChess.find(figure => figure.id === pawnId)!

        newFigure.name = selectedFigure
        newFigure.id = newFigureId
        newFigure.position[1] = 8
        currentFieldImg.className = ''
        currentFieldImg.classList.add('figure')
        currentFieldImg.classList.add(`figure__${selectedFigure}`)

        addMoveToHistory(selectedFigure, oldFigureName, pawnId, newFigureId)
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

export const showNewFigureForPlayer = (fieldNumber: number, fieldId: string, nameOfFigure: string, idBefore:string) => {
    if (fieldNumber === 1 || fieldNumber === 8) {
        if (nameOfFigure === 'Pawn') {
            const selectFigureContainer: Element = document.querySelector('.select')!

            oldId = idBefore
            id = fieldId
            selectFigureContainer.setAttribute('style', 'display: flex')
        }
    }
}
