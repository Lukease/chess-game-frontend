import React, {useState} from 'react'
import '../Arena.css'

export function Letter(props: any) {
    return (
        <div
            className={'field-letter'}
        >
            {props.value}
        </div>
    )
}

export function Field(props: any) {
    const [isChosen, setIsChosen] = useState(false)

    const selectFigure = () => {
        if (props.isFigure) {
            setIsChosen(!isChosen)
        }
    }

    return (
        <button
            className={isChosen ? `field  field__${props.value} field__chosen` : `field  field__${props.value}`}
            onClick={selectFigure}
        >
            {props.isFigure
                ? <img src={props.iconName}/>
                : <div></div>
            }
        </button>
    )
}

export function FieldNumber(props: any) {
    return (
        <div
            className={'field-number'}>
            {props.value}
        </div>
    )
}