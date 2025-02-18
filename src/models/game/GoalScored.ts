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
