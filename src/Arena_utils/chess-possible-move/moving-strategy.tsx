import {getAllPossibleMoves} from '../possible-moves-utils'

export abstract class MovingStrategy {
    abstract getAllPossibleMoves(position: Array<number>): Array<string>

    getAllMovesDirection = (directionX: number, directionY: number, position: Array<number>) => {
        const moves: Array<Array<number>> = Array(7).fill('').map((name, index) => {
            return [directionX * (index + 1), directionY * (index + 1)]
        })

        return getAllPossibleMoves(moves, position[0], position[1])
    }
}

export class DiagonalMovingStrategy extends MovingStrategy {

    getAllPossibleMoves(position: Array<number>): Array<string> {
        return [...this.getAllMovesDirection(-1, -1, position),
            ...this.getAllMovesDirection(-1, 1, position),
            ...this.getAllMovesDirection(1, 1, position),
            ...this.getAllMovesDirection(1, -1, position)]
    }

}

export class LineMovingStrategy extends MovingStrategy {

    getAllPossibleMoves(position: Array<number>): Array<string> {
        return [...this.getAllMovesDirection(0, -1, position),
            ...this.getAllMovesDirection(0, 1, position),
            ...this.getAllMovesDirection(1, 0, position),
            ...this.getAllMovesDirection(-1, 0, position)]
    }
}

export class KnightMovingStrategy extends MovingStrategy {
    getAllPossibleMoves(position: Array<number>): Array<string> {
        const moves: Array<Array<number>> = [
            [-1, 2],
            [-1, -2],
            [1, -2],
            [1, 2],
            [2, 1],
            [2, -1],
            [-2, 1],
            [-2, -1],
        ]
        return getAllPossibleMoves(moves, position[0], position[1])
    }
}

export class KingMovingStrategy extends MovingStrategy {
    getAllPossibleMoves(position: Array<number>): Array<string> {
        const moves: Array<Array<number>> = [
            [0, 1],
            [0, -1],
            [1, -1],
            [1, 0],
            [1, 1],
            [-1, -1],
            [-1, 0],
            [-1, 1],
        ]

        return getAllPossibleMoves(moves, position[0], position[1])
    }
}

export class PawnMovingStrategy extends MovingStrategy {
    getAllPossibleMoves(position: Array<number>): Array<string> {
        const moves: Array<Array<number>> = [
            [0, 2],
            [0, 1],
        ]

        return getAllPossibleMoves(moves, position[0], position[1])
    }
}


// const side: Array<string> = getCorrectIds(convertToIds, piece.color)
// .filter(id => id !== 'last')