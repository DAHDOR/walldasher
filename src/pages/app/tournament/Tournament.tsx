import { useStartKey } from '@contexts/startKey'
import { Component, Match, Switch } from 'solid-js'
import NoKey from './NoKey'
import Page from './Page'

const Tournament: Component = () => {
  const [startKey] = useStartKey()

  return (
    <Switch>
      <Match when={startKey()}>
        <Page />
      </Match>
      <Match when={!startKey()}>
        <NoKey />
      </Match>
    </Switch>
  )
}

export default Tournament
