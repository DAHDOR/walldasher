import { ws } from '@lib/ws'
import { invoke } from '@tauri-apps/api/core'
import { load } from '@tauri-apps/plugin-store'
import { createContext, useContext } from 'solid-js'

const WSContext = createContext(ws)

const WSProvider = ({ children }) => {
  ws.init(49322, true, undefined)

  const connect = async () => {
    const store = await load('store.json')
    const url = await store.get<string>('rl_url')
    await invoke('connect_to_rl', { url })
  }
  void connect()

  return <WSContext.Provider value={ws}>{children}</WSContext.Provider>
}

export default WSProvider

export const useWS = () => {
  return useContext(WSContext)
}
