import { DB_PATH } from '@lib/consts'
import DB from '@lib/db'
import Database from '@tauri-apps/plugin-sql'
import {
  Accessor,
  createContext,
  createSignal,
  ParentComponent,
  useContext
} from 'solid-js'

const DBContext = createContext<Accessor<DB>>(null)

const DBProvider: ParentComponent = props => {
  const [db, setDB] = createSignal<DB>(null)

  Database.load(DB_PATH)
    .then(db => setDB(new DB(db)))
    .catch(console.error)

  return <DBContext.Provider value={db}>{props.children}</DBContext.Provider>
}

const useDB = () => useContext(DBContext)

export { DBProvider, useDB }
