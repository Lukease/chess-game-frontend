export const hideShowFigures = (event: any) => {
    if (event.target.classList.contains('game__navigation--editor')) {
        let addColumn = document.querySelectorAll('.game__add-figure')
        let trashClicked = document.querySelectorAll('.navigation__trash')

        trashClicked.forEach(trash => {
            trash.classList.remove('navigation__trash--chosen')
        })

        addColumn.forEach(column => {

            if (!column.classList.contains('game__add-figure--hidden')) {
                column.classList.add('game__add-figure--hidden')

            } else {
                column.classList.remove('game__add-figure--hidden')

            }
        })
    }
}