import GameState, { DEFAULT_GAME_STATE } from '@models/ingame/GameState'
import { createContext, createSignal, useContext } from 'solid-js'
import { useGameState } from './gameState'
import { useWS } from './ws'

const [snapshot, setSnapshot] = createSignal<GameState>(DEFAULT_GAME_STATE)

const SnapshotContext = createContext(snapshot)

const Snapshot = ({ children }) => {
  const ws = useWS()

  const state = useGameState()

  ws.subscribe('game', 'match_ended', () => {
    setSnapshot(state())
  })

  return <SnapshotContext.Provider value={snapshot}>{children}</SnapshotContext.Provider>
}

const useSnapshot = () => {
  return useContext(SnapshotContext)
}

export { Snapshot, useSnapshot as useStats }
