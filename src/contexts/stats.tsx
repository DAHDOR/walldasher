import { USPlayer } from '@models/ingame/events/UpdateState/USPlayer'
import { createContext, createSignal, useContext } from 'solid-js'
import { useGameState } from './gameState'
import { useWS } from './ws'

const [stats, setStats] = createSignal<USPlayer[]>([])

const StatsContext = createContext(stats)

const StatsProvider = ({ children }) => {
  const ws = useWS()

  const state = useGameState()

  ws.subscribe('game', 'match_ended', () => {
    setStats(state().players)
  })

  return <StatsContext.Provider value={stats}>{children}</StatsContext.Provider>
}

const useStats = () => {
  return useContext(StatsContext)
}

export { StatsProvider, useStats }
