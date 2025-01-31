import { useColorMode } from '@kobalte/core/color-mode'
import { Route, Router } from '@solidjs/router'
import type { Component } from 'solid-js'
import Home from './home'
import Layout from './Layout'
import Match from './match'
import Settings from './settings'
import Tournament from './tournament'

const Pages: Component = () => {
  useColorMode().setColorMode('dark')
  return (
    <Router root={Layout}>
      <Route path={'/'} component={Home} />
      <Route path={'/settings'} component={Settings} />
      <Route path={'/tournament'} component={Tournament} />
      <Route path={'/match'} component={Match} />
    </Router>
  )
}

export default Pages
