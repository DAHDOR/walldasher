import TournamentState, { DEFAULT_TOURNAMENT_STATE } from '@models/TournamentState'
import { createContext, createSignal, useContext } from 'solid-js'
import { useWS } from './ws'

const [tournamentState, setTournamentState] = createSignal<TournamentState>(
  DEFAULT_TOURNAMENT_STATE
)

const TournamentStateContext = createContext(tournamentState)

const TournamentStateProvider = ({ children }) => {
  const ws = useWS()

  ws.subscribe('tournament', 'update_state', data => {
    const tournament = data as TournamentState
    setTournamentState(tournament)
  })

  return (
    <TournamentStateContext.Provider value={tournamentState}>
      {children}
    </TournamentStateContext.Provider>
  )
}

const useTournamentState = () => useContext(TournamentStateContext)

export { TournamentStateProvider, useTournamentState }
