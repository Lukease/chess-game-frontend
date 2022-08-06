import React from 'react'

export const correctMovesOfRook = (coordinate: Array<number>) => {
    const [column, field] = coordinate
    const moves: Array<Array<number>> = [
        [column, field + 1],
        [column, field + 2],
        [column, field + 3],
        [column, field + 4],
        [column, field + 5],
        [column, field + 6],
        [column, field + 7],
        [column, field - 7],
        [column, field - 6],
        [column, field - 5],
        [column, field - 4],
        [column, field - 3],
        [column, field - 2],
        [column, field - 1],
        [column - 1, field],
        [column - 2, field],
        [column - 3, field],
        [column - 4, field],
        [column - 5, field],
        [column - 6, field],
        [column - 7, field],
        [column + 1, field],
        [column + 2, field],
        [column + 3, field],
        [column + 4, field],
        [column + 5, field],
        [column + 6, field],
        [column + 7, field],
    ]

    return moves
}