import { invoke } from '@tauri-apps/api/core'
import { load } from '@tauri-apps/plugin-store'
import { Accessor, createContext, createSignal, useContext } from 'solid-js'
import { useWS } from './ws'

type RLWSStatus = 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED'

const [rlWsStatus, setRlStatus] = createSignal<RLWSStatus>('DISCONNECTED')

const rlWsStatusContext = createContext<Accessor<RLWSStatus>>(rlWsStatus)

const RlWsStatusProvider = ({ children }) => {
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
    await invoke('connect_to_rl_without_validation', { url })
  }

  connect().catch(console.error)

  return (
    <rlWsStatusContext.Provider value={rlWsStatus}>{children}</rlWsStatusContext.Provider>
  )
}

export default RlWsStatusProvider

export const useRlWsStatus = () => {
  return useContext(rlWsStatusContext)
}
