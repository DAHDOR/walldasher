export interface BallHit {
  ball: {
    location: {
      X: number
      Y: number
      Z: number
    }
    post_hit_speed: number
    pre_hit_speed: number
  }
  player: {
    id: string
    name: string
  }
}
