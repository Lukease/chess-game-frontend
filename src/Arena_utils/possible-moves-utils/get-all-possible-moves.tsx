export const getAllPossibleMoves = (arrayOfMoves: Array<Array<number>>, columnNumber: number, fieldNumber: number) => {
    const possibleMoves: Array<string> = arrayOfMoves.map(move => {
        const [coordinateOne, coordinateTwo] = move
        const possibleMoveColumn: number = columnNumber + coordinateOne
        const possibleMoveField: number = fieldNumber + coordinateTwo

        if (possibleMoveColumn > 0 && possibleMoveColumn < 9 && possibleMoveField > 0 && possibleMoveField < 9) {
            return String(String.fromCharCode(64 + possibleMoveColumn) + possibleMoveField)
        }
            return ''
    })

    return  possibleMoves.filter(coordinate => coordinate !== '')
}