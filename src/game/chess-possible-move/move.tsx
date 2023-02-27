export class Move{
    isCheck: boolean
    currentId: string

    constructor(isCheck: boolean, currentId: string) {
        this.isCheck = isCheck;
        this.currentId = currentId;
    }
}