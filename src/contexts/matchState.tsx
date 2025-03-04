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

  ws.subscribe('game', 'initialized', () => {
    setState(state => ({ ...state, isGameInProgress: true }))
  })

  ws.subscribe('game', 'match_ended', () => {
    setState(state => ({ ...state, isGameInProgress: false }))
  })

  ws.send('match', 'update_state', MatchStateContext)

  return <MatchStateContext.Provider value={state}>{children}</MatchStateContext.Provider>
}

const useMatchState = () => {
  return useContext(MatchStateContext)
}

export { MatchStateProvider, useMatchState }
