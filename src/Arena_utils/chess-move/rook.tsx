import React from 'react'

export const correctMovesOfRook = (columnNumber: number, fieldNumber: number) => {
    const moves: Array<Array<number>> = [
        [0 ,   1],
        [0 ,   2],
        [0 ,   3],
        [0 ,   4],
        [0 ,   5],
        [0 ,   6],
        [0 ,   7],
        [0 ,  - 7],
        [0 ,  - 6],
        [0 ,  - 5],
        [0 ,  - 4],
        [0 ,  - 3],
        [0 ,  - 2],
        [0 ,  - 1],
        [ - 1, 0],
        [ - 2, 0],
        [ - 3, 0],
        [ - 4, 0],
        [ - 5, 0],
        [ - 6, 0],
        [ - 7, 0],
        [  1, 0],
        [  2, 0],
        [  3, 0],
        [  4, 0],
        [  5, 0],
        [  6, 0],
        [  7, 0],
    ]

    return moves
}