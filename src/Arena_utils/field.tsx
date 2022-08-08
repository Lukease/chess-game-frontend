import React, {useState} from 'react'
import '../Arena.css'
import {Figure} from '../types'
import {defaultChessArrangement} from '../chess_arrangement/default_chess_arrangement'
import {correctMoves} from "./correct-moves";

let coordinateOfChess: Array<any> = []
let arrayOfSelectedNames: Array<string> = []
let arrayOfSelectedFigures: Array<any> = []
export let whoseTour: Array<string> = ['white']

const fillField = (chessArray: Array<Figure>, fieldId: string) => {
    const figure: Array<string> = chessArray.map(figure => {
        const column: number =  (fieldId.charAt(0)).charCodeAt(0) - 65
        const number: number = parseInt(fieldId.charAt(1))
        const [figureColumn, figureField] = figure.id

        if (column === figureColumn && number === figureField) {

            return `figure__${figure.name}`
        }
        return 'figure__empty'
    })

    const figureName = figure.find(name => name !== 'figure__empty')

    return (figureName ? figureName : 'figure__empty')
}

const selectChess = (id: string, event: any) => {
    const columnNumber: number =  (id.charAt(0)).charCodeAt(0) - 65
    const fieldNumber: number = parseInt(id.charAt(1))

    coordinateOfChess = coordinateOfChess.concat(id)

    const figureClass = event.target.className.split(' ')[1]
    const figureNameAndColor = figureClass.split('__')[1]
    const figureName = figureNameAndColor.split('-')[1]

    const coordinate =  correctMoves(figureName, columnNumber, fieldNumber)

    arrayOfSelectedNames = arrayOfSelectedNames.concat(figureNameAndColor)
    arrayOfSelectedFigures = arrayOfSelectedFigures.concat(event.target, event.currentTarget)

    return
}

const unCheckChess = () => {
    coordinateOfChess = []
    arrayOfSelectedNames = []
    arrayOfSelectedFigures = []

    return
}

const moveChess = (event: any) => {
    const [figure] = arrayOfSelectedNames
    const [previousField, parentOfPreviousFigure] = arrayOfSelectedFigures
    const currentFieldImg = event.target

    previousField.classList.remove(`figure__${figure}`)
    previousField.classList.add('figure__empty')
    parentOfPreviousFigure.classList.remove('field__chosen')
    currentFieldImg.classList.add(`figure__${figure}`)
    currentFieldImg.classList.remove('figure__empty')
    arrayOfSelectedNames = []
    arrayOfSelectedFigures = []
    coordinateOfChess = []

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
    const [isChosen, setIsChosen] = useState(false)
    const game = (id: string, event: any) => {
        const [color] = whoseTour

        if (event.target.className.includes(`figure__${color}`) && coordinateOfChess.length === 0) {
            setIsChosen(!isChosen)
            selectChess(id, event)

        } else if (event.target.className !== 'figure__empty' && coordinateOfChess.includes(id)) {
            setIsChosen(!isChosen)
            unCheckChess()

        } else if (coordinateOfChess.length !== 0) {
            moveChess(event)
        }
    }

    return (
        <div
            className={isChosen ? `field  field__${props.value} field__chosen` : `field  field__${props.value}`}
            onClick={event => {
                game(props.id, event)
            }}
        >
            <img
                // ${fillField(defaultChessArrangement, props.id)
                className={`figure ${fillField(defaultChessArrangement, props.id)}`}
                id={props.id}
            >
            </img>
        </div>
    )
}
