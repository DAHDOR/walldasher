import { Game, Match } from '@models/db'

export const DEFAULT_MATCH_STATE: MatchState = {
  title: 'Título de Partido',
  bestOf: 7,
  isGameInProgress: false,
  gameNumber: 1,
  blueWins: 0,
  blueName: 'Equipo Azul',
  orangeWins: 0,
  orangeName: 'Equipo Naranja'
}

interface MatchState {
  title: string
  bestOf: number
  isGameInProgress: boolean
  gameNumber: number
  blueWins: number
  blueName: string
  orangeWins: number
  orangeName: string
  match?: Match
  games?: Game[]
}

export default MatchState
