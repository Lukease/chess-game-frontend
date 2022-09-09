import {LastMove} from '../../types'

export const setHistoryOfMovesToLocalStorage = (chess: Array<LastMove>) => {
    localStorage.setItem('history', JSON.stringify(chess))
}

export const getHistoryFromLocalStorage = () => {

    return JSON.parse(localStorage.getItem('history')!)
}