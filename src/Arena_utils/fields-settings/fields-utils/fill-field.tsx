import {Figure} from '../../../types'

export const fillField = (chessArray: Array<Figure>, fieldId: string) => {
    const figure: Array<string> = chessArray.map((figure) => {
        const column: number = (fieldId.charAt(0)).charCodeAt(0) - 64
        const number: number = parseInt(fieldId.charAt(1))
        const [figureColumn, figureField] = figure.position

        if (column === figureColumn && number === figureField) {

            return `figure__${figure.name}`
        } else {
            return 'figure__empty'
        }
    })

    const figureName = figure.find(name => name !== 'figure__empty')

    return (figureName ? figureName : 'figure__empty')
}