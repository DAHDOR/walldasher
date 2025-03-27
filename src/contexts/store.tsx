import { isTauri } from '@tauri-apps/api/core'
import { load, Store } from '@tauri-apps/plugin-store'
import {
  createContext,
  createSignal,
  onMount,
  ParentComponent,
  Signal,
  useContext
} from 'solid-js'

const [startKey, setStartKey] = createSignal('')

const StoreContext = createContext<Store>(null)

const StartKeyContext = createContext<Signal<string>>([startKey, setStartKey])

const StoreProvider: ParentComponent = props => {
  const [store, setStore] = createSignal<Store>(null)

  onMount(() => {
    if (isTauri())
      load('store.json')
        .then(setStore)
        .then(store => store.get<string>('key'))
        .then(setStartKey)
        .catch(console.error)
  })

  return (
    <StoreContext.Provider value={store()}>
      <StartKeyContext.Provider value={[startKey, setStartKey]}>
        {props.children}
      </StartKeyContext.Provider>
    </StoreContext.Provider>
  )
}

const useStore = () => useContext(StoreContext)

const useStartKey = () => useContext(StartKeyContext)

export { StoreProvider, useStore, useStartKey }
