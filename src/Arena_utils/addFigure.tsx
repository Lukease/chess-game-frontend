
export const AddWhite = (event: any) => {
    return (
        <div className={'game__add-figure'}>
            <div className={'figure figure__white-Queen'}></div>
            <div className={'figure figure__white-King'}></div>
            <div className={'figure figure__white-Bishop'}></div>
            <div className={'figure figure__white-Knight'}></div>
            <div className={'figure figure__white-Rook'}></div>
            <div className={'figure figure__white-Pawn'}></div>
        </div>
    )
}

export function AddBlack(props: any) {

    return (
        <div className={'game__add-figure'}>
            <div className={'figure figure__black-Queen'}></div>
            <div className={'figure figure__black-King'}></div>
            <div className={'figure figure__black-Bishop'}></div>
            <div className={'figure figure__black-Knight'}></div>
            <div className={'figure figure__black-Rook'}></div>
            <div className={'figure figure__black-Pawn'}></div>
        </div>

    )
}

export function toggleClass() {

}