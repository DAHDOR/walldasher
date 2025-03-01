import { useColorMode } from '@kobalte/core/color-mode'
import { Route, Router } from '@solidjs/router'
import AppPages from './app'
import Guard from './Guard'
import OverlayPages from './overlay'

const Pages = () => {
  useColorMode().setColorMode('dark')
  return (
    <Router>
      <Route path="/" component={Guard} />
      <Route path="*" component={Guard} />
      <AppPages />
      <OverlayPages />
    </Router>
  )
}

export default Pages
