import { useColorMode } from '@kobalte/core/color-mode'
import { Navigate, Route, Router } from '@solidjs/router'
import type { Component } from 'solid-js'
import AppPages from './app'
import OverlayPages from './overlay'

const Pages: Component = () => {
  useColorMode().setColorMode('dark')
  return (
    <Router>
      <Route path="/" component={() => <Navigate href="/app" />} />
      <Route path="*" component={() => <Navigate href="/app" />} />
      <AppPages />
      <OverlayPages />
    </Router>
  )
}

export default Pages
