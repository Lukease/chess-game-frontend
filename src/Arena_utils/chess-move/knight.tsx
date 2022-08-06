import React  from 'react'

export const correctMovesOfKnight = (coordinate: Array<number>) => {
    const [column, field] = coordinate
    const moves: Array<Array<number>> = [
        [column - 1, field + 2],
        [column - 1, field - 2],
        [column + 1, field - 2],
        [column + 1, field + 2],
        [column + 2, field + 1],
        [column + 2, field - 1],
        [column - 2, field + 1],
        [column - 2, field - 1],
    ]

    return moves
}

