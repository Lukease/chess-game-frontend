import {
    DiagonalMovingStrategy,
    KingMovingStrategy,
    KnightMovingStrategy,
    LineMovingStrategy, PawnMovingStrategy
} from '../chess-possible-move/moving-strategy'

export class MovingStrategies {

        static diagonalMoving = new DiagonalMovingStrategy()
        static lineMoving = new LineMovingStrategy()
        static knightMoving = new KnightMovingStrategy()
        static kingMoving = new KingMovingStrategy()
        static pawnMoving = new PawnMovingStrategy()


}