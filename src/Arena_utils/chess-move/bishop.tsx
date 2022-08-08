import React from 'react'

export const correctMovesOfBishop = (columnNumber: number, fieldNumber: number) => {
    const moves: Array<Array<number>> = [
        [ - 1,  - 1],
        [ - 2,  - 2],
        [ - 3,  - 3],
        [ - 4,  - 4],
        [ - 5,  - 5],
        [ - 6,  - 6],
        [ - 7,  - 7],
        [  1,  - 1],
        [  2,  - 2],
        [  3,  - 3],
        [  4,  - 4],
        [  5,  - 5],
        [  6,  - 6],
        [  7,  - 7],
        [ - 1,   1],
        [ - 2,   2],
        [ - 3,   3],
        [ - 4,   4],
        [ - 5,   5],
        [ - 6,   6],
        [ - 7,   7],
        [  1,   1],
        [  2,   2],
        [  3,   3],
        [  4,   4],
        [  5,   5],
        [  6,   6],
        [  7,   7],
    ]

    return moves
}