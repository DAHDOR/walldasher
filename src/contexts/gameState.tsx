import { UpdateState } from '@models/ingame/events/UpdateState/UpdateState'
import { USPlayer } from '@models/ingame/events/UpdateState/USPlayer'
import GameState, { DEFAULT_GAME_STATE } from '@models/ingame/GameState'
import { invoke } from '@tauri-apps/api/core'
import { load } from '@tauri-apps/plugin-store'
import { Accessor, createContext, createSignal, useContext } from 'solid-js'
import { useWS } from './ws'

const [state, setState] = createSignal<GameState>(DEFAULT_GAME_STATE)

const RLContext = createContext<Accessor<GameState>>(state)

const GameStateProvider = ({ children }) => {
  const ws = useWS()

  ws.subscribe('game', 'update_state', d => {
    const data = d as UpdateState
    const updatedPlayers: USPlayer[] = Object.values(data.players).map(
      (playerInfo: USPlayer) => playerInfo
    )

    setState({
      arena: data.game.arena,
      isOT: data.game.isOT,
      isReplay: data.game.isReplay,
      target: data.game.target,
      timeRemaining: data.game.time_seconds,
      winner: data.game.winner,
      players: updatedPlayers,
      score: {
        blue: data.game.teams[0].score,
        orange: data.game.teams[1].score
      }
    })
  })

  const connect = async () => {
    const store = await load('store.json')
    const url = await store.get<string>('rl_url')
    await invoke('connect_to_rl', { url })
  }
  void connect()

  return <RLContext.Provider value={state}>{children}</RLContext.Provider>
}

export default GameStateProvider

export const useRL = () => {
  return useContext(RLContext)
}
