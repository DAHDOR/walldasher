/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  Bracket,
  Event,
  Match,
  Phase,
  Player,
  Round,
  Standing,
  Team,
  Tournament
} from './db'

export interface TeamPlayer extends Player {}

export interface TournamentTeam extends Team {
  players: TeamPlayer[]
}

export interface TournamentEvent extends Event {
  phases: EventPhase[]
}

export interface EventPhase extends Phase {
  brackets: PhaseBracket[]
}

export interface PhaseBracket extends Bracket {
  rounds: BracketRound[]
  standings: BracketStanding[]
}

export interface BracketRound extends Round {
  matches: RoundMatch[]
}

export interface BracketStanding extends Standing {
  teamInfo: TournamentTeam
}

export interface RoundMatch extends Match {}

interface TournamentState extends Tournament {
  events: TournamentEvent[]
  teams: TournamentTeam[]
}

export default TournamentState

export const DEFAULT_TOURNAMENT_STATE: TournamentState = {
  id: 0,
  name: 'Ninguno',
  logo: null,
  events: [],
  teams: []
}

export const DEFAULT_ROUND_MATCH: RoundMatch = {
  id: 61975766,
  title: 'LVRL | GRAN FINAL',
  best_of: 7,
  identifier: 'C',
  number: 1,
  team1: 13143254,
  team2: 13135532,
  winner: 13143254,
  round: 2
}

export interface MatchSelect {
  match: RoundMatch
  blue: TournamentTeam
  orange: TournamentTeam
}
