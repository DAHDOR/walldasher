import { useMatchState } from '@/contexts/matchState'
import { useWS } from '@/contexts/ws'
import TeamForm from '@components/TeamForm'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { Toaster } from '@components/ui/toast'
import { createEffect, createSignal } from 'solid-js'
import MatchBestOf from './MatchBestOf'
import MatchGameNumber from './MatchGameNumber'
import MatchTitle from './MatchTitle'

const Match = () => {
  const ws = useWS()
  const matchState = useMatchState()

  const [title, setTitle] = createSignal(matchState().title)
  const [bestOf, setBestOf] = createSignal(matchState().bestOf)
  const [gameNumber, setGameNumber] = createSignal(matchState().gameNumber)
  const [blueWins, setBlueWins] = createSignal(matchState().blue.wins)
  const [blueTeam, setBlueTeam] = createSignal(matchState().blue)
  const [orangeWins, setOrangeWins] = createSignal(matchState().orange.wins)
  const [orangeTeam, setOrangeTeam] = createSignal(matchState().orange)

  createEffect(() => {
    ws.send('match', 'update_best_of', bestOf())
    if (blueWins() > Math.ceil(bestOf() / 2)) setBlueWins(Math.ceil(bestOf() / 2))
    if (orangeWins() > Math.ceil(bestOf() / 2)) setOrangeWins(Math.ceil(bestOf() / 2))
    if (gameNumber() > bestOf()) setGameNumber(bestOf())
  })

  createEffect(() => {
    ws.send('match', 'update_game_number', gameNumber())
  })

  createEffect(() => {
    ws.send('match', 'update_blue_wins', blueWins())
  })

  createEffect(() => {
    ws.send('match', 'update_blue_team', blueTeam())
  })

  createEffect(() => {
    ws.send('match', 'update_orange_team', orangeTeam())
  })

  createEffect(() => {
    ws.send('match', 'update_orange_wins', orangeWins())
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
          <MatchGameNumber gameNumber={[gameNumber, setGameNumber]} bestOf={bestOf} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Equipos</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="flex row gap-6 flex-wrap">
            <Card class="border-blue-500 flex-grow">
              <TeamForm bestOf={bestOf} team={[blueTeam, setBlueTeam]} />
            </Card>
            <Card class="border-orange-500 flex-grow">
              <TeamForm bestOf={bestOf} team={[orangeTeam, setOrangeTeam]} />
            </Card>
          </div>
        </CardContent>
      </Card>
      <Toaster class="dark" />
    </div>
  )
}

export default Match
