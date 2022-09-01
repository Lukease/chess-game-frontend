export const blackWhiteChangeTurn = () => {
    let whoseTour = document.querySelector('.game__color')!

    if (whoseTour.innerHTML === 'white') {
        whoseTour.innerHTML = 'black'

    } else if (whoseTour.innerHTML === 'black') {
        whoseTour.innerHTML = 'white'
    }
}