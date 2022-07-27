import React, {useState} from 'react'
import '../Arena.css'

let selected: Array<any> = []
let selectedFigure: Array<string> = []
let lastFigure: Array<any> = []

export function Field(props: any) {
    const [isChosen, setIsChosen] = useState(false)
    const selectFigure = (name: string, number: number, letter: string, event: any) => {

        if (event.target.id === 'figure' && selected.length === 0) {
            selected = selected.concat(letter, number)
            setIsChosen(!isChosen)
            selectedFigure = selectedFigure.concat(event.target.src)
            lastFigure = lastFigure.concat(event.target, event.currentTarget)

        } else if (event.target.id === 'figure' && selected.includes(letter, number)) {
            setIsChosen(!isChosen)
            selected = []
            selectedFigure = []
        }

        if ( event.target.id !== 'figure' && selected.length !== 0) {
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
                ? <img src={props.figureName} id={'figure'} ></img>
                : <img id={''} className={'image-hide'}></img>
            }
        </button>
    )
}