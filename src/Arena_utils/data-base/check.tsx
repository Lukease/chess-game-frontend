import {IsCheck} from '../../types'

export const setCheckToLocalStorage = (check: IsCheck) => {
    localStorage.setItem('check', JSON.stringify(check))
}

export const getCheckFromLocalStorage = () => {

    return JSON.parse(localStorage.getItem('check')!)
}