import React, {useState} from 'react'
import '../../Arena.css'
import {defaultChessArrangement} from '../../chess_arrangement'
import {AddPiecePanel} from '../new-figure'
import {PromotePawnPanel} from '../new-figure'
import {HistoryOfMoves} from '../history'
import {King, Piece} from '../../game/pieces'
import {GameService, HistoryService, MovingService, NavigationService} from '../../game/suppliers'
import {GameServiceContext, HistoryServiceContext} from '../context/Context'
import Board from './Board'
import GameNavigation from '../start-game/GameNavigation'

export function Arena() {
    const movingService = new MovingService()
    const navigationService = new NavigationService()
    const historyService = new HistoryService()
    const gameService = new GameService()

    const [pieces, setPieces] = useState<Array<Piece>>(defaultChessArrangement)
    const [kings, setKings] = useState<Array<Piece>>(pieces.filter(piece => piece instanceof King))
    const [isMovingPiece, setMovingPiece] = useState<boolean>(false)
    const [selectedPiece, setSelectedPiece] = useState<Piece | undefined>(undefined)
    const [coordinateX, setCoordinateX] = useState<number>(0)
    const [coordinateY, setCoordinateY] = useState<number>(0)
    const [movingId, setMovingId] = useState<string>('')
    const [newPieceId, setNewPieceId] = useState<string>('')
    const [backgroundColor, setBackgroundColor] = useState<string>('black')

    const setInterfaceColor = (color: string) => {
        setBackgroundColor(color)
    }

    const setPieceIsMoved = (isMoving: boolean, piece: Piece, x: number, y: number, id: string) => {
        setMovingPiece(isMoving)
        setSelectedPiece(piece)
        setMovingId(id ? id : '')
        setCoordinateX(x - 30)
        setCoordinateY(y - 30)
    }

    const editorMouseMoveFigure = (event: any) => {
        if (isMovingPiece) {
            const x: number = event.clientX - 30
            const y: number = event.clientY - 30

            setCoordinateX(x)
            setCoordinateY(y)
        }
    }

    const addNewPieceToField = () => {
        if (isMovingPiece) {
            setMovingPiece(false)
            document.body.style.cursor = 'auto'

            const mouseUpTarget = document.elementsFromPoint(coordinateX, coordinateY)

            mouseUpTarget.forEach(element => {
                if (element.id !== '' && element.id !== 'root') {
                    setNewPieceId(element.id)
                }
            })
            movingService.setCurrentPiecePosition(newPieceId!, selectedPiece!, movingId)
        }
    }

    return (
        <div className={'content'}
             onMouseMove={(e) => editorMouseMoveFigure(e)}
             onMouseUp={() => addNewPieceToField()}
             style={{backgroundImage: `linear-gradient(#413f3f, ${backgroundColor})`}}
        >
            {
                isMovingPiece ?
                    <img
                        className={'figure'}
                        style={
                            {
                                left: isMovingPiece ? `${coordinateX}px` : '',
                                top: isMovingPiece ? `${coordinateY}px` : '',
                                position: 'absolute',
                                display: isMovingPiece ? 'flex' : 'none'
                            }
                        }
                        src={selectedPiece!.getImageUrl()}
                        alt={''}
                        draggable={false}
                    >

                    </img> :
                    <div
                        style={{position: 'absolute'}}
                    >
                    </div>
            }
            <GameNavigation
                gameService={gameService}
                movingService={movingService}
                navigationService={navigationService}
                kings={kings}
            />
            <HistoryServiceContext.Provider value={historyService}>
                <HistoryOfMoves/>
            </HistoryServiceContext.Provider>
            <div className={'game__arena'}>
                <AddPiecePanel
                    panelColor={'black'}
                    piecesArray={pieces}
                    gameService={gameService}
                    movingService={movingService}
                />
                <Board
                    gameService={gameService}
                    movingService={movingService}
                    navigationService={navigationService}
                    pieces={pieces}
                    historyService={historyService}
                />
                <AddPiecePanel
                    panelColor={'white'}
                    piecesArray={pieces}
                    gameService={gameService}
                    movingService={movingService}
                />
                <GameServiceContext.Provider value={gameService}>
                    <PromotePawnPanel/>
                </GameServiceContext.Provider>
            </div>
        </div>
    )
}

// export default Arena