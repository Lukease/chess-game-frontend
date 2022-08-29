let nameOfFigure: string
let isMoving = false
let figure: any
let selectedFigure: any

export const getFigure = (event: any) => {
    const [figureClass,] = event.target.classList
    const color = document.querySelector('.game__color')!.innerHTML

    if (figureClass === 'figure' && color === 'black/white') {
        nameOfFigure = event.target.classList.value
        selectedFigure = event.target
        isMoving = true

        const secondClass: string = nameOfFigure.split(' ')[1]

        figure = document.createElement('div')
        figure.classList.add('figure__move', secondClass)
        event.target.appendChild(figure)
console.log(figure)
console.log(event.target)
        document.body.style.cursor = 'none'
    }
}

export const mouseMoveFigure = (event: any) => {
    if (isMoving) {
        let x: number = event.clientX - 50
        let y: number = event.clientY - 30

        figure.style.display = 'block'
        figure.style.position = 'absolute'
        figure.style.left = `${x}px`
        figure.style.top = `${y}px`
    }
}

export const addNewFigure = (event: any) => {
    const color = document.querySelector('.game__color')!.innerHTML

    document.body.style.cursor = 'auto'
    if (color === 'black/white') {
        isMoving = false

        if (!selectedFigure.parentNode.classList.contains('game__add-figure') && event.target.classList.contains('figure__empty')) {
            selectedFigure.className = ''
            selectedFigure.classList.add('figure')
            selectedFigure.classList.add('figure__empty')
        }

        if (nameOfFigure) {
            const secondClass: string = nameOfFigure.split(' ')[1]
            let x: number = event.clientX
            let y: number = event.clientY
            const mouseUpTarget = document.elementsFromPoint(x, y)

            figure.remove()
            mouseUpTarget.forEach(element => {

                if (element.id !== '' && element.id !== 'root') {
                    element.classList.add(secondClass)
                    element.classList.remove('figure__empty')
                }
            })
        }
    }
}
