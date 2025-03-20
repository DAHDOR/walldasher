import { showToast } from '@components/ui/toast'
import { Accessor, createContext, createSignal, useContext } from 'solid-js'
import { useWS } from './ws'

const [internet, setInternet] = createSignal(true)

const InternetStatusContext = createContext<Accessor<boolean>>(internet)

const InternetProvider = ({ children }) => {
  const ws = useWS()

  ws.subscribe('internet', 'disconnected', () => {
    setInternet(false)
    showToast({
      title: 'Sin conexión',
      description:
        'Parece que no tienes conexión a internet. Algunas funciones pueden no estar disponibles.',
      variant: 'error'
    })
  })

  ws.subscribe('internet', 'connected', () => {
    setInternet(true)
    showToast({
      description: 'Conexión a internet restablecida.',
      variant: 'success'
    })
  })

  return (
    <InternetStatusContext.Provider value={internet}>
      {children}
    </InternetStatusContext.Provider>
  )
}

const useInternet = () => useContext(InternetStatusContext)

export { InternetProvider, useInternet }
