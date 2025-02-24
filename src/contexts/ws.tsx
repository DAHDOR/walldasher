import { ws } from '@lib/ws'
import { createContext, useContext } from 'solid-js'

const WSContext = createContext(ws)

const WSProvider = ({ children }) => {
  ws.init(49322, false, undefined)

  return <WSContext.Provider value={ws}>{children}</WSContext.Provider>
}

const useWS = () => {
  return useContext(WSContext)
}

export { WSProvider, useWS }
