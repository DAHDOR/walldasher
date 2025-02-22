interface Location {
  X: number
  Y: number
  Z: number
  pitch: number
  roll: number
  yaw: number
}

function isLocation(obj: unknown): obj is Location {
  const record = obj as Record<string, unknown>
  return (
    record &&
    typeof record.X === 'number' &&
    typeof record.Y === 'number' &&
    typeof record.Z === 'number' &&
    typeof record.pitch === 'number' &&
    typeof record.roll === 'number' &&
    typeof record.yaw === 'number'
  )
}

export interface USPlayer {
  assists: number
  attacker: string
  boost: number
  cartouches: number
  demos: number
  goals: number
  hasCar: boolean
  id: string
  isDead: boolean
  isPowersliding: boolean
  isSonic: boolean
  location: {
    X: number
    Y: number
    Z: number
    pitch: number
    roll: number
    yaw: number
  }
  name: string
  onGround: boolean
  onWall: boolean
  primaryID: string
  saves: number
  score: number
  shortcut: number
  shots: number
  speed: number
  team: number
  touches: number
}

export function isUSPlayer(obj: unknown): obj is USPlayer {
  const record = obj as Record<string, unknown>
  return (
    record &&
    typeof record.assists === 'number' &&
    typeof record.attacker === 'string' &&
    typeof record.boost === 'number' &&
    typeof record.cartouches === 'number' &&
    typeof record.demos === 'number' &&
    typeof record.goals === 'number' &&
    typeof record.hasCar === 'boolean' &&
    typeof record.id === 'string' &&
    typeof record.isDead === 'boolean' &&
    typeof record.isPowersliding === 'boolean' &&
    typeof record.isSonic === 'boolean' &&
    isLocation(record.location) &&
    typeof record.name === 'string' &&
    typeof record.onGround === 'boolean' &&
    typeof record.onWall === 'boolean' &&
    typeof record.primaryID === 'string' &&
    typeof record.saves === 'number' &&
    typeof record.score === 'number' &&
    typeof record.shortcut === 'number' &&
    typeof record.shots === 'number' &&
    typeof record.speed === 'number' &&
    typeof record.team === 'number' &&
    typeof record.touches === 'number'
  )
}
