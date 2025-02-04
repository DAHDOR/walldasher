import { randomFillSync } from 'crypto'
import { invoke } from '@tauri-apps/api/core'
import { beforeAll, expect, test } from 'vitest'
import { validateStart } from './validation'

beforeAll(() => {
  Object.defineProperty(window, 'crypto', {
    value: {
      // @ts-ignore
      getRandomValues: buffer => {
        return randomFillSync(buffer)
      }
    }
  })
})

test('start key validation returns true', async () => {
  expect(await invoke('set_start_key', { key: 'a1f9a2bf90a62e3931df098c02ad7126' })).toBe(
    true
  )
})
