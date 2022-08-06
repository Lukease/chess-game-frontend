import React from 'react'

export const correctMovesOfKing = (coordinate: Array<number>) => {
    const [column, field] = coordinate
    const moves: Array<Array<number>> = [
        [column, field + 1],
        [column, field - 1],
        [column + 1, field],
        [column - 1, field],
        [column - 1, field - 1],
        [column + 1, field - 1],
        [column - 1, field + 1],
        [column + 1, field + 1],
    ]

    return moves
}