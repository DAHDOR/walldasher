import type { Component } from 'solid-js'
import './index.css'
import { GameStateProvider } from '@/contexts/gameState'
import { MatchStateProvider } from '@/contexts/matchState'
import { SnapshotProvider } from '@/contexts/snapshot'
import { WSProvider } from '@/contexts/ws'
import { Toaster } from '@components/ui/toast'
import { TournamentStateProvider } from '@contexts/tournamentState'
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
      <TournamentStateProvider>
        <MatchStateProvider>
          <GameStateProvider>
            <SnapshotProvider>
              <ColorModeScript storageType={storageManager.type} />
              <ColorModeProvider storageManager={storageManager}>
                <div class="overflow-hidden">
                  <Pages />
                  <Toaster class="dark" />
                </div>
              </ColorModeProvider>
            </SnapshotProvider>
          </GameStateProvider>
        </MatchStateProvider>
      </TournamentStateProvider>
    </WSProvider>
  )
}

export default Main
