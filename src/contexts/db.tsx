import DB from '@lib/db'
import { isTauri } from '@tauri-apps/api/core'
import Database from '@tauri-apps/plugin-sql'
import {
  Accessor,
  createContext,
  createEffect,
  createSignal,
  onMount,
  ParentComponent,
  useContext
} from 'solid-js'

const DbContext = createContext<Accessor<DB>>(null)

const DbProvider: ParentComponent = props => {
  const [db, setDb] = createSignal<DB>(null)

  const createDb = (db: Database) => setDb(new DB(db))

  onMount(() => {
    if (isTauri())
      Database.load('sqlite:walldasher.db').then(createDb).catch(console.error)
  })

  createEffect(() => {
    console.log('db', db())
  })

  return <DbContext.Provider value={db}>{props.children}</DbContext.Provider>
}

const useDb = () => useContext(DbContext)

export { DbProvider, useDb }
