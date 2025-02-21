import { invoke } from '@tauri-apps/api/core'
import { load } from '@tauri-apps/plugin-store'
import { Accessor, createContext, createSignal, useContext } from 'solid-js'
import { useWS } from './ws'

type RLStatus = 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED'

const [rlStatus, setRlStatus] = createSignal<RLStatus>('DISCONNECTED')

const rlStatusContext = createContext<Accessor<RLStatus>>(rlStatus)

const RlStatusProvider = ({ children }) => {
  const ws = useWS()

  ws.subscribe('rl', 'disconnected', () => {
    setRlStatus('DISCONNECTED')
  })

  ws.subscribe('rl', 'connecting', () => {
    setRlStatus('CONNECTING')
  })

  ws.subscribe('rl', 'connected', () => {
    setRlStatus('CONNECTED')
  })

  const connect = async () => {
    const store = await load('store.json')
    const url = await store.get<string>('rl_url')
    await invoke('connect_to_rl', { url })
  }
  void connect()

  return <rlStatusContext.Provider value={rlStatus}>{children}</rlStatusContext.Provider>
}

export default RlStatusProvider

export const useRLStatus = () => {
  return useContext(rlStatusContext)
}
