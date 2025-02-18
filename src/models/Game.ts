import { isUSPlayer, USPlayer } from './game/UpdateState/USPlayer'

interface Score {
  blue: number
  orange: number
}

function isScore(obj: unknown): obj is Score {
  const record = obj as Record<string, unknown>
  return record && typeof record.blue === 'number' && typeof record.orange === 'number'
}

interface Game {
  arena: string
  isOT: boolean
  isReplay: boolean
  target: string
  timeRemaining: number
  winner: string
  players: USPlayer[]
  score: {
    blue: number
    orange: number
  }
}

export default Game

export function isGame(obj: unknown): obj is Game {
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
    record.players.every((value) => isUSPlayer(value)) &&
    isScore(record.score)
  )
}
