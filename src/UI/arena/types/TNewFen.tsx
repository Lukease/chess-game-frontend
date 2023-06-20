import { PositionEditorInfo } from '../../../backend-service-connector/model/rest/game/PositionEditorInfo'
import { PositionEditorService } from '../../../backend-service-connector/service'

export type TNewFen = {
  positionEditorService: PositionEditorService
  handleNewPieces: (newFenInfo: PositionEditorInfo) => void
}
