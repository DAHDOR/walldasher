import { invoke } from '@tauri-apps/api/core'
import { load } from '@tauri-apps/plugin-store'
import { Accessor, createContext, createSignal, useContext } from 'solid-js'
import { useWS } from './ws'

type RLStatus = 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED'

const [rl, setRL] = createSignal<RLStatus>('DISCONNECTED')

const RLContext = createContext<Accessor<RLStatus>>(rl)

const RLProvider = ({ children }) => {
  const ws = useWS()

  ws.subscribe('rl', 'disconnected', () => {
    setRL('DISCONNECTED')
  })

  ws.subscribe('rl', 'connecting', () => {
    setRL('CONNECTING')
  })

  ws.subscribe('rl', 'connected', () => {
    setRL('CONNECTED')
  })

  const connect = async () => {
    const store = await load('store.json')
    const url = await store.get<string>('rl_url')
    await invoke('connect_to_rl', { url })
  }
  void connect()

  return <RLContext.Provider value={rl}>{children}</RLContext.Provider>
}

export default RLProvider

export const useRL = () => {
  return useContext(RLContext)
}
