import React, {useState} from 'react'
import '../Arena.css'
import {Figure} from '../types/figure'

let selected: Array<any> = []
let selectedFigure: Array<string> = []
let lastFigure: Array<any> = []
let whoseTour: Array<string> = ['white']
let arrayOfFigure: Array<Figure> = []

export function Field(props: any) {
    const [isChosen, setIsChosen] = useState(false)
    const [colorOfFigure] = whoseTour
    const selectFigure = (name: string, number: number, letter: string, event: any) => {

        if (event.target.id === 'figure' && selected.length === 0 && whoseTour.includes(props.color)) {

            selected = selected.concat(letter, number)
            setIsChosen(!isChosen)
            selectedFigure = selectedFigure.concat(event.target.src)
            lastFigure = lastFigure.concat(event.target, event.currentTarget)

        } else if (event.target.id === 'figure' && selected.includes(letter, number)) {
            setIsChosen(!isChosen)
            selected = []
            selectedFigure = []
        }

        if (event.target.color !== 'figure' && selected.length !== 0) {
            const [figure] = selectedFigure
            const [previousField, parentOfPreviousFigure] = lastFigure
            const currentFieldImg = event.target.firstChild

            previousField.classList.add('image-hide')
            previousField.id = ''
            currentFieldImg.id = 'figure'
            parentOfPreviousFigure.classList.remove('field__chosen')
            currentFieldImg.src = figure
            currentFieldImg.classList.remove('image-hide')
            selectedFigure = []
            lastFigure = []
            selected = []

            if (whoseTour.includes('white')) {
                whoseTour = []
                whoseTour = whoseTour.concat('black')

            }else {
                whoseTour = []
                whoseTour = whoseTour.concat('white')
            }
        }
    }

    return (
        <button
            className={isChosen ? `field  field__${props.value} field__chosen` : `field  field__${props.value}`}
            onClick={event => {
                selectFigure(props.figureName, props.number, props.letter, event)
            }}

        >
            {props.isFigure
                ? <img
                    src={props.figureName}
                    id={'figure'}
                    color={props.color}
                >
                </img>
                : <img
                    id={'empty-field'}
                    className={'image-hide'}
                    // color={}
                >
                </img>
            //todo add color to empty field
            }
        </button>
    )
}