import React, {useState} from 'react'
import '../Arena.css'
import {Coordinate} from '../types/coordinate'

export function Letter(props: any) {
    return (
        <div
            className={'field__letter'}
        >
            {props.value}
        </div>
    )
}

export function Field(props: any) {
    const [isChosen, setIsChosen] = useState(false)

    const selectFigure = (event: any, fieldNumber: number, fieldLetter: string, name: string) => {
        if (props.isFigure ) {
            const coordinate: Coordinate = { letter: fieldLetter, number: fieldNumber}
            const selectedFigureName: string = name
            setIsChosen(!isChosen)
            console.log(coordinate, selectedFigureName, event.target)
        }

        // if (!props.isFigure){
        //     event.preventDefault()
        // }

    }

    return (
        <button
            className={ isChosen ? `field  field__${props.value} field__chosen` : `field  field__${props.value}`}
            onClick={event => { selectFigure(event, props.number, props.letter, props.figureName)}}
        >
            {props.isFigure
                ? <img src={ props.figureName}/>
                : <div></div>
            }
        </button>
    )
}

export function FieldNumber(props: any) {
    return (
        <div
            className={'field__number'}
        >
            {props.value}
        </div>
    )
}