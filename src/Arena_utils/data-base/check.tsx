export const setCheckToLocalStorage = (check: boolean) => {
    localStorage.setItem('check', JSON.stringify(check))
}

export const getCheckFromLocalStorage = () => {

    return JSON.parse(localStorage.getItem('check')!)
}