import React, {useEffect, useState} from 'react'
import {addPieceArrangement} from '../../chess_arrangement'
import {Piece} from '../../game/pieces'
import {TAddPiecePanel} from '../board/types/TAddPiecePanel'

function AddPiecePanel({piecesArray, gameService,movingService,panelColor}: TAddPiecePanel) {
    const [pieces, setPieces] = useState<Array<Piece>>(piecesArray)
    const [newPiece, setNewPiece] = useState<Array<Piece>>([])
    const [color, setColor] = useState<string>(panelColor)
    const [isTrashActive, setTrashActive] = useState<boolean>(false)
    const [isPositionEditorDisplayed, setPositionEditorDisplayed] = useState<boolean>(false)
    const [isMoving, setMoving] = useState<boolean>(false)
    const [coordinateX, setCoordinateX] = useState<number>(0)
    const [coordinateY, setCoordinateY] = useState<number>(0)

    useEffect(() => {
        setNewPiece(addPieceArrangement(panelColor))
    }, [])


    const isDeleteIconActive = (isFromOtherService: boolean) => {
        const isActive: boolean = isTrashActive

        setTrashActive(!isActive)

        if (!isFromOtherService) {
            gameService.setTrashActive(!isActive)
        }
    }

    const getPositionEditorDisplayed = () => {
        const isDisplayed: boolean = gameService.isPositionEditorDisplayed

        setPositionEditorDisplayed(isDisplayed)

        return isDisplayed
    }

    const selectPiece = (piece: Piece, event: any) => {
        const coordinateX = event.clientX
        const coordinateY = event.clientY
        setMoving(true)
        setCoordinate(event)

        document.body.style.cursor = 'none'
        movingService.movePiece(piece, coordinateX, coordinateY, '', false)
    }

    const setCoordinate = (event: any) => {
        setCoordinateX(event.screenX - 50)
        setCoordinateY(event.screenY - 30)
    }

    const removePiece = () => {
        setMoving(false)
    }

    const renderPieces = () => {
        return newPiece.map((piece, index) => {

            return (
                <div
                    className={'field'}
                    key={index}
                >
                    <img
                        className={'figure'}
                        src={piece.getImageUrl()}
                        key={index}
                        alt={''}

                        onMouseDown={event => isTrashActive ? '' : selectPiece(piece, event)}
                    >
                    </img>
                </div>
            )
        })
    }

    return (
        <div
            className={'panel'}
            style={{display: getPositionEditorDisplayed() ? `flex` : `none`}}
            onChange={() => getPositionEditorDisplayed()}
        >
            <div className={'field'}
            ></div>
            <div className={'panel__add'}>
                {
                    renderPieces()
                }
                <div
                    className={'content__trash'}
                    style={{backgroundColor: isTrashActive ? `firebrick` : ``}}
                    onClick={() => isDeleteIconActive(false)}
                    id={'trashIcon'}
                >
                </div>
            </div>
            <div className={'field'}
            ></div>
        </div>
    )
}

export default AddPiecePanel