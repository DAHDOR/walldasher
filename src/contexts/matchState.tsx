import MatchState, { DEFAULT_MATCH_STATE, MatchTeam } from '@models/MatchState'
import { MatchSelect } from '@models/TournamentState'
import { Accessor, createContext, createSignal, useContext } from 'solid-js'
import { useWS } from './ws'

const [state, setState] = createSignal<MatchState>(DEFAULT_MATCH_STATE)

const MatchStateContext = createContext<Accessor<MatchState>>(state)

const MatchStateProvider = ({ children }) => {
  const ws = useWS()

  ws.subscribe('match', 'select', data => {
    const select = data as MatchSelect
    const blue = { ...state().blue, ...select.blue }
    const orange = { ...state().orange, ...select.orange }
    setState(state => ({
      ...state,
      bestOf: select.match.best_of,
      id: select.match.id,
      blue,
      orange
    }))
  })

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

  ws.subscribe('match', 'update_blue_team', data => {
    const blue = data as MatchTeam
    console.log('blue', blue)
    if (blue.logo_bytes) {
      blue.logo_bytes = new Uint8Array(Object.values(blue.logo_bytes))
      if (blue.logo_bytes != state().blue.logo_bytes) {
        blue.logo = URL.createObjectURL(
          new Blob([blue.logo_bytes], { type: 'image/png' })
        )
      }
    }
    setState(state => ({ ...state, blue }))
  })

  ws.subscribe('match', 'update_orange_team', data => {
    const orange = data as MatchTeam
    if (orange.logo_bytes) {
      orange.logo_bytes = new Uint8Array(Object.values(orange.logo_bytes))
      if (orange.logo_bytes != state().orange.logo_bytes) {
        orange.logo = URL.createObjectURL(
          new Blob([orange.logo_bytes], { type: 'image/png' })
        )
      }
    }
    setState(state => ({ ...state, orange }))
  })

  ws.subscribe('game', 'initialized', () => {
    setState(state => ({ ...state, isGameInProgress: true }))
  })

  ws.subscribe('game', 'match_ended', () => {
    setState(state => ({ ...state, isGameInProgress: false }))
  })

  ws.subscribe('game', 'match_destroyed', () => {
    setState(state => ({ ...state, isGameInProgress: false }))
  })

  ws.subscribe('game', 'update_state', () => {
    setState(state => ({ ...state, isGameInProgress: true }))
  })

  return <MatchStateContext.Provider value={state}>{children}</MatchStateContext.Provider>
}

const useMatchState = () => {
  return useContext(MatchStateContext)
}

export { MatchStateProvider, useMatchState }
