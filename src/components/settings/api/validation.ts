import { ErrorKind } from '@lib/error'
import { invoke } from '@tauri-apps/api/core'

export const validateStart = async (key: string) => {
  return invoke('set_start_key', { key: key })
    .then(res => (res ? true : false))
    .catch((error: ErrorKind) => {
      if (error.kind === 'invalidKey') {
        return false
      } else {
        throw new Error(error.message)
      }
    })
}
