export class MoveType {
    name: string
    specialName: boolean

    constructor(name: string, specialName: boolean) {
        this.name = name
        this.specialName = specialName
    }
}

export class MoveTypes {
    static EN_PASSANT = new MoveType('e.P.',false)
    static SMALL_CASTLE = new MoveType('O-O',true)
    static BIG_CASTLE = new MoveType('O-O-O',true)
    static MOVE_TWO = new MoveType('',false)
    static PROM = new MoveType('=',false)
    static PAWN_CAPTURE = new MoveType('',false)
    static NORMAL = new MoveType('',false)
}