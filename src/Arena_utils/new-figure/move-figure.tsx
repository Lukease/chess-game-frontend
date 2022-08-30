let nameOfFigure: string
let isMoving = false
let figure: any

export const getFigure = (event: any) => {
    const [figureClass,] = event.target.classList
    const color = document.querySelector('.game__color')!.innerHTML
    const trashIconChosen = document.querySelector('.navigation__trash')!

    if (figureClass === 'figure' && color === 'black/white'&& !trashIconChosen.classList.contains('field__chosen')) {
        nameOfFigure = event.target.classList.value
        isMoving = true

        const secondClass: string = nameOfFigure.split(' ')[1]

        figure = document.createElement('div')
        figure.classList.add('figure__move', secondClass)
        document.body.style.cursor = 'none'

        if (event.target.parentNode.classList.contains('game__add-figure')) {
            event.target.appendChild(figure)
        } else {
            event.target.parentNode.appendChild(figure)
            event.target.className = ''
            event.target.classList.add('figure')
            event.target.classList.add('figure__empty')
        }
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
    const trashIconChosen = document.querySelector('.navigation__trash')!

    document.body.style.cursor = 'auto'
    if (color === 'black/white' && !trashIconChosen.classList.contains('field__chosen')) {
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
}