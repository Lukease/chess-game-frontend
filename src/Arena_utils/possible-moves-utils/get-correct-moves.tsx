export const getCorrectMoves = (arrayOfAllCorrectIds: Array<string>, color: string) => {
    const getMoves: Array<string> = arrayOfAllCorrectIds.map(fieldId => {
        const allField: HTMLElement = document.getElementById(fieldId)!

        if (!allField.className.includes(`figure__${color}`)){

            return fieldId
        }
            return ''
    })

    return getMoves.filter(id => id !== '')
}