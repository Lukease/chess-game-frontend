import {GameNavigation} from '../../UI/start-game'
import {Arena} from '../../UI'
import {Board} from '../../UI/board'

export class NavigationService {
    gameNavigation: GameNavigation | undefined
    arena: Arena | undefined
    board: Board | undefined

    setBackgroundColor(color: string) {
        this.arena?.setBackgroundColor(color)
    }

    toggleSide(vector: number) {
        this.board?.setVectorDirection(vector)
    }

}