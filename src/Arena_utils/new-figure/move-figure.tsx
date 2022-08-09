let nameOfFigure: string
let isMoving = false
let figure: any

export const getFigure = (event: any) => {
    const [figureClass,] =  event.target.classList

    if (figureClass === 'figure') {
        nameOfFigure = event.target.classList.value

        isMoving = true
        const firstClass: string = nameOfFigure.split(' ')[0]
        const secondClass: string = nameOfFigure.split(' ')[1]

        figure = document.createElement('div')
        figure.classList.add(firstClass, secondClass)
        event.target.appendChild(figure)
    }
}

export const mouseMoveFigure = (event: any) => {
    if (isMoving) {
        let x: number = event.clientX - 30
        let y: number = event.clientY - 40

        figure.style.position = 'absolute'
        figure.style.left = `${x}px`
        figure.style.top = `${y}px`
    }
}

export const addNewFigure = (event: any) => {
    isMoving = false

    const firstClass: string = nameOfFigure.split(' ')[0]
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
