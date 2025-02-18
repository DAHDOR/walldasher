interface Match {
  bo: number
  isRunning: boolean
  game: number
  blueWins: number
  orangeWins: number
}

export default Match

export function isMatch(obj: unknown): obj is Match {
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
