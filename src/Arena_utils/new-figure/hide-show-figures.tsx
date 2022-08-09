export const hideShowFigures = (event: any) => {
    if (event.target.classList.contains('game__add')) {
        let addColumn = document.querySelectorAll('.game__add-figure')

        addColumn.forEach(column => {

            if (!column.classList.contains('game__add-figure--hidden')) {
                column.classList.add('game__add-figure--hidden')
            } else {
                column.classList.remove('game__add-figure--hidden')
            }
        })
    }
}