import { useColorMode } from '@kobalte/core/color-mode'
import { Router } from '@solidjs/router'
import type { Component } from 'solid-js'
import AppPages from './app'
import OverlayPages from './overlay'

const Pages: Component = () => {
  useColorMode().setColorMode('dark')
  return (
    <Router>
      <AppPages />
      <OverlayPages />
    </Router>
  )
}

export default Pages
