import React from 'react'
import {addPieceArrangement} from "../../chess_arrangement/add-Piece-arrangement";

export class PromotePawn extends React.Component<any, any> {
    // addNewPiece: Array<Piece>

    constructor(props: any) {
        super(props)

        this.SelectFigure = this.SelectFigure.bind(this)
        // this.addNewPiece = addPieceArrangement(this.color).filter(piece=> !(piece instanceof Pawn))
    }

    SelectFigure(event: any) {

    }

    render() {
        return (
            <div className={`select`}
                 id={'select-container'}
                 style={{display: `none`}}
            >
                <div className={`select__nav`}>
                    <div className={`select__new-figure`}
                         onClick={this.SelectFigure}
                         title={'Queen'}
                    > ♕
                    </div>
                    <div className={`select__new-figure`}
                         onClick={this.SelectFigure}
                         title={'Knight'}
                    > ♘
                    </div>
                    <div className={`select__new-figure`}
                         onClick={this.SelectFigure}
                         title={'Rook'}
                    > ♖
                    </div>
                    <div className={`select__new-figure`}
                         onClick={this.SelectFigure}
                         title={'Bishop'}
                    > ♗
                    </div>
                </div>
            </div>
        )
    }
}
