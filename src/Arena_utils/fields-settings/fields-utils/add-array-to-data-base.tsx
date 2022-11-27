import {setArrayToLocalStorage} from '../../data-base'
import {Piece} from '../../chess-possible-move'
import {addPiece} from '../../new-figure/add-figure'

export const addArrayToDataBase = (gameArrangement: Array<Piece>, currentFieldImg: any, nameOfFigure: string, currentColumnNumber: number, currentFieldNumber: number, colorOfFigure: string) => {
    const newFigure: Piece = addPiece(nameOfFigure,currentColumnNumber,currentFieldNumber,colorOfFigure,currentFieldImg.id)!

    gameArrangement = gameArrangement.concat(newFigure)
    setArrayToLocalStorage(gameArrangement)
}