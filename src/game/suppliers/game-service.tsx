import {GameNavigation, SelectPlayer} from '../../UI/start-game'
import {AddPiecePanel} from '../../UI/new-figure'
import {Arena} from '../../UI/Arena'
import {Field} from '../../UI'
import {Board} from '../../UI/board'
import {King, Pawn, Piece} from '../pieces'
import {Coordinate, PromotePawnPanel, Vector2d} from '../chess-possible-move'
import {Move} from '../../UI/history/move'
import {HistoryOfMoves} from '../../UI/history'
import {MoveType, MoveTypes} from './move-type'

export class GameService {
    whiteTurn: boolean
    private activeField: Field | undefined
    private possibleMoves: Array<Field> = []
    private previousMoveFields: Array<Field> = []
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
    arrayOfMoves: Array<Move> = []
    lastMove: Move | undefined
    lastSpecialMove: MoveTypes | undefined
    historyOfMovesBackTo: Array<Move> = []

    constructor() {
        this.whiteTurn = true
        this.allFields = []
    }

    fieldClick(field: Field) {
        this.ifTrashActiveDeletePiece(field)
        this.isCheck()
        if (this.fieldHasPieceAndGameStarted(field) && this.isPlayerPiece(field.piece!)) {
            this.clearActiveField()
            this.setActiveFieldAndShowPossibleMoves(field)
        }

        if (field.state.correctMove) {
            this.makeMoveOrPromotePawn(field)
        }
    }

    setActiveFieldAndShowPossibleMoves(field: Field) {
        this.activeField = field
        this.activeField.setActive(true)
        this.setNewPossibleMoves(field)
    }

    clearActiveField() {
        if (this.activeField) {
            this.activeField.setActive(false)
        }
    }

    isPlayerPiece(piece: Piece) {
        return piece.color === this.getColor()
    }

    fieldHasPieceAndGameStarted(field: Field) {
        return field.piece! && this.isGameStarted
    }

    ifTrashActiveDeletePiece(field: Field) {
        return this.isTrashActive && field.piece!.canDelete() ?
            this.removePieceFromField(field) : ''
    }

    isPawnPromoted(field: Field) {
        return this.activeField?.piece?.isPawn() && (field.coordinate.y === 1 || field.coordinate.y === 8)
    }

    makeMoveOrPromotePawn(field: Field) {
        if (this.isPawnPromoted(field)) {
            this.displayPawnPromotion(this.activeField!, field)
        } else {
            this.createAndMakeMove(field)
        }
    }

    renderHistory(moveId: number) {
        this.backToActualPositionIfHistoryElementClicked()
        this.addHistoryOfMovesFromClickedElement(moveId)
        this.undoneMoveToClickedElement()
    }

    backToActualPositionIfHistoryElementClicked() {
        if (this.historyOfMovesBackTo) {
            this.historyOfMovesBackTo.reverse().forEach(move => {
                if (move.secondMove) {
                    this.makeMove(move.secondMove)
                }

                this.makeMove(move)
            })
        }
    }

    undoneMoveToClickedElement() {
        this.historyOfMovesBackTo.forEach(move => {
            if (move.secondMove) {
                this.undoMove(move.secondMove)
            }

            this.undoMove(move)
        })
    }

    addHistoryOfMovesFromClickedElement(moveId: number) {
        this.historyOfMovesBackTo = this.arrayOfMoves.filter(move => move.id! > moveId)
            .reverse()
    }

    checkMoveType(moveName: MoveTypes, fieldTo: Field) {
        switch (moveName) {
            case MoveTypes.SMALL_CASTLE:
                return this.getCastleRookMove(fieldTo, true)

            case MoveTypes.BIG_CASTLE:
                return this.getCastleRookMove(fieldTo, false)

            default:
                return undefined
        }
    }

    getCastleRookMove(king: Field, isSmallCastle: boolean) {
        const fieldsNumberOld = isSmallCastle ? 1 : -2
        const fieldsNumberNew = isSmallCastle ? -1 : 1
        const kingCoordinate = king.coordinate
        const moveType = isSmallCastle ? MoveTypes.SMALL_CASTLE : MoveTypes.BIG_CASTLE
        const oldRookField: Field = this.getFieldByXY(kingCoordinate.x + fieldsNumberOld, kingCoordinate.y)!
        const newRookField: Field = this.getFieldByXY(kingCoordinate.x + fieldsNumberNew, kingCoordinate.y)!

        return new Move(undefined, oldRookField, newRookField, '', moveType)
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

    displayPawnPromotion(field: Field, pawnPromotionField: Field) {
        this.promotePawnPanel?.setColorOfPieces(field.piece!.color, field.coordinate.x)
        this.promotedField = pawnPromotionField
        this.setPawnPromotionDisplayed(true)
    }

    setPawnPromotionDisplayed(displayed: boolean) {
        this.board?.setPawnPromotionDisplayed(displayed)
    }

    setPromotedFigureToField(piece: Piece) {
        const move = this.createMove(this.promotedField!, piece)
        this.addMoveToHistory(move)
        this.setLastMoveAndRemoveAdditionalField(move)
        this.addNamesOfMoveToHistoryComponent()
        this.promotedField?.setPiece(piece, false)
        this.disableHighlightLasMoveFields()
        this.changeTurn(this.promotedField!)
        this.highlightLasMoveFields()
        this.activeField?.removePiece()
    }

    changeTurn(field: Field) {
        this.possibleMoves.forEach(field => field.setPossibleMove(false))
        this.previousMoveFields = [field, this.activeField!]
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
                    [new Move(undefined, field, smallCastle!, '', MoveTypes.SMALL_CASTLE)]
                    : []

            case MoveTypes.BIG_CASTLE:
                const bigCastle = this.getFieldForCastle(field, false)

                return bigCastle ?
                    [new Move(undefined, field, bigCastle, '', MoveTypes.BIG_CASTLE)]
                    : []
            case MoveTypes.EN_PASSANT:
                const enPassant = this.isEnPassantPossible(field)

                return enPassant ? [new Move(undefined, field, enPassant!, '', MoveTypes.EN_PASSANT)]
                    : []

            case MoveTypes.MOVE_TWO:
                const moveTwo = this.isMoveTwoPossible(field)

                return moveTwo ? [new Move(undefined, field, moveTwo!, '', MoveTypes.MOVE_TWO)]
                    : []
            case MoveTypes.PAWN_CAPTURE:
                const pawnCapture = this.isPawnCapturePossible(field)

                return pawnCapture.map(move => [new Move(undefined, field, move, '', MoveTypes.PAWN_CAPTURE)])
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
        if (this.lastMove) {
            const figureColor = field.piece?.color
            const pawnTwoFieldsMove: boolean = this.lastMove.specialMove === MoveTypes.MOVE_TWO
            const lastMoveCoordinate = this.lastMove.fieldTo.coordinate
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

    makeMove(move: Move) {
        this.disableHighlightLasMoveFields()
        move.fieldTo.setPiece(move.fieldFrom.piece!, true)
        move.fieldFrom.removePiece()
        this.previousMoveFields = [move.fieldFrom, move.fieldTo]
        this.highlightLasMoveFields()
    }

    undoMove(move: Move) {
        this.disableHighlightLasMoveFields()
        move.fieldFrom.setPiece(move.fieldTo.piece!, true)
        move.fieldTo.removePiece()
        this.previousMoveFields = [move.fieldFrom, move.fieldTo]
        this.highlightLasMoveFields()
    }

    addMoveToHistory(move: Move) {
        this.arrayOfMoves = this.arrayOfMoves.concat(move)
        this.historyOfMoves?.setHistoryOfMoves(this.arrayOfMoves)
    }

    setLastMoveAndRemoveAdditionalField(move: Move) {
        this.lastMove = move
        this.lastSpecialMove = move.specialMove
        move.additionalField?.removePiece()
    }

    addNamesOfMoveToHistoryComponent() {
        this.historyOfMoves?.setHistoryOfMoves(this.arrayOfMoves)
    }

    makeAdditionalMove(move: Move) {
        this.activeField = move?.fieldFrom!
        this.disableHighlightLasMoveFields()
        this.previousMoveFields = [move?.fieldFrom, move?.fieldTo]
        this.createAndMakeMove(move?.fieldTo, true)
        move?.fieldFrom.setActive(true)
    }

    createAndMakeMove(field: Field, isAdditionalMove: boolean = false) {
        const move = this.createMove(field)

        this.makeMove(move)

        if (!isAdditionalMove) {
            this.addMoveToHistory(move)
            this.setLastMoveAndRemoveAdditionalField(move)
            this.addNamesOfMoveToHistoryComponent()
            this.changeTurn(field)

            if (this.lastMove?.secondMove) {
                this.makeAdditionalMove(this.lastMove?.secondMove)
            }
        }
    }

    createMove(field: Field, piece: Piece | undefined = undefined) {
        const specialMoveName = piece ? MoveTypes.PROM
            : this.arrayOfPossibleMoves.find(moves => moves.fieldTo === field)?.specialMove
        const fieldFrom = this.fieldFrom(field)
        const capturedField = specialMoveName === MoveTypes.EN_PASSANT ?
            this.getFieldByXY(field.coordinate.x, this.activeField!.coordinate.y)
            : undefined
        const id = this.arrayOfMoves.length
        return new Move(id, this.activeField!, field, fieldFrom, specialMoveName ? specialMoveName : MoveTypes.NORMAL, capturedField,
            piece, this.checkMoveType(specialMoveName!, field))
    }

    highlightLasMoveFields() {
        this.previousMoveFields.forEach(field => {
            field.setActive(true)
        })
    }

    disableHighlightLasMoveFields() {
        this.previousMoveFields.forEach(field => {
            field.setActive(false)
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
            .map(move => new Move(undefined, currentField, move, '', MoveTypes.NORMAL))
        // .filter(filterField => {
        //     (this.canSee(filterField, currentField) || currentField.piece!.canJump())
        //     // &&
        //     // this.isEmptyOrEnemy(field) && (this.isCheck() && this.canPreventCheck(field, piece.coordinate)) && this.dontCauseCheck()
        // })
    }

    dontCauseCheck(): boolean {
        return true
    }

    isCheck() {
        const kingPosition = this.allFields.find(field => field.piece! instanceof King && field.piece?.color !== this.getColor())!
        const allPossibleMovesOfEnemy = this.allFields!.map(field => {
            if (field.piece!) {
                return field.piece!.getAllPossibleDirectionsWithColor()
                    .map(direction => this.getAllPossibleMovesFromDirection(field, direction))
            }
                return []
        }).filter(field => field !== undefined).flat(2)

        if (allPossibleMovesOfEnemy.find(field => field === kingPosition)){
            console.log('king Attack!')
        }
        return false
    }

    getAllMovesOfPlayer() {
        return
    }

    canPreventCheck(field1: Field, field2: Field): boolean {
        return false
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