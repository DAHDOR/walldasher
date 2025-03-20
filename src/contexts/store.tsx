import { isTauri } from '@tauri-apps/api/core'
import { load, Store } from '@tauri-apps/plugin-store'
import { createContext, useContext } from 'solid-js'

let store: Store

if (isTauri()) {
  store = await load('store.json')
}

const StoreContext = createContext(store)

const StoreProvider = ({ children }) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

const useStore = () => useContext(StoreContext)

export { StoreProvider, useStore }
