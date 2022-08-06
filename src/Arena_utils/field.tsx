import React, {useState} from 'react'
import '../Arena.css'
import {Figure} from "../types/figure"
import {defaultChessArrangement} from "../chess_arrangement/default_chess_arrangement";

let coordinateOfChess: Array<any> = []
let arrayOfSelectedNames: Array<string> = []
let arrayOfSelectedFigures: Array<any> = []
export let whoseTour: Array<string> = ['white']

const fillField = (chessArray: Array<Figure>, fieldId: Array<number> ) => {
    const figure: Array<string> = chessArray.map(figure => {
        const [column, number] = fieldId
        const [figureColumn, figureField] = figure.id
        if (column === figureColumn && number === figureField ) {
            return figure.name
        }
        return ''
    })

    return figure.find(name => name !== '')
}

const selectChess = (id: string, event: any) => {
    coordinateOfChess = coordinateOfChess.concat(event.target.id)
    arrayOfSelectedNames = arrayOfSelectedNames.concat(event.target.src)
    arrayOfSelectedFigures = arrayOfSelectedFigures.concat(event.target, event.currentTarget)

    return
}

const unCheckChess = () => {
    coordinateOfChess = coordinateOfChess.filter(coordinate => coordinate !== coordinate)
    arrayOfSelectedNames = arrayOfSelectedNames.filter(figure => figure !== figure)

    return
}

const moveChess = (event: any) => {
    const [figure] = arrayOfSelectedNames
    const [previousField, parentOfPreviousFigure] = arrayOfSelectedFigures
    const currentFieldImg = event.target.firstChild

    previousField.classList.add('image__hide')
    parentOfPreviousFigure.classList.remove('field__chosen')
    currentFieldImg.src = figure
    currentFieldImg.classList.remove('image__hide')
    arrayOfSelectedNames = arrayOfSelectedNames.filter(figure => figure !== figure)
    arrayOfSelectedFigures = arrayOfSelectedFigures.filter(figure => figure !== figure)
    coordinateOfChess = coordinateOfChess.filter(coordinate => coordinate !== coordinate)

    if (whoseTour.includes('white')) {
        whoseTour = whoseTour.filter(color => color !== 'white')
        whoseTour = whoseTour.concat('black')

    } else {
        whoseTour = whoseTour.filter(color => color !== 'black')
        whoseTour = whoseTour.concat('white')
    }

    return
}

export function Field(props: any) {
    const [column, number] = props.id
    console.log(column)
    console.log(number)
    const [isChosen, setIsChosen] = useState(false)
    const game = (id: string, event: any) => {
        const [color] = whoseTour

        if (event.target.className === 'image' && coordinateOfChess.length === 0 && event.target.src.search(color) !== -1) {
            setIsChosen(!isChosen)
            selectChess(id, event)

        } else if (event.target.className !== 'image__hide' && coordinateOfChess.includes(id)) {
            setIsChosen(!isChosen)
            unCheckChess()

        } else if (coordinateOfChess.length !== 0) {
            moveChess(event)
        }
    }

    return (
        <button
            className={isChosen ? `field  field__${props.value} field__chosen` : `field  field__${props.value}`}
            onClick={event => {
                game(props.id, event)
            }}
        >
            <img
                className={fillField(defaultChessArrangement, props.id) ? 'image' : 'image image__hide'}
                id={props.id}
                src={fillField(defaultChessArrangement, props.id)}
                alt={''}
            >
            </img>
        </button>
    )
}
