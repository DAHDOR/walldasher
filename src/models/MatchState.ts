import unknown from '@assets/images/unknown.png'
import { Team } from '@models/db'

const DEFAULT_BLUE_TEAM: Team = {
  id: 0,
  name: 'Azul',
  logo_url: 'base/' + unknown,
  tournament: 0
}

const DEFAULT_ORANGE_TEAM: Team = {
  id: 0,
  name: 'Naranja',
  logo_url: 'base/' + unknown,
  tournament: 0
}

export const DEFAULT_MATCH_STATE: MatchState = {
  id: 0,
  title: 'Título del Partido',
  bestOf: 7,
  isGameInProgress: false,
  gameNumber: 1,
  blueWins: 0,
  blue: DEFAULT_BLUE_TEAM,
  orangeWins: 0,
  orange: DEFAULT_ORANGE_TEAM
}

interface MatchState {
  id: number
  title: string
  bestOf: number
  isGameInProgress: boolean
  gameNumber: number
  blue: Team
  blueWins: number
  orange: Team
  orangeWins: number
}

export default MatchState
