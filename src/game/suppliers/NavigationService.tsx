
export class NavigationService {

    setBackgroundColor(color: string) {
        this.arena?.setBackgroundColor(color)
    }

    toggleSide(vector: number) {
        this.board?.setVectorDirection(vector)
    }
}