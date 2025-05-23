import { Explorer } from '@components/explorer'
import { Topbar } from '@components/topbar'
import { DBProvider } from '@contexts/db'
import RlWsStatusProvider from '@contexts/rl-ws-status'
import { Route, useNavigate } from '@solidjs/router'
import { isTauri } from '@tauri-apps/api/core'
import { Component, ParentProps } from 'solid-js'
import { Dev } from './dev'
import { Home } from './home'
import { Match } from './match'
import { Tournament } from './tournament'

const Layout: Component<ParentProps> = props => {
  const navigate = useNavigate()

  if (!isTauri()) navigate('/overlay/ingame')

  return (
    <div class="flex h-screen flex-col">
      <DBProvider>
        <RlWsStatusProvider>
          <Topbar />
          <div class="flex grow flex-row max-h-[calc(100vh-40px)]">
            <Explorer />
            <div class="flex h-full grow flex-col rounded-tl-md bg-zinc-900 overflow-y-scroll">
              {props.children}
            </div>
          </div>
        </RlWsStatusProvider>
      </DBProvider>
    </div>
  )
}

const AppPages = () => {
  return (
    <Route path="/app" component={Layout}>
      <Route path="/" component={Home} />
      <Route path="/tournament" component={Tournament} />
      <Route path="/match" component={Match} />
      <Route path="/dev" component={Dev} />
    </Route>
  )
}

export { AppPages }
