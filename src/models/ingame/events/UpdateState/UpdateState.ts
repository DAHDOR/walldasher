import { USGame } from './USGame'

export interface UpdateState {
  event: string
  game: USGame
  hasGame: boolean
  match_guid?: string
  players: object
}
