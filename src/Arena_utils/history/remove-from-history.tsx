import {addMoveToHistory} from './add-to-history'
import {LastMove} from '../../types'
import {getHistoryFromLocalStorage, setHistoryOfMovesToLocalStorage} from '../data-base'

export const removeKingAndAddCastleToHistory = (figureName: string, nameBefore: string, id: string, currentId: string) => {
    let localStorageHistory: Array<LastMove> = getHistoryFromLocalStorage()
    const kingInHistory: LastMove = localStorageHistory.find(history => history.currentName === `${nameBefore}-King`)!

    localStorageHistory = localStorageHistory.filter(move => move !== kingInHistory )
    setHistoryOfMovesToLocalStorage(localStorageHistory)
    addMoveToHistory(figureName, nameBefore, id, currentId)
}