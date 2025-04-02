import unknown from '@assets/images/unknown.png'
import { Team } from '@models/db'

export interface MatchTeam extends Team {
  wins: number
  logo: Uint8Array
  logoUrl: string
}

export const DEFAULT_BLUE_TEAM: MatchTeam = {
  id: 0,
  name: 'Azul',
  tournament: 0,
  wins: 0,
  logo: null,
  logoUrl: unknown
}

export const DEFAULT_ORANGE_TEAM: MatchTeam = {
  id: 0,
  name: 'Naranja',
  tournament: 0,
  wins: 0,
  logo: null,
  logoUrl: unknown
}

export const DEFAULT_MATCH_STATE: MatchState = {
  id: 0,
  title: 'Título del Partido',
  bestOf: 7,
  isGameInProgress: false,
  gameNumber: 1,
  blue: DEFAULT_BLUE_TEAM,
  orange: DEFAULT_ORANGE_TEAM
}

interface MatchState {
  id: number
  title: string
  bestOf: number
  isGameInProgress: boolean
  gameNumber: number
  blue: MatchTeam
  orange: MatchTeam
}

export default MatchState
