import { useWS } from '@/contexts/ws'
import Guard from '@pages/Guard'
import { Route, useNavigate } from '@solidjs/router'
import { Component, ParentProps } from 'solid-js'
import InGame from './ingame'
import NextUp from './nextup'
import Phase from './phase'
import PostGame from './postgame'
import RoundRobin from './roundrobin'
import Winner from './winner'

const Layout: Component<ParentProps> = props => {
  const ws = useWS()

  const navigate = useNavigate()

  ws.subscribe('game', 'initialized', () => navigate('/overlay/ingame'))

  ws.subscribe('game', 'match_ended', () => {
    navigate('/overlay/winner')
    setTimeout(() => navigate('/overlay/postgame'), 5000)
  })

  return (
    <div class="fixed top-0 left-0 w-[1920px] h-[1080px] bg-transparent">
      {props.children}
    </div>
  )
}

const OverlayPages = () => {
  return (
    <Route path="/overlay" component={Layout}>
      <Route path="/" component={Guard} />
      <Route path="/phase" component={Phase} />
      <Route path="/nextup" component={NextUp} />
      <Route path="/ingame" component={InGame} />
      <Route path="/postgame" component={PostGame} />
      <Route path="/roundrobin" component={RoundRobin} />
      <Route path="/winner" component={Winner} />
    </Route>
  )
}

export default OverlayPages
