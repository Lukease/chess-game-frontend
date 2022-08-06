import {Figure} from "../types/figure";
import blackRook from "../chess_icon/black-rook.svg";
import blackPawn from "../chess_icon/black-pawn.svg";
import whitePawn from "../chess_icon/white-pawn.svg";
import whiteRook from "../chess_icon/white-rook.svg";
import whiteKnight from "../chess_icon/white-knight.svg";
import blackKnight from "../chess_icon/black-knight.svg";
import whiteBishop from "../chess_icon/white-bishop.svg";
import blackBishop from "../chess_icon/black-bishop.svg";
import blackQueen from "../chess_icon/black-queen.svg";
import whiteQueen from "../chess_icon/white-queen.svg";
import whiteKing from "../chess_icon/white-King.svg";
import blackKing from "../chess_icon/black-king.svg";

export const defaultChessArrangement: Array<Figure> = [
    {name: whiteRook, id: [1,1], color: 'white'},
    {name: whitePawn, id: [1,2], color: 'white'},
    {name: blackPawn, id: [1,7], color: 'black'},
    {name: blackRook, id: [1,8], color: 'black'},
    {name: whiteKnight, id: [2,1], color: 'white'},
    {name: whitePawn, id: [2,2], color: 'white'},
    {name: blackPawn, id: [2,7], color: 'black'},
    {name: blackKnight, id: [2,8], color: 'black'},
    {name: whiteBishop, id: [3,1], color: 'white'},
    {name: whitePawn, id: [3,2], color: 'white'},
    {name: blackPawn, id: [3,7], color: 'black'},
    {name: blackBishop, id: [3,8], color: 'black'},
    {name: whiteKing, id: [4,1], color: 'white'},
    {name: whitePawn, id: [4,2], color: 'white'},
    {name: blackPawn, id: [4,7], color: 'black'},
    {name: blackQueen, id: [4,8], color: 'black'},
    {name: whiteQueen, id: [5,1], color: 'white'},
    {name: whitePawn, id: [5,2], color: 'white'},
    {name: blackPawn, id: [5,7], color: 'black'},
    {name: blackKing, id: [5,8], color: 'black'},
    {name: whiteBishop, id: [6,1], color: 'white'},
    {name: whitePawn, id: [6,2], color: 'white'},
    {name: blackPawn, id: [6,7], color: 'black'},
    {name: blackBishop, id: [6,8], color: 'black'},
    {name: whiteKnight, id: [7,1], color: 'white'},
    {name: whitePawn, id: [7,2], color: 'white'},
    {name: blackPawn, id: [7,7], color: 'black'},
    {name: blackKnight, id: [7,8], color: 'black'},
    {name: whiteRook, id: [8,1], color: 'white'},
    {name: whitePawn, id: [8,2], color: 'white'},
    {name: blackPawn, id: [8,7], color: 'black'},
    {name: blackRook, id: [8,8], color: 'black'},
]

