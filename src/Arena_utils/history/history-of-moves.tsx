import React from 'react'

export class HistoryOfMoves extends React.Component<any, any> {
    render() {
        return (
            <div
                className={'history'}
            >
                <p>
                    History:
                </p>
                <div
                    className={'history__nav'}
                >
                    <div
                        className={'history__nav--column'}
                    >
                    </div>
                    <div
                        className={'history__nav--column'}
                    >
                    </div>
                </div>
            </div>
        )
    }
}