import { LastMove } from '../../../types'

export const iconType = (move: LastMove) => {
    let figureTypeIcon: string = '♙'

    if (move.currentName.includes('Knight')){
        figureTypeIcon = '♘'
    }

    if (move.currentName.includes('Queen')){
        figureTypeIcon = '♕'
    }

    if (move.currentName.includes('Rook')){
        figureTypeIcon = '♖'
    }

    if (move.currentName.includes('Bishop')){
        figureTypeIcon = '♗'
    }

    if (move.currentName.includes('King')){
        figureTypeIcon = '♔'
    }

    return figureTypeIcon
}