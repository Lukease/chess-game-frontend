import { Piece } from '../../../../game/pieces'

export type PositionEditorInfo = {
  pieces: Array<Piece>
  kingIsChecked: Array<string>
}