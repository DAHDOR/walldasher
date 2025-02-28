import { isUSPlayer, USPlayer } from './events/UpdateState/USPlayer'
import { USTeam } from './events/UpdateState/USTeam'

interface Score {
  blue: number
  orange: number
}

function isScore(obj: unknown): obj is Score {
  const record = obj as Record<string, unknown>
  return record && typeof record.blue === 'number' && typeof record.orange === 'number'
}

interface GameState {
  arena: string
  isOT: boolean
  isReplay: boolean
  target: string
  timeRemaining: number
  winner: string
  players: USPlayer[]
  teams: USTeam[]
  score: {
    blue: number
    orange: number
  }
}

export default GameState

export function isGameState(obj: unknown): obj is GameState {
  const record = obj as Record<string, unknown>
  return (
    record &&
    typeof record.arena === 'string' &&
    typeof record.isOT === 'boolean' &&
    typeof record.isReplay === 'boolean' &&
    typeof record.target === 'string' &&
    typeof record.timeRemaining === 'number' &&
    typeof record.winner === 'string' &&
    Array.isArray(record.players) &&
    record.players.every(value => isUSPlayer(value)) &&
    isScore(record.score)
  )
}

export const DEFAULT_GAME_STATE: GameState = {
  arena: '',
  isOT: false,
  isReplay: false,
  target: '',
  timeRemaining: 300,
  winner: '',
  players: [],
  teams: [],
  score: {
    blue: 0,
    orange: 0
  }
}
