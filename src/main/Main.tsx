import type { Component } from 'solid-js'
import './index.css'
import { GameStateProvider } from '@/contexts/gameState'
import { MatchStateProvider } from '@/contexts/matchState'
import { Snapshot } from '@/contexts/snapshot'
import { WSProvider } from '@/contexts/ws'
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
      <MatchStateProvider>
        <GameStateProvider>
          <Snapshot>
            <ColorModeScript storageType={storageManager.type} />
            <ColorModeProvider storageManager={storageManager}>
              <div class="overflow-hidden">
                <Pages />
              </div>
            </ColorModeProvider>
          </Snapshot>
        </GameStateProvider>
      </MatchStateProvider>
    </WSProvider>
  )
}

export default Main
