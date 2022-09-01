
export const removePossibleMoves = (arrayOfCorrectIds: Array<string>) => {
    arrayOfCorrectIds.forEach(fieldId => {
        const field = document.querySelector(`#${fieldId}`)!

        field.classList.remove('figure__move-empty')
        field.classList.remove('figure__move-figure')

    })
}