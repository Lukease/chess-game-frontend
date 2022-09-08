import React from "react";

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
                    className={'history__colors'}
                >
                    <div
                        className={'history__colors--white'}
                    >
                        white
                    </div>
                    <div
                        className={'history__colors--black'}
                    >
                        black
                    </div>
                </div>
            </div>
        )
    }
}