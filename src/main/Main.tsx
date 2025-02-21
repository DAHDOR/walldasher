import type { Component } from 'solid-js'
import './index.css'
import GameStateProvider from '@/contexts/gameState'
import RlStatusProvider from '@/contexts/rlStatus'
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
      <RlStatusProvider>
        <GameStateProvider>
          <ColorModeScript storageType={storageManager.type} />
          <ColorModeProvider storageManager={storageManager}>
            <div class="overflow-hidden">
              <Pages />
            </div>
          </ColorModeProvider>
        </GameStateProvider>
      </RlStatusProvider>
    </WSProvider>
  )
}

export default Main
