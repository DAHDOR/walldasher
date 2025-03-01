export interface GoalScored {
  ball_last_touch: {
    player: string
    speed: number
  }
  goalspeed: number
  impact_location: {
    X: number
    Y: number
    Z: number
  }
  scorer: {
    id: string
    name: string
    teamnum: number
  }
}

export const DEFAULT_GOAL: GoalScored = {
  ball_last_touch: {
    player: '',
    speed: 0
  },
  goalspeed: 0,
  impact_location: {
    X: 0,
    Y: 0,
    Z: 0
  },
  scorer: {
    id: '',
    name: '',
    teamnum: 0
  }
}
