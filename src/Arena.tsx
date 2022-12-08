import React from 'react'
import './Arena.css'
import {
    Field,
    FieldNumber,
    Letter
} from './Arena_utils/fields-settings'
import {
    editorAddNewFigure,
    editorGetFigure,
    editorMouseMoveFigure,
    AddFigure,
    hideShowFigures
} from './Arena_utils/new-figure'
import {GameNavigation} from './Arena_utils/start-game'
import {
    setArrayToLocalStorage,
    setCorrectMovesOfOpponentToLocalStorage
} from './Arena_utils/data-base'
import {defaultChessArrangement} from './chess_arrangement/default-chess-arrangement'
import {setCurrentColorToLocalStorage} from './Arena_utils/data-base'
import {HistoryOfMoves} from './Arena_utils/history'
import {
    PromotePawn
} from './Arena_utils/game'
import {setCheckToLocalStorage} from './Arena_utils/data-base/check'
import {setSpecialMoveToLocalStorage} from './Arena_utils/data-base'
import {Piece} from './Arena_utils/chess-possible-move'
import {CoordinateService} from "./Arena_utils/suppliers/coordinate-service";
import {Coordinate} from "./Arena_utils/chess-possible-move/coordinate";
import {GameService} from "./Arena_utils/suppliers/game-service";

class Board extends React.Component<any, any> {
    pieces: Array<Piece>
    gameService: GameService
    allFields: Array<Field>

    constructor(props: any) {
        super(props)

        this.pieces = defaultChessArrangement
        this.gameService = props.gameService
        this.allFields = []
    }

    getPieceById(id: string) {
        const coordinate = CoordinateService.getCoordinateById(id)

        return this.pieces.find(piece => piece.coordinate === coordinate)!
    }

    selectActive(field: Field) {

    }

    renderLetters() {
        const alpha: Array<number> = Array.from(Array(8)).map((e, i) => i + 65)
        const arrayOfLetters: Array<string> = alpha.map(letter => String.fromCharCode(letter))
        const letterField: Array<JSX.Element> = ['', ...arrayOfLetters, ''].map((letter, index) => {

            return (
                <Letter
                    value={letter}
                    key={index}
                />
            )
        })

        return letterField
    }

    renderNumbers(site: string) {
        const arrayOfNumbers: Array<JSX.Element> = Array.apply(null, Array(8)).map((x, index) => {

            return (
                <FieldNumber
                    value={index}
                    key={index}
                    site={site}
                />
            )
        })

        return arrayOfNumbers
    }

    renderAllFields(letter: string, boardColumn: number) {
        let output: Array<JSX.Element> = Array.apply(null, Array(8)).map((x, index) => {
            const boardRow: number = index + 1
            const currentPiece: Piece = this.getPieceById(`${letter}${boardRow}`)

            return (
                <Field
                    rowNumber={boardRow}
                    id={`${letter}${boardRow}`}
                    columnNumber={boardColumn}
                    piece={currentPiece}
                    key={`${letter}${boardRow}`}
                    color={(boardColumn + boardRow) % 2 ? 'black' : 'white'}
                    gameService={this.gameService}
                />
            )
        })
        return output
    }

    renderAllColumns() {
        let output: Array<JSX.Element> = Array.apply(null, Array(8)).map((x, index) => {
            const letter: string = String.fromCharCode(64 + (index + 1))
            const boardColumn: number = index + 1

            return (
                <div className='field__column'
                     key={letter}
                >
                    {this.renderAllFields(letter, boardColumn)}
                </div>
            )

        })

        return output
    }

    render() {
        return (
            <div className={'game'}>
                <div className={'game__letters'}>
                    {this.renderLetters()}
                </div>
                <div className={'arena'}>
                    <div className={'arena__numbers'}>
                        {this.renderNumbers('left')}
                    </div>
                    <div className={'arena__chess'}>
                        {this.renderAllColumns()}
                    </div>
                    <div className={'arena__numbers'}>
                        {this.renderNumbers('right')}
                    </div>
                </div>
                <div className={'game__letters'}>
                    {this.renderLetters()}
                </div>
            </div>
        )
    }
}

export class Arena extends React.Component<any, any> {

    constructor(props: any) {
        super(props)

        this.setDefaultChessPosition = this.setDefaultChessPosition.bind(this)
    }


    setDefaultChessPosition() {
        window.location.reload()
        localStorage.clear()
        setArrayToLocalStorage(defaultChessArrangement)

        const check: boolean = false

        setCheckToLocalStorage(check)
        setSpecialMoveToLocalStorage('')
        const opponentMovesIdsArray: Array<string> = ['A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5']

        setCorrectMovesOfOpponentToLocalStorage(opponentMovesIdsArray)
    }

    render() {
        return (
            <div className={'navigation'}
                 onMouseDown={event => editorGetFigure(event)}
                 onMouseMove={event => editorMouseMoveFigure(event)}
                 onMouseUp={event => editorAddNewFigure(event)}
                 onClick={event => hideShowFigures(event)}
            >
                <HistoryOfMoves/>
                <AddFigure color={'white'}/>
                <GameNavigation
                    gameService={this.props.gameService}
                />
                <Board
                    gameService={this.props.gameService}
                />
                <AddFigure color={'black'}/>
                <PromotePawn/>
                <div
                    className={'game__navigation--default'}
                    onClick={this.setDefaultChessPosition}
                >
                </div>
            </div>
        )
    }
}

export default Arena