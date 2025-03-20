import { createContext, createSignal, Signal, useContext } from 'solid-js'
import { useStore } from './store'

const [startKey, setStartKey] = createSignal('')

const StartKeyContext = createContext<Signal<string>>([startKey, setStartKey])

const StartKeyProvider = ({ children }) => {
  const store = useStore()

  const getKey = () => {
    store.get<string>('key').then(setStartKey).catch(console.error)
  }

  getKey()

  return (
    <StartKeyContext.Provider value={[startKey, setStartKey]}>
      {children}
    </StartKeyContext.Provider>
  )
}

const useStartKey = () => useContext(StartKeyContext)

export { StartKeyProvider, useStartKey }
