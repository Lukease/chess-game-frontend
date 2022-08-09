import React from 'react'

export const correctMovesOfQueen = (columnNumber: number, fieldNumber: number) => {
    const moves: Array<Array<number>> = [
        [-1, -1],
        [-2, -2],
        [-3, -3],
        [-4, -4],
        [-5, -5],
        [-6, -6],
        [-7, -7],
        [1, -1],
        [2, -2],
        [3, -3],
        [4, -4],
        [5, -5],
        [6, -6],
        [7, -7],
        [- 1, 1],
        [- 2, 2],
        [- 3, 3],
        [- 4, 4],
        [- 5, 5],
        [- 6, 6],
        [- 7, 7],
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
        [5, 5],
        [6, 6],
        [7, 7],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [0, 5],
        [0, 6],
        [0, 7],
        [0, -7],
        [0, -6],
        [0, -5],
        [0, -4],
        [0, -3],
        [0, -2],
        [0, -1],
        [-1, 0],
        [-2, 0],
        [-3, 0],
        [-4, 0],
        [-5, 0],
        [-6, 0],
        [-7, 0],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 0],
        [5, 0],
        [6, 0],
        [7, 0],
    ]
    const arrayOfMoves = moves.map(move => {
        const [coordinateOne, coordinateTwo] = move
        const possibleMoveColumn: number = columnNumber + coordinateOne
        const possibleMoveField: number = fieldNumber + coordinateTwo

        if (possibleMoveColumn < 1 || possibleMoveColumn > 8 || possibleMoveField < 1 || possibleMoveField > 8) {
            return
        }
        return [possibleMoveColumn, possibleMoveField]
    })
       // const filteredArray: Array<number> = arrayOfMoves.filter(coordinate => coordinate !== undefined)
    console.log(arrayOfMoves.filter(coordinate => coordinate !== undefined))
    return moves
}