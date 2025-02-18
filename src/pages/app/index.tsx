import Explorer from '@components/explorer'
import Topbar from '@components/topbar'
import { Route } from '@solidjs/router'
import { Component, ParentProps } from 'solid-js'
import Home from './home'
import Match from './match'
import Tournament from './tournament'

const Layout: Component<ParentProps> = props => {
  return (
    <div class="flex h-screen flex-col">
      <Topbar />
      <div class="flex grow flex-row max-h-[calc(100vh-40px)]">
        <Explorer />
        <div class="flex h-full grow flex-col rounded-tl-md bg-zinc-900 overflow-y-scroll">
          {props.children}
        </div>
      </div>
    </div>
  )
}

const AppPages = () => {
  return (
    <Route path="/app" component={Layout}>
      <Route path="/" component={Home} />
      <Route path="/tournament" component={Tournament} />
      <Route path="/match" component={Match} />
    </Route>
  )
}

export default AppPages
