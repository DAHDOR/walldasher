import { Game } from '@models/db'

interface MatchState {
  bo: number
  isRunning: boolean
  game: number
  blueWins: number
  orangeWins: number
  games: Game[]
}

export default MatchState

export function isMatchState(obj: unknown): obj is MatchState {
  const record = obj as Record<string, unknown>
  return (
    record &&
    typeof record.bo === 'number' &&
    typeof record.isRunning === 'boolean' &&
    typeof record.game === 'number' &&
    typeof record.blueWins === 'number' &&
    typeof record.orangeWins === 'number'
  )
}
