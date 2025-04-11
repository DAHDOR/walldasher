import { Button } from '@components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@components/ui/card'
import { showToast } from '@components/ui/toast'
import { useTournamentState } from '@contexts/tournament-state'
import { useWS } from '@contexts/ws'
import { getStartKey } from '@lib/store'
import { DEFAULT_ROUND_MATCH, MatchSelect, RoundMatch } from '@models/TournamentState'
import { Component, createEffect, createSignal, For, Match, Show, Switch } from 'solid-js'
import { AddTournament } from './add-tournament'
import { NoKey } from './no-key'

interface MatchSelectorProps {
  match: RoundMatch
}

const MatchSelector = ({ match }: MatchSelectorProps) => {
  const ts = useTournamentState()

  const ws = useWS()

  const blue = ts().teams.find(team => team.id === match.team1)
  const orange = ts().teams.find(team => team.id === match.team2)

  const onMatchSelect = () => {
    ws.send('match', 'select', { match, blue, orange } as MatchSelect)
    showToast({ title: 'Partido seleccionado', variant: 'success' })
  }

  return (
    <Show when={blue && orange}>
      <Button class="flex flex-row gap-4" onClick={onMatchSelect}>
        {blue.name} vs {orange.name}
      </Button>
    </Show>
  )
}

const Page = () => {
  const tournament = useTournamentState()

  const [matches, setMatches] = createSignal<RoundMatch[]>([DEFAULT_ROUND_MATCH])

  const now = new Date()
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).getTime()
  const startOfTomorrow = startOfToday + 24 * 60 * 60 * 1000

  for (const event of tournament().events)
    for (const phase of event.phases)
      for (const bracket of phase.brackets)
        for (const round of bracket.rounds.filter(
          round => round.start_at >= startOfToday && round.start_at < startOfTomorrow
        ))
          setMatches(matches => [...matches, ...round.matches])

  return (
    <div class="flex flex-col py-4 px-6 gap-4">
      <h1 class="text-2xl font-bold">Torneo actual: {tournament().name}</h1>
      <Card>
        <CardHeader>
          <CardTitle>Partidos de hoy</CardTitle>
          <CardDescription>
            Clickea para seleccionar el partido que se jugará
          </CardDescription>
        </CardHeader>
        <CardContent class="flex row flex-wrap gap-4">
          <Switch>
            <Match when={matches().length === 0}>
              <span>No hay partidos hoy</span>
            </Match>
            <Match when={matches().length > 0}>
              <div class="flex flex-col gap-4">
                <For each={matches()}>{match => <MatchSelector match={match} />}</For>
              </div>
            </Match>
          </Switch>
        </CardContent>
      </Card>
      <AddTournament />
    </div>
  )
}

const Tournament: Component = () => {
  const [hasKey, setHasKey] = createSignal<boolean | null>(null)

  createEffect(() => {
    getStartKey()
      .then(key => setHasKey(!!key))
      .catch(console.error)
  })

  return (
    <Switch>
      <Match when={hasKey() || hasKey() === null}>
        <Page />
      </Match>
      <Match when={hasKey() === false}>
        <NoKey />
      </Match>
    </Switch>
  )
}

export { Tournament }
