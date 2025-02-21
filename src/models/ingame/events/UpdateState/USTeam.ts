export interface USTeam {
  color_primary: string
  color_secondary: string
  name: string
  score: number
}

export function isUSTeam(obj: unknown): obj is USTeam {
  const record = obj as Record<string, unknown>
  return (
    record &&
    typeof record.color_primary === 'string' &&
    typeof record.color_secondary === 'string' &&
    typeof record.name === 'string' &&
    typeof record.score === 'number'
  )
}
