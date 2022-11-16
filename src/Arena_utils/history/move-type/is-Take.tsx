import {LastMove} from '../../../types'

export const isTake = (move: LastMove) => {
    let take: string = ''

    if (move.nameBefore !== 'empty') {
        take = `x${move.idBefore}`
    }

    return take
}