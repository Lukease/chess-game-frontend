export const showPossibleMoves = (coordinate: Array<string>) => {
    coordinate.forEach(fieldId => {
        const field = document.querySelector(`#${fieldId}`)!

        if (field.className === 'figure figure__empty') {
            field.classList.add('figure__move-empty')
        } else {
            field.classList.add('figure__move-figure')
        }
    })
}