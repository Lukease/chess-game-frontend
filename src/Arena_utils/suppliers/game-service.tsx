import {Field} from '../fields-settings'
import {Coordinate} from '../chess-possible-move/coordinate'
import {GameNavigation} from '../start-game'

export class GameService {
    whiteTurn: boolean
    private activeField: Field | undefined
    private possibleMoves: Array<Field> = []
    private previousMove: Array<Field> = []
    allFields: Array<Field> = []
    gameNavigation: GameNavigation | undefined

    constructor() {
        this.whiteTurn = true
        this.allFields = []
    }

    fieldClick(field: Field) {
        if (field.piece) {

            if (field.piece!.color === this.getColor()) {
                if (this.activeField) {
                    this.activeField.setActive(false)
                }

                this.activeField = field
                this.activeField.setActive(true)
                this.replacePossibleMoves()
                this.getCorrectMoves(field)
            }
        }
        if (field.state.correctMove) {
            this.makeMove(field)
        }
    }

    addField(field: Field) {
        this.allFields = this.allFields.concat(field)
    }

    getFieldByCoordinate(coordinate: Coordinate) {
        return this.allFields.find(field => field.coordinate === coordinate)!
    }

    replacePossibleMoves() {
        this.possibleMoves.forEach(field => field.setPossibleMove(false))
        this.possibleMoves = this.activeField!.piece!.getAllPossibleMoves().map(coordinate => this.getFieldByCoordinate(coordinate))
        this.possibleMoves.forEach(field => field.setPossibleMove(true))
    }

    makeMove(field: Field) {
        field.setPiece(this.activeField!.piece!)
        this.activeField!.removePiece()
        this.possibleMoves.forEach(field => field.setPossibleMove(false))
        this.changeColor()
        this.previousMove = [field, this.activeField!]
    }

    getColor() {
        return this.whiteTurn ? 'white' : 'black'
    }

    changeColor() {
        this.whiteTurn = !this.whiteTurn
        this.gameNavigation!.changeTurn(this.getColor())
    }


    getCorrectMoves(currentField: Field): Array<Field> {

        return currentField.piece!.getAllPossibleMoves().map(coordinate => this.getFieldByCoordinate(coordinate)).filter(filterField => {
            (this.canSee(filterField, currentField) || currentField.piece!.canJump())
            // &&
            // this.isEmptyOrEnemy(field) && (this.isCheck() && this.canPreventCheck(field, piece.coordinate)) && this.dontCauseCheck()
        })

    }

    dontCauseCheck(): boolean {
        return true
    }

    isCheck(): boolean {
        return false
    }

    canPreventCheck(field1: Field, field2: Field): boolean {
        return false
    }

    isEmptyOrEnemy(field: Field): boolean {
        return false
    }

    canSee(field: Field, currentField: Field): boolean {
        const boardColumn = field.coordinate.x - currentField.coordinate.x
        const boardRow = field.coordinate.y - currentField.coordinate.y

        if (Math.abs(boardRow) === Math.abs(boardColumn)) {
            const vectorX = boardColumn / Math.abs(boardColumn)
            const vectorY = boardRow / Math.abs(boardRow)

            for (let i = 0; i <=  Math.abs(boardRow); i++) {
                console.log(this.getFieldByRowAndColumn(
                    (vectorY * i) + currentField.coordinate.y,
                    (vectorX * i) + currentField.coordinate.x)!
                    .piece )
                if (this.getFieldByRowAndColumn(
                    (vectorY * i) + currentField.coordinate.y,
                    (vectorX * i) + currentField.coordinate.x)!
                    .piece !== undefined) {

                    return false
                }
            }

        }
        return true
    }

    getFieldByRowAndColumn(boardColumn: number, boardRow: number) {
        return this.allFields.find(field => field.coordinate.x === boardColumn && field.coordinate.y === boardRow)
    }
}