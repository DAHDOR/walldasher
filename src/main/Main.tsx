import type { Component } from 'solid-js'
import './index.css'
import RLProvider from '@/contexts/rl'
import WSProvider from '@/contexts/ws'
import {
  ColorModeProvider,
  ColorModeScript,
  createLocalStorageManager
} from '@kobalte/core'
import Pages from '@pages/index'

const Main: Component = () => {
  const storageManager = createLocalStorageManager('vite-ui-theme')
  return (
    <WSProvider>
      <RLProvider>
        <ColorModeScript storageType={storageManager.type} />
        <ColorModeProvider storageManager={storageManager}>
          <div class="overflow-hidden">
            <Pages />
          </div>
        </ColorModeProvider>
      </RLProvider>
    </WSProvider>
  )
}

export default Main
