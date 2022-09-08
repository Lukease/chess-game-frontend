import {setCurrentColorToLocalStorage} from '../data-base'

export const blackWhiteChangeTurn = () => {
    let whoseTour = document.querySelector('.game__color')!

    if (whoseTour.innerHTML === 'white') {
        whoseTour.innerHTML = 'black'
        setCurrentColorToLocalStorage('black')

    } else if (whoseTour.innerHTML === 'black') {
        whoseTour.innerHTML = 'white'
        setCurrentColorToLocalStorage('white')
    }
}