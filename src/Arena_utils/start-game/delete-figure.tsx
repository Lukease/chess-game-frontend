import React from 'react'

export class DeleteFigure extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {isTrashClicked: false}
        this.deleteIcon = this.deleteIcon.bind(this)
    }

    deleteIcon() {
        this.setState((prevState: { isTrashClicked: boolean }) => ({
            isTrashClicked: !prevState.isTrashClicked
        }))

        let trashClicked = document.querySelectorAll('.navigation__trash')
        trashClicked.forEach(trash => {
            if (!this.state.isTrashClicked){
                trash.classList.add('navigation__trash--chosen')
            } else if(this.state.isTrashClicked){
                trash.classList.remove('navigation__trash--chosen')
            }
        })
    }

    render() {
    return(
        <button
            className={'navigation__trash'}
            onClick={this.deleteIcon}
            id={'trashIcon'}
        >
        </button>
    )
    }
}