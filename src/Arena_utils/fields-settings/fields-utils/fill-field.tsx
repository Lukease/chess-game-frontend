import {Piece} from '../../chess-possible-move'

export const fillField = (chessArray: Array<Piece>, fieldId: string) => {
    const figure: Array<string> = chessArray.map((piece) => {
        const column: number = (fieldId.charAt(0)).charCodeAt(0) - 64
        const number: number = parseInt(fieldId.charAt(1))
        const [figureColumn, figureField] = piece.position

        if (column === figureColumn && number === figureField) {

            return `figure__${piece.color}-${piece.name}`
        } else {
            return 'figure__empty'
        }
    })

    const figureName = figure.find(name => name !== 'figure__empty')

    return (figureName ? figureName : 'figure__empty')
}