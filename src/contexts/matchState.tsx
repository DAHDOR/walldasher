import { Team } from '@models/db'
import MatchState, { DEFAULT_MATCH_STATE } from '@models/MatchState'
import { Accessor, createContext, createSignal, useContext } from 'solid-js'
import { useWS } from './ws'

const [state, setState] = createSignal<MatchState>(DEFAULT_MATCH_STATE)

const MatchStateContext = createContext<Accessor<MatchState>>(state)

const MatchStateProvider = ({ children }) => {
  const ws = useWS()

  ws.subscribe('match', 'update_state', data => {
    const matchStateData = data as MatchState
    setState(matchStateData)
  })

  ws.subscribe('match', 'update_title', data => {
    const title = data as string
    setState(state => ({ ...state, title }))
  })

  ws.subscribe('match', 'update_best_of', data => {
    const bestOf = data as number
    setState(state => ({ ...state, bestOf }))
  })

  ws.subscribe('match', 'update_game_number', data => {
    const gameNumber = data as number
    setState(state => ({ ...state, gameNumber }))
  })

  ws.subscribe('match', 'update_blue_wins', data => {
    const blueWins = data as number
    setState(state => ({ ...state, blueWins }))
  })

  ws.subscribe('match', 'update_orange_wins', data => {
    const orangeWins = data as number
    setState(state => ({ ...state, orangeWins }))
  })

  ws.subscribe('match', 'update_blue_team', data => {
    const blue = data as Team
    setState(state => ({ ...state, blue }))
  })

  ws.subscribe('match', 'update_orange_team', data => {
    const orange = data as Team
    setState(state => ({ ...state, orange }))
  })

  ws.subscribe('game', 'initialized', () => {
    setState(state => ({ ...state, isGameInProgress: true }))
  })

  ws.subscribe('game', 'match_ended', () => {
    setState(state => ({ ...state, isGameInProgress: false }))
  })

  return <MatchStateContext.Provider value={state}>{children}</MatchStateContext.Provider>
}

const useMatchState = () => {
  return useContext(MatchStateContext)
}

export { MatchStateProvider, useMatchState }
