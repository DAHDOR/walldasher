import { USBall } from './USBall'
import { USTeam } from './USTeam'

export interface USGame {
  arena: string
  ball: USBall
  hasTarget: boolean
  hasWinner: boolean
  isOT: boolean
  isReplay: boolean
  target: string
  teams: USTeam[]
  time_milliseconds: number
  time_seconds: number
  winner: string
}
