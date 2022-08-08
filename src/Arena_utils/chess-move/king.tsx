import React from 'react'

export const correctMovesOfKing = (columnNumber: number, fieldNumber: number) => {

    const moves: Array<Array<number>> = [
        [0 , 1],
        [0 , -1],
        [1,],
        [-1,],
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
    ]

    return moves
}