import unknown from '@assets/images/unknown.png'
import { Team } from '@models/db'

export interface MatchTeam extends Team {
  wins: number
  logo_bytes: Uint8Array
  logo: string
}

const DEFAULT_BLUE_TEAM: MatchTeam = {
  id: 0,
  name: 'Azul',
  logo_url: unknown,
  tournament: 0,
  wins: 0,
  logo_bytes: null,
  logo: unknown
}

const DEFAULT_ORANGE_TEAM: MatchTeam = {
  id: 0,
  name: 'Naranja',
  logo_url: unknown,
  tournament: 0,
  wins: 0,
  logo_bytes: null,
  logo: unknown
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
