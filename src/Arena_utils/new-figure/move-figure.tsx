let nameOfFigure: string
let isMoving = false
let figure: any

export const getFigure = (event: any) => {
    const [figureClass,] = event.target.classList

    if (figureClass === 'figure') {
        nameOfFigure = event.target.classList.value

        isMoving = true
        const secondClass: string = nameOfFigure.split(' ')[1]

        figure = document.createElement('div')
        figure.classList.add('figure__move', secondClass)
        event.target.appendChild(figure)
        figure.style.display = 'none'
    }
}

export const mouseMoveFigure = (event: any) => {
    if (isMoving) {
        let x: number = event.clientX - 90
        let y: number = event.clientY - 60

        figure.style.display = 'block'
        figure.style.position = 'absolute'
        figure.style.left = `${x}px`
        figure.style.top = `${y}px`
    }
}

export const addNewFigure = (event: any) => {
    isMoving = false

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
