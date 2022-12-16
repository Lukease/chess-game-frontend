import React from 'react'
import {GameService} from '../../game/suppliers'
import {Move} from './move'

export class HistoryOfMoves extends React.Component<any, any> {
    gameService: GameService
    historyOfArray: Array<Array<Move>> = []

    constructor(props: any) {
        super(props)

        this.gameService = props.gameService
        this.gameService.historyOfMoves = this
        this.state = {
            isMoveAdded: false
        }

    }

    setHistoryOfMoves(movesArray: Array<Array<Move>>) {
        this.historyOfArray = movesArray

        this.setState({
            isMoveAdded: true
        })
    }

    // renderMove(move: Move, index: number) {
    //
    //     return (
    //         <div
    //             className={'history__container'}
    //             key={index}
    //         >
    //             <div
    //                 className={'history__number'}
    //             >
    //                 {index}
    //             </div>
    //             <div>
    //                 {move.setNameOfMove()}
    //             </div>
    //             <div>
    //                 {''}
    //             </div>
    //         </div>
    //     )
    // }

    // renderMoves(move: Array<Move>, index: number) {
    //     const [whiteTurn, blackTurn] = move
    //     return (
    //         <div
    //             className={'history__container'}
    //             key={index}
    //         >
    //             <div
    //                 className={'history__number'}
    //             >
    //                 {index}
    //             </div>
    //             <div className={'history__move'}>
    //                 {whiteTurn.setNameOfMove()}
    //             </div>
    //             <div className={'history__move'}>
    //                 {blackTurn.setNameOfMove()}
    //             </div>
    //         </div>
    //     )
    // }

    renderHistory() {

        return this.historyOfArray.map((move: Array<Move>, index) => {
            const whiteMove = move.find(move => move !== undefined)!
            const length = move.length
            const number = index + 1
            return (
                <div
                    className={'history__container'}
                    key={index}
                >
                    {/*{length ? this.renderMoves(move, number) : this.renderMove(whiteMove, number)}*/}
                </div>
            )
        })
    }

    render() {
        return (
            <div
                className={'history'}
            >
                <p>
                    History:
                </p>
                <div
                    className={'history__container'}
                    style={{backgroundColor: 'rgba(41,36,36,0.8)'}}
                >

                </div>
                <div className={'history__navigation'}>
                    {this.renderHistory()}
                </div>
            </div>
        )
    }
}

