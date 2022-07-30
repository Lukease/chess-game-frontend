import React, {useState} from 'react'
import '../Arena.css'

let coordinateOfChess: Array<any> = []
let selectedFigure: Array<string> = []
let lastFigure: Array<any> = []
export let whoseTour: Array<string> = ['white']

const selectChess = (fieldNumber: number, event: any, fieldLetter: string) => {
    coordinateOfChess = coordinateOfChess.concat(fieldLetter, fieldNumber)
    selectedFigure = selectedFigure.concat(event.target.src)
    lastFigure = lastFigure.concat(event.target, event.currentTarget)

    return
}

const unCheckChess = () => {
    coordinateOfChess = coordinateOfChess.filter(coordinate => coordinate !== coordinate)
    selectedFigure = selectedFigure.filter(figure => figure !== figure)

    return
}

const moveChess = (event: any) => {
    const [figure] = selectedFigure
    const [previousField, parentOfPreviousFigure] = lastFigure
    const currentFieldImg = event.target.firstChild

    previousField.classList.add('image__hide')
    parentOfPreviousFigure.classList.remove('field__chosen')
    currentFieldImg.src = figure
    currentFieldImg.color = whoseTour
    currentFieldImg.classList.remove('image__hide')
    selectedFigure = selectedFigure.filter(figure => figure !== figure)
    lastFigure = lastFigure.filter(figure => figure !== figure)
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
    const [isChosen, setIsChosen] = useState(false)
    const game = (name: string, fieldNumber: number, letter: string, event: any) => {

        if (event.target.className !== 'image__hide' && coordinateOfChess.length === 0 && whoseTour.includes(props.color)) {
            setIsChosen(!isChosen)
            selectChess(fieldNumber, event, letter)

        } else if (event.target.className !== 'image__hide' && coordinateOfChess.includes(letter, fieldNumber)) {
            setIsChosen(!isChosen)
            unCheckChess()
        }

        if (event.target.firstChild.color !== whoseTour && coordinateOfChess.length !== 0) {
            moveChess(event)
        }
    }

    return (
        <button
            className={isChosen ? `field  field__${props.value} field__chosen` : `field  field__${props.value}`}
            onClick={event => {
                game(props.figureName, props.number, props.letter, event)
            }}
        >
            {props.isFigure
                ? <img
                    src={props.figureName}
                    color={props.color}
                    className={'image'}
                >
                </img>
                : <img
                    className={'image image__hide'}
                    src={''}

                >
                </img>
                //todo add color to empty field
            }
        </button>
    )
}
