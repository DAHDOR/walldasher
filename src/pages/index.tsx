import { useColorMode } from '@kobalte/core/color-mode'
import { Navigate, Route, Router } from '@solidjs/router'
import AppPages from './app'
import OverlayPages from './overlay-old'

const Pages = () => {
  useColorMode().setColorMode('dark')
  return (
    <Router>
      <Route path="/" component={() => <Navigate href="/app" />} />
      <AppPages />
      <OverlayPages />
    </Router>
  )
}

export default Pages
