export interface Tournament {
  id: number
  name: string
  pfp: string
}

export interface Event {
  id: number
  name: string
  tournament: number
}

export interface Phase {
  id: number
  name: string
  number: number
  event: number
}

export interface Bracket {
  id: number
  phase: number
  identifier: string
  type: string
}

export interface Round {
  id: number
  number: number
  bo: number
  startAt: number
  bracket: number
}

export interface Match {
  id: number
  bo: number
  identifier: string
  number: number
  team1: number
  team2: number
  winner: number
  round: number
}

export interface Game {
  id: number
  match: number
  number: number
  score1: number
  score2: number
  winner: number
}

export interface Stat {
  id: number
  score: number
  goals: number
  assists: number
  saves: number
  shots: number
  game: number
  player: number
}

export interface Standing {
  id: number
  bracket: number
  team: number
  placement: number
  metadata: string | object
}

export interface Team {
  id: number
  name: string
  pfp: string
  tournament: number
}

export interface Player {
  id: number
  team: number
  name: string
}
