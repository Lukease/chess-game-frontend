import {Field} from '../fields-settings'

export class GameService {
    whoseTour: string
    private activeField: Field | undefined
    allFields: Array<Field> = []

    constructor(whoseTour: string) {
        this.whoseTour = whoseTour
        this.allFields = []
    }

    fieldClick(field: Field) {
        if (field.piece) {
            if (field.piece.color === this.whoseTour) {
                if (this.activeField) {
                    this.activeField.setChosen(false)
                }

                this.activeField = field
                this.activeField.setChosen(true)
            }
        }
    }

    addField(field: Field) {
        this.allFields = this.allFields.concat(field)
    }
}