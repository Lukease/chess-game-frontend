import React from 'react'

export const correctMovesOfBishop = (coordinate: Array<number>) => {
    const [column, field] = coordinate
    const moves: Array<Array<number>> = [
        [column - 1, field - 1],
        [column - 2, field - 2],
        [column - 3, field - 3],
        [column - 4, field - 4],
        [column - 5, field - 5],
        [column - 6, field - 6],
        [column - 7, field - 7],
        [column + 1, field - 1],
        [column + 2, field - 2],
        [column + 3, field - 3],
        [column + 4, field - 4],
        [column + 5, field - 5],
        [column + 6, field - 6],
        [column + 7, field - 7],
        [column - 1, field + 1],
        [column - 2, field + 2],
        [column - 3, field + 3],
        [column - 4, field + 4],
        [column - 5, field + 5],
        [column - 6, field + 6],
        [column - 7, field + 7],
        [column + 1, field + 1],
        [column + 2, field + 2],
        [column + 3, field + 3],
        [column + 4, field + 4],
        [column + 5, field + 5],
        [column + 6, field + 6],
        [column + 7, field + 7],
    ]

    return moves
}