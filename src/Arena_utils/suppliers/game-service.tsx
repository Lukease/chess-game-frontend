import {Field} from '../fields-settings'
import {Coordinate} from '../chess-possible-move/coordinate'
import {GameNavigation} from '../start-game'
import {AddPiecePanel} from '../new-figure'
import {Arena, Board} from '../../Arena'

export class GameService {
    whiteTurn: boolean
    private activeField: Field | undefined
    private possibleMoves: Array<Field> = []
    private previousMove: Array<Field> = []
    allFields: Array<Field> = []
    gameNavigation: GameNavigation | undefined
    isPositionEditorDisplayed: boolean = false
    isTrashActive: boolean = false
    addPiecePanels: Array<AddPiecePanel> = []
    board: Board | undefined
    isGameStarted: boolean = false
    arena: Arena | undefined

    constructor() {
        this.whiteTurn = true
        this.allFields = []
    }

    fieldClick(field: Field) {
        if (field.piece) {
            if (this.isTrashActive) {
                this.removePieceFromField(field)
            }

            if (this.isGameStarted) {
                if (field.piece!.color === this.getColor()) {
                    if (this.activeField) {
                        this.activeField.setActive(false)
                    }

                    if (this.previousMove) {
                        this.setOrRemoveActiveFields(this.previousMove, true)
                    }

                    this.activeField = field
                    this.activeField.setActive(true)
                    this.replacePossibleMoves()
                    this.getCorrectMoves(field)
                }
            }
        }

        if (field.state.correctMove) {
            this.makeMove(field)
        }
    }

    setGameStarted(isGameStarted: boolean) {
        this.isGameStarted = isGameStarted
        this.setPositionEditorDisplayed(false)
        this.isTrashActive = false
        this.allFields.forEach(field => {
            field.setGameStarted(true)
            field.setActiveTrash(false)
        })
        this.board?.setTrashToggle(false)
    }

    removePieceFromField(field: Field) {
        field.removePiece()
    }

    addFieldToGameService(field: Field) {
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
        this.setOrRemoveActiveFields(this.possibleMoves, false)
        this.previousMove = []

        field.setPiece(this.activeField!.piece!, true)
        this.activeField!.removePiece()
        this.possibleMoves.forEach(field => field.setPossibleMove(false))
        this.changeColor()
        const previousMove = this.activeField!
        this.previousMove = [field, previousMove]
    }

    setOrRemoveActiveFields(fields: Array<Field>, active: boolean) {
        fields.forEach(move => {
            move.setActive(active)
        })
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

            for (let i = 0; i <= Math.abs(boardRow); i++) {
                // console.log(this.getFieldByRowAndColumn(
                //     (vectorY * i) + currentField.coordinate.y,
                //     (vectorX * i) + currentField.coordinate.x)!
                //     .piece)
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

    setPositionEditorDisplayed(isDisplayed: boolean) {
        this.isPositionEditorDisplayed = isDisplayed
        this.addPiecePanels?.forEach(panel => panel.isPositionEditorDisplayed())
    }

    setTrashActive(active: boolean) {
        this.isTrashActive = active
        this.addPiecePanels?.forEach(panel => panel.isDeleteIconActive(true))
        this.board?.setTrashToggle(active)
        this.allFields.forEach(field => field.setActiveTrash(active))
    }
}