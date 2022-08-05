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
    {name: whiteRook, id: 'A1', color: 'white'},
    {name: whitePawn, id: 'A2', color: 'white'},
    {name: blackPawn, id: 'A7', color: 'black'},
    {name: blackRook, id: 'A8', color: 'black'},
    {name: whiteKnight, id: 'B1', color: 'white'},
    {name: whitePawn, id: 'B2', color: 'white'},
    {name: blackPawn, id: 'B7', color: 'black'},
    {name: blackKnight, id: 'B8', color: 'black'},
    {name: whiteBishop, id: 'C1', color: 'white'},
    {name: whitePawn, id: 'C2', color: 'white'},
    {name: blackPawn, id: 'C7', color: 'black'},
    {name: blackBishop, id: 'C8', color: 'black'},
    {name: whiteKing, id: 'D1', color: 'white'},
    {name: whitePawn, id: 'D2', color: 'white'},
    {name: blackPawn, id: 'D7', color: 'black'},
    {name: blackQueen, id: 'D8', color: 'black'},
    {name: whiteQueen, id: 'E1', color: 'white'},
    {name: whitePawn, id: 'E2', color: 'white'},
    {name: blackPawn, id: 'E7', color: 'black'},
    {name: blackKing, id: 'E8', color: 'black'},
    {name: whiteBishop, id: 'F1', color: 'white'},
    {name: whitePawn, id: 'F2', color: 'white'},
    {name: blackPawn, id: 'F7', color: 'black'},
    {name: blackBishop, id: 'F8', color: 'black'},
    {name: whiteKnight, id: 'G1', color: 'white'},
    {name: whitePawn, id: 'G2', color: 'white'},
    {name: blackPawn, id: 'G7', color: 'black'},
    {name: blackKnight, id: 'G8', color: 'black'},
    {name: whiteRook, id: 'H1', color: 'white'},
    {name: whitePawn, id: 'H2', color: 'white'},
    {name: blackPawn, id: 'H7', color: 'black'},
    {name: blackRook, id: 'H8', color: 'black'},
]

