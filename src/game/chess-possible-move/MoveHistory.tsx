import {Move} from './move'

export class MoveHistory extends Move {
    currentName: string
    currentId: string
    nameBefore: string
    idBefore: string
    idInArray: number
    isCheck: boolean
    specialMove: string

    constructor(currentName: string, currentId: string, nameBefore: string, idBefore: string, idInArray: number, isCheck: boolean, specialMove: string) {
        super(isCheck,currentId)
        this.currentName = currentName
        this.currentId = currentId
        this.nameBefore = nameBefore
        this.idBefore = idBefore
        this.idInArray = idInArray
        this.isCheck = isCheck
        this.specialMove = specialMove
    }
}