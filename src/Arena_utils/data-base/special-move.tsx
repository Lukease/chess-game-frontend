export const setSpecialMoveToLocalStorage = (specialMove: string) => {
    localStorage.setItem('specialMove', JSON.stringify(specialMove))
}

export const getSpecialMoveFromLocalStorage = () => {

    return JSON.parse(localStorage.getItem('specialMove')!)
}