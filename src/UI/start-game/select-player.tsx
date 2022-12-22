import React from 'react'
import {Piece} from '../../game/pieces'
import {GameService} from '../../game/suppliers'

export class SelectPlayer extends React.Component<any, any> {
    kings: Array<Piece>
    gameService: GameService

    constructor(props: any) {
        super(props)

        this.gameService = props.gameService
        this.kings = props.kings
        this.gameService.selectPlayer = this
    }

    selectPieceColor(color: string) {
        const vector: number = color === 'white' ? -1 : 1

        this.gameService.setPlayerColor(vector)
    }

    renderKings() {
        return this.kings.map((kings, index) => {
            return (
                <img
                    alt={''}
                    src={kings.getImageUrl()}
                    draggable={false}
                    key={index}

                    onClick={() => this.selectPieceColor(kings.color)}
                ></img>
            )
        })
    }

    render() {
        return (
            <div className={'select__player'}
            >
                {this.renderKings()}
            </div>
        )
    }

}