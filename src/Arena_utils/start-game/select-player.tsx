import React from 'react'
import {Piece} from '../chess-possible-move'

export class SelectPlayer extends React.Component<any, any> {
    kings: Array<Piece>

    constructor(props: any) {
        super(props)

        this.kings = props.kings
    }

    renderKings() {
        return  this.kings.map((kings,index) =>{
            return (
                    <img
                        alt={''}
                        src={kings.getImageUrl()}
                        draggable={false}
                        key={index}
                        style={{
                            maxHeight: '90%',
                            maxWidth: '90%'
                    }}
                    ></img>
            )
        })
    }

    render() {
        return (
            <div className={'select__player'}
                // style={{display: 'none'}}
            >
                {this.renderKings()}
            </div>
        )
    }

}