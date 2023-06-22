import { Config } from '../config'
import { NewPosition } from '../model/rest/game/NewPosition'
import { FetchData } from './FetchData'
import { PositionEditorInfo } from '../model/rest/game/PositionEditorInfo'

export class PositionEditorService {
  fetchData: FetchData

  constructor() {
    this.fetchData = new FetchData()
  }

  async getCurrentPositionEditorPieces(): Promise<PositionEditorInfo> {
    const url = Config.basePositionEditorUrl + Config.getCurrentPositionEditorPieces
    return await this.fetchData.requestAPI(url, 'GET')
  }

  async getDefaultPositionEditorPieces() {
    const url = Config.basePositionEditorUrl + Config.getDefaultPositionEditorPieces
    return await this.fetchData.requestAPI(url, 'GET')
  }

  async removePieceFromPositionEditor(removedPieceId: string) {
    const url = Config.basePositionEditorUrl + Config.removePieceFromPositionEditor + `?pieceId=${removedPieceId}`
    return await this.fetchData.requestAPI(url, 'PUT')
  }

  async ChangePositionOfPieceFromPositionEditor(newPosition: NewPosition) {
    const url = Config.basePositionEditorUrl + Config.changePositionOfPiece
    return await this.fetchData.requestAPI(url, 'PUT', newPosition)
  }

  async setOwnFenInPositionEditor(fen: string) {
    const url = Config.basePositionEditorUrl + Config.setOwnFen
    return await this.fetchData.requestAPI(url, 'PUT', { fen })
  }
}