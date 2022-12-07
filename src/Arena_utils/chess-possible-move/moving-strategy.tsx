import {Coordinate} from './coordinate'
import {CoordinateService} from '../suppliers/coordinate-service'

export abstract class MovingStrategy {
    abstract getAllPossibleMoves(position: Coordinate): Array<Coordinate>

    getAllMovesDirection(directionX: number, directionY: number, position: Coordinate) {
        let currentX = position.x
        let currentY = position.y
        let currentCoordinate: Coordinate = CoordinateService.getCoordinateByColumnAndRow(currentX, currentY)
        let possibleCoordinates: Array<Coordinate> = []

        while (currentCoordinate) {
            currentX += directionX
            currentY += directionY
            currentCoordinate = CoordinateService.getCoordinateByColumnAndRow(currentX, currentY)
            possibleCoordinates = possibleCoordinates.concat(currentCoordinate)
        }
        return possibleCoordinates
    }
}

export class DiagonalMovingStrategy extends MovingStrategy {

    getAllPossibleMoves(position: Coordinate): Array<Coordinate> {
        return [...this.getAllMovesDirection(-1, -1, position),
            ...this.getAllMovesDirection(-1, 1, position),
            ...this.getAllMovesDirection(1, 1, position),
            ...this.getAllMovesDirection(1, -1, position)]
    }

}

export class LineMovingStrategy extends MovingStrategy {

    getAllPossibleMoves(position: Coordinate): Array<Coordinate> {
        return [...this.getAllMovesDirection(0, -1, position),
            ...this.getAllMovesDirection(0, 1, position),
            ...this.getAllMovesDirection(1, 0, position),
            ...this.getAllMovesDirection(-1, 0, position)]
    }
}

export class KnightMovingStrategy extends MovingStrategy {
    getAllPossibleMoves(position: Coordinate): Array<Coordinate> {
        return [
            [-1, 2],
            [-1, -2],
            [1, -2],
            [1, 2],
            [2, 1],
            [2, -1],
            [-2, 1],
            [-2, -1],
        ].map(coordinate => CoordinateService.getCoordinateByColumnAndRow(coordinate[0] + position.x, coordinate[1] + position.y))
            .filter(coordinate => coordinate !== undefined)
    }
}

export class KingMovingStrategy extends MovingStrategy {
    getAllPossibleMoves(position: Coordinate): Array<Coordinate> {
        return [
            [0, 1],
            [0, -1],
            [1, -1],
            [1, 0],
            [1, 1],
            [-1, -1],
            [-1, 0],
            [-1, 1],
        ].map(coordinate => CoordinateService.getCoordinateByColumnAndRow(coordinate[0] + position.x, coordinate[1] + position.y))
            .filter(coordinate => coordinate !== undefined)
    }
}

export class PawnMovingStrategy extends MovingStrategy {
    getAllPossibleMoves(position: Coordinate): Array<Coordinate> {
        return [
            [0, 2],
            [0, 1],
        ].map(coordinate => CoordinateService.getCoordinateByColumnAndRow(coordinate[0] + position.x, coordinate[1] + position.y))
            .filter(coordinate => coordinate !== undefined)
    }
}