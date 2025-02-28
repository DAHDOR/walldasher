import { MatchEnded } from '@models/ingame/events/MatchEnded'
import GameState, { DEFAULT_GAME_STATE } from '@models/ingame/GameState'
import { createContext, createSignal, useContext } from 'solid-js'
import { useGameState } from './gameState'
import { useWS } from './ws'

const [snapshot, setSnapshot] = createSignal<GameState>(DEFAULT_GAME_STATE)

const SnapshotContext = createContext(snapshot)

const Snapshot = ({ children }) => {
  const ws = useWS()

  const gameState = useGameState()

  ws.subscribe('game', 'match_ended', data => {
    const matchEnded = data as MatchEnded
    const n = matchEnded.winner_team_num
    setSnapshot({ ...gameState(), winner: gameState().teams[n].name })
  })

  return <SnapshotContext.Provider value={snapshot}>{children}</SnapshotContext.Provider>
}

const useSnapshot = () => {
  return useContext(SnapshotContext)
}

export { Snapshot, useSnapshot }
