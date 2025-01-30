import Home from '@pages/home'
import Match from '@pages/match'
import Settings from '@pages/settings'
import Tournament from '@pages/tournament'
import { Route, Router } from '@solidjs/router'
import type { Component } from 'solid-js'
import Layout from './Layout'

const App: Component = () => {
  return (
    <Router root={Layout}>
      <Route path={'/'} component={Home} />
      <Route path={'/settings'} component={Settings} />
      <Route path={'/tournament'} component={Tournament} />
      <Route path={'/match'} component={Match} />
    </Router>
  )
}

export default App
