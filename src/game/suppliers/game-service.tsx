import {GameNavigation, SelectPlayer} from '../../UI/start-game'
import {AddPiecePanel} from '../../UI/new-figure'
import {Arena} from '../../UI/Arena'
import {Field} from '../../UI'
import {Board} from '../../UI/board'
import {Pawn, Piece} from '../pieces'
import {Coordinate, PromotePawnPanel, Vector2d} from '../chess-possible-move'
import {Move} from '../../UI/history/move'
import {HistoryOfMoves} from '../../UI/history'
import {MoveType, MoveTypes} from './move-type'

export class GameService {
    whiteTurn: boolean
    private activeField: Field | undefined
    private possibleMoves: Array<Field> = []
    private previousMove: Array<Field> = []
    arrayOfPossibleMoves: Array<Move> = []
    allFields: Array<Field> = []
    gameNavigation: GameNavigation | undefined
    isPositionEditorDisplayed: boolean = false
    isTrashActive: boolean = false
    addPiecePanels: Array<AddPiecePanel> = []
    board: Board | undefined
    isGameStarted: boolean = false
    arena: Arena | undefined
    promotePawnPanel: PromotePawnPanel | undefined
    promotedField: Field | undefined
    selectPlayer: SelectPlayer | undefined
    playerColor: number = -1
    historyOfMoves: HistoryOfMoves | undefined
    moveHistory: string = ''
    arrayOfMoves: Array<Move> = []

    constructor() {
        this.whiteTurn = true
        this.allFields = []
    }

    fieldClick(field: Field) {
        const isPiece: Piece = field.piece!

        if (isPiece) {
            if (this.isTrashActive && isPiece.canDelete()) {
                this.removePieceFromField(field)
            }

            if (this.isGameStarted) {
                if (isPiece.color === this.getColor()) {
                    if (this.activeField) {
                        this.activeField.setActive(false)
                    }

                    if (this.previousMove) {
                        this.setActiveFields(this.previousMove, true)
                    }

                    this.activeField = field
                    this.activeField.setActive(true)
                    this.setNewPossibleMoves(field)
                }
            }
        }

        if (field.state.correctMove) {
            if (this.activeField?.piece?.isPawn() && (field.coordinate.y === 1 || field.coordinate.y === 8)) {
                this.renderPawnPromotion(this.activeField, field)
            } else {
                this.makeMove(field)
            }

                this.checkMoveType()
        }
    }

    checkMoveType() {

    }

    setPlayerColor(vector: number) {
        this.playerColor = vector
        this.board?.setVectorDirection(vector)
    }

    toggleSide() {
        const vector = this.playerColor === 1 ? -1 : 1

        this.playerColor = vector
        this.board?.setVectorDirection(vector)
        this.changeColor()
    }

    renderPawnPromotion(field: Field, pawnPromotionField: Field) {
        this.promotePawnPanel?.setColorOfPieces(field.piece!.color, field.coordinate.x)
        this.promotePawnPanel?.renderPawnPromotion(true)
        this.promotedField = pawnPromotionField
        this.setPawnPromotionDisplayed(true)
    }

    setPawnPromotionDisplayed(displayed: boolean) {
        this.board?.setPawnPromotionMode(displayed)
    }

    setPromotedFigureToField(piece: Piece) {
        this.addMoveToHistory(this.promotedField!, piece)
        this.promotedField?.setPiece(piece, false)
        this.setPiecesMoved(this.promotedField!, this.activeField!)
        this.setActiveFields(this.previousMove, false)
        this.changeTurn(this.promotedField!)
        this.setActiveFields(this.previousMove, true)
    }

    changeTurn(field: Field) {
        this.activeField!.removePiece()
        this.possibleMoves.forEach(field => field.setPossibleMove(false))
        this.previousMove = [field, this.activeField!]
        this.toggleSide()
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

    getFieldByXY(x: number, y: number): Field | undefined {

        return this.allFields.find(field => field.coordinate.x === x && field.coordinate.y === y)
    }

    setNewPossibleMoves(field: Field) {
        const specialMove: Array<Move> = this.getSpecialMovesForPiece(field)

        this.arrayOfPossibleMoves = specialMove
        this.setPossibleMovesActive(false)
        this.possibleMoves = this.getCorrectMoves(field)
            .concat(specialMove)
            .map(field => field.fieldTo)
        this.setPossibleMovesActive(true)
    }

    getSpecialMovesForPiece(field: Field): Array<Move> {
        return field.piece?.getSpecialMoves().map(move => this.specialMovePossible(move, field))
            .flat(1).filter(Boolean)!
    }

    specialMovePossible(move: MoveType, field: Field): Array<Move> {
        switch (move) {
            case MoveTypes.SMALL_CASTLE:
                const smallCastle = this.getFieldForCastle(field, true)

                return smallCastle ?
                    [new Move(field, smallCastle!, '', undefined, MoveTypes.SMALL_CASTLE, undefined)]
                    : []

            case MoveTypes.BIG_CASTLE:
                const bigCastle = this.getFieldForCastle(field, false)

                return bigCastle ?
                    [new Move(field, bigCastle, '', undefined, MoveTypes.BIG_CASTLE,undefined)]
                    : []
            case MoveTypes.EN_PASSANT:
                const enPassant = this.isEnPassantPossible(field)

                return enPassant ? [new Move(field, enPassant!, '', undefined, MoveTypes.EN_PASSANT, undefined)]
                    : []

            case MoveTypes.MOVE_TWO:
                const moveTwo = this.isMoveTwoPossible(field)

                return moveTwo ? [new Move(field, moveTwo!, '', undefined, MoveTypes.MOVE_TWO, undefined)]
                    : []
            case MoveTypes.PAWN_CAPTURE:
                const pawnCapture = this.isPawnCapturePossible(field)

                return pawnCapture.map(move => [new Move(field, move, '', undefined, MoveTypes.PAWN_CAPTURE, undefined)])
                    .flat(1)
                    .filter(Boolean)
            default:
                return []
        }
    }

    checkCastleEmptyFields(field: Field, smallCastle: boolean) {
        const size = smallCastle ? 2 : 3
        const direction = smallCastle ? 1 : -1
        const kingCoordinate = field.coordinate

        for (let i = 1; i <= size; i++) {
            const searchedField = this.getFieldByXY(kingCoordinate.x + (i * direction), kingCoordinate.y)!

            if (searchedField.piece) {
                return false
            }
        }
        return true
    }

    getRookToCastle(field: Field, smallCastle: boolean): boolean {
        const rookX = smallCastle ? 8 : 1

        return this.getFieldByXY(rookX, field.coordinate.y)!.piece?.hasMoved!
    }

    getReturnedFieldForCastle(field: Field, smallCastle: boolean): Field {
        const returnedFieldX = smallCastle ? 2 : -2

        return this.getFieldByXY(field.coordinate.x + returnedFieldX, field.coordinate.y)!
    }

    getKingToCastle(field: Field) {
        return this.getFieldByXY(field.coordinate.x, field.coordinate.y)!.piece?.hasMoved!
    }

    getFieldForCastle(field: Field, smallCastle: boolean) {
        if (!this.getRookToCastle(field, smallCastle) && this.checkCastleEmptyFields(field, smallCastle) && !this.getKingToCastle(field)) {

            return this.getReturnedFieldForCastle(field, smallCastle)
        }
        return undefined
    }

    isEnPassantPossible(field: Field) {
        const arrayLength: number = this.arrayOfMoves.length

        if (arrayLength !== 0) {
            const figureColor = field.piece?.color
            const arrayLength: number = this.arrayOfMoves.length
            const lastMove: Move = this.arrayOfMoves[arrayLength - 1]
            const pawnTwoFieldsMove: boolean = lastMove.specialMove === MoveTypes.MOVE_TWO
            const lastMoveCoordinate = lastMove.fieldTo.coordinate
            const isWhiteFigure = figureColor === 'white'
            const direction = isWhiteFigure ? 1 : -1
            const isInTheSameLane = field.coordinate.y === lastMoveCoordinate.y

            if (pawnTwoFieldsMove && isInTheSameLane) {
                return this.getFieldByXY(lastMoveCoordinate.x, lastMoveCoordinate.y + direction)!
            }
        }
    }

    isMoveTwoPossible(field: Field) {
        const direction = field.piece?.color === 'white' ? 1 : -1
        const currentPawn = field.piece
        const secondFieldCoordinateY = currentPawn!.currentCoordinate.y + (direction * 2)
        const currentBoardColumn = currentPawn!.currentCoordinate.x
        const firstField = this.allFields.find(field => field.coordinate.y === (currentPawn!.currentCoordinate.y + (direction * 1)) && field.coordinate.x === currentBoardColumn)!
        const secondField = this.allFields.find(field => field.coordinate.y === secondFieldCoordinateY && field.coordinate.x === currentBoardColumn)!

        if (currentPawn?.isInStartingPosition() && !firstField.piece && !secondField.piece) {
            return secondField
        }
    }

    isPawnCapturePossible(field: Field) {
        const direction = field.piece?.color === 'white' ? 1 : -1
        const currentCoordinate: Coordinate = field.coordinate
        const leftX: number = currentCoordinate.x - 1
        const rightX: number = currentCoordinate.x + 1
        const fieldNumber: number = currentCoordinate.y + direction
        const leftSideCoordinate: Field = this.getFieldByXY(leftX, fieldNumber)!
        const rightSideCoordinate: Field = this.getFieldByXY(rightX, fieldNumber)!

        return [leftSideCoordinate, rightSideCoordinate].filter(f => f?.piece !== undefined && f?.piece?.color !== field.piece?.color)
    }

    setPossibleMovesActive(isPossible: boolean) {
        this.possibleMoves.forEach(field => field?.setPossibleMove(isPossible))
    }

    fieldFrom(destinationField: Field) {
        const selectedField = this.activeField!
        const selectedFieldCoordinate = selectedField.coordinate

        if (selectedField.piece?.canGoToTheSameField()) {
            const secondPiece = this.allFields.filter(field => field.piece?.name === selectedField.piece?.name
                && field.piece?.color === selectedField.piece?.color)
                .find(field => field.piece !== selectedField.piece)

            if (secondPiece) {
                const canGoTheSameField = this.getCorrectMoves(secondPiece).find(move => move.fieldTo.id === destinationField.id)
                if (canGoTheSameField) {
                    return secondPiece.coordinate.boardRow === selectedFieldCoordinate.boardRow ?
                        selectedFieldCoordinate.boardColumn.toLowerCase() : selectedFieldCoordinate.boardRow
                }
            }
        }
        return ''
    }

    makeMove(field: Field) {
        this.setPiecesMoved(field, this.activeField!)
        this.addMoveToHistory(field, undefined)
        this.setActiveFields(this.previousMove, false)
        field.setPiece(this.activeField!.piece!, true)
        this.changeTurn(field)
    }

    setPiecesMoved(field: Field, activeField: Field) {
        field.setHasMoved()
        activeField.setHasMoved()
    }

    addMoveToHistory(field: Field, piece: Piece | undefined) {
        const specialMoveName = piece ? MoveTypes.PROM :this.arrayOfPossibleMoves.find(moves => moves.fieldTo === field)?.specialMove
        const fieldFrom = this.fieldFrom(field)
        const move = new Move(this.activeField!, field, fieldFrom, undefined, specialMoveName ? specialMoveName : MoveTypes.NORMAL, piece)
        this.arrayOfMoves = this.arrayOfMoves.concat(move)
        this.moveHistory = this.whiteTurn ? `${this.moveHistory}${move.nameOfMove}` : `${this.moveHistory},${move.nameOfMove};`
        this.historyOfMoves?.setHistoryOfMoves(this.moveHistory)
    }

    setActiveFields(fields: Array<Field>, active: boolean) {
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

    getAllPossibleMovesFromDirection(currentField: Field, direction: Vector2d): Array<Field> {
        if (!currentField.piece?.canMoveMultipleSquares()) {
            const field = this.getFieldByXY(currentField.coordinate.x + direction.x, currentField.coordinate.y + direction.y)
            const isPawn = currentField.piece instanceof Pawn

            if (!isPawn) {
                if (field?.piece && field?.piece.color === currentField.piece?.color) {
                    return []
                } else {
                    return [field!].filter(field => field)
                }
            } else {
                let field = this.getFieldByXY(
                    currentField.coordinate.x + (direction.x),
                    currentField.coordinate.y + (direction.y))

                return field?.piece ? [] : [field!]
            }

        } else {
            let counter = 1
            let canGoFurther: boolean = true
            let field = this.getFieldByXY(
                currentField.coordinate.x + (direction.x * counter),
                currentField.coordinate.y + (direction.y * counter))
            let arrayField: Array<Field> = []
            while (field && field.piece?.color !== currentField.piece?.color && canGoFurther) {
                if (field?.piece) {
                    canGoFurther = false
                }

                counter++
                arrayField = arrayField.concat(field)
                field = this.getFieldByXY(
                    currentField.coordinate.x + (direction.x * counter),
                    currentField.coordinate.y + (direction.y * counter))
            }
            return arrayField
        }
    }

    getCorrectMoves(currentField: Field): Array<Move> {
        return currentField.piece!.getAllPossibleDirectionsWithColor()
            .map(direction => this.getAllPossibleMovesFromDirection(currentField, direction))
            .flat(1)
            .map(move => new Move(currentField, move, '', undefined, MoveTypes.NORMAL, undefined))
        // .filter(filterField => {
        //     (this.canSee(filterField, currentField) || currentField.piece!.canJump())
        //     // &&
        //     // this.isEmptyOrEnemy(field) && (this.isCheck() && this.canPreventCheck(field, piece.coordinate)) && this.dontCauseCheck()
        // })
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

    /**
     *  roszada
     *      nie ma szacha (poprawne ruchy przeciwnika)
     *      pozycja startowa króla i wiezy (coordinate)
     *      król i wieża nie wykonywały ruchów (historia ruchów)
     *      pola pomiedzy sa puste  (field)
     *      nie moze byc szachowane pole wzdluz roszady oprocz wiezy (poprawne ruchy przeciwnika)
     *  bicie w przelocie
     *      przeciwny pionek wykonał specjany ruch o 2 na pole nr 5 lub 4 w zaleznośic od koloru
     *      pionek stoi na polu nr 4 lub 5 w zaleznośic od koloru
     *      pionek bijący stoi jedną kolumne w bok
     *  promocja pionka
     *      pionek wykonuje ruch na pole nr 8 lub 1 w zaleznośic od koloru
     *  ruch pionka o 2
     *      pionek jest na pozycji startowej (coordinate)
     *      pionek nie wykonywał wcześniej ruchów (historia ruchów)
     *      pierwsze i drugie pole przed pionkiem jest puste (field)
     *  bicie pionkiem po skosie
     *      po skosie znajduje się figura przeciwnika
     *      figura przeciwnika stoi jedną kolumnę obok i jedno pole w kierunku chodzenia pionka
     */
}