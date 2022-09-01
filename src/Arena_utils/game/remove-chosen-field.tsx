export const removeChosenField = (arrayOfSelectedFigures: any, event: any) => {
    if (arrayOfSelectedFigures.length > 3) {
        const [parentOfFirstFigure, parentOfSecondFigure, ...restFigure] = arrayOfSelectedFigures

        parentOfFirstFigure.classList.remove('field__chosen')
        parentOfSecondFigure.classList.remove('field__chosen')
        event.currentTarget.classList.add('field__chosen')
        arrayOfSelectedFigures = Array(...restFigure)
    }

    return arrayOfSelectedFigures
}