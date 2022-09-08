export const removeChosenField = (arrayOfSelectedFigures: any, event: any) => {
    const [parentOfFirstFigure, parentOfSecondFigure, ...restFigure] = arrayOfSelectedFigures

    if (arrayOfSelectedFigures.length > 3) {
        parentOfFirstFigure.classList.remove('field__chosen')
        parentOfSecondFigure.classList.remove('field__chosen')
        event.currentTarget.classList.add('field__chosen')
        arrayOfSelectedFigures = Array(...restFigure)
    }

    if (arrayOfSelectedFigures.length === 1) {
        parentOfFirstFigure.classList.remove('field__chosen')
        arrayOfSelectedFigures = []
    }

    if (arrayOfSelectedFigures.length === 3){
        const [parentOfFirstFigure, parentOfSecondFigure, parentOfThirdFigure] = arrayOfSelectedFigures

        parentOfThirdFigure.classList.remove('field__chosen')
        arrayOfSelectedFigures = [parentOfFirstFigure,parentOfSecondFigure]
    }

    return arrayOfSelectedFigures
}