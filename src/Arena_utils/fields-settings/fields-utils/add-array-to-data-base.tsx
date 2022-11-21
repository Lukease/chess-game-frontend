import {setArrayToLocalStorage} from '../../data-base'
import {Figure} from '../../../types'

export const addArrayToDataBase = (gameArrangement: Array<Figure>,currentFieldImg: any,nameOfFigure:string,currentColumnNumber: number,currentFieldNumber: number, colorOfFigure: string) => {
    gameArrangement = gameArrangement.concat({
        id: currentFieldImg.id,
        name: nameOfFigure,
        position: [currentColumnNumber, currentFieldNumber],
        color: colorOfFigure
    })

    setArrayToLocalStorage(gameArrangement)

}