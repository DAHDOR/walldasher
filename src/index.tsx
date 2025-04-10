import { render } from 'solid-js/web'
import './styles.css'
import { SnapshotProvider } from '@/contexts/snapshot'
import { WSProvider } from '@/contexts/ws'
import { Toaster } from '@components/ui/toast'
import { GameStateProvider } from '@contexts/game-state'
import { MatchStateProvider } from '@contexts/match-state'
import { TournamentStateProvider } from '@contexts/tournament-state'
import {
  ColorModeProvider,
  ColorModeScript,
  createLocalStorageManager
} from '@kobalte/core'
import Pages from '@pages/index'

const storageManager = createLocalStorageManager('vite-ui-theme')

render(
  () => (
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
  ),
  document.getElementById('root')
)
