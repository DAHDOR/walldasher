import { useMatchState } from '@/contexts/matchState'
import { useWS } from '@/contexts/ws'
import TeamForm from '@components/TeamForm'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { createEffect, createSignal } from 'solid-js'
import MatchBestOf from './MatchBestOf'
import MatchTitle from './MatchTitle'

const Match = () => {
  const ws = useWS()
  const matchState = useMatchState()

  const [title, setTitle] = createSignal(matchState().title)
  const [bestOf, setBestOf] = createSignal(matchState().bestOf)
  const [blue, setBlue] = createSignal(matchState().blue)
  const [orange, setOrange] = createSignal(matchState().orange)

  createEffect(() => {
    ws.send('match', 'update_best_of', bestOf())
    if (blue().wins > Math.ceil(bestOf() / 2))
      setBlue({ ...blue(), wins: Math.ceil(bestOf() / 2) })
    if (orange().wins > Math.ceil(bestOf() / 2))
      setOrange({ ...orange(), wins: Math.ceil(bestOf() / 2) })
  })

  createEffect(() => {
    ws.send('match', 'update_blue_team', blue())
    ws.send('match', 'update_game_number', blue().wins + orange().wins + 1)
  })

  createEffect(() => {
    ws.send('match', 'update_orange_team', orange())
    ws.send('match', 'update_game_number', blue().wins + orange().wins + 1)
  })

  return (
    <div class="flex flex-col p-4 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Partido</CardTitle>
        </CardHeader>
        <CardContent class="flex row flex-wrap gap-4">
          <MatchTitle titleSignal={[title, setTitle]} />
          <MatchBestOf bestOf={[bestOf, setBestOf]} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Equipos</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="flex row gap-6 flex-wrap">
            <Card class="border-blue-500 flex-grow">
              <TeamForm bestOf={bestOf} team={[blue, setBlue]} />
            </Card>
            <Card class="border-orange-500 flex-grow">
              <TeamForm bestOf={bestOf} team={[orange, setOrange]} />
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Match
