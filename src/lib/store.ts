import { load } from '@tauri-apps/plugin-store'
import { START_KEY, STORE } from './consts'

export const store = async () => await load(STORE)

export const getStartKey = async () => await (await store()).get<string>(START_KEY)

export const setStartKey = async (key: string) =>
  await (await store()).set(START_KEY, key)
