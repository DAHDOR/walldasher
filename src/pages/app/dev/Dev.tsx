import { useWS } from '@/contexts/ws'
import { Button } from '@components/ui/button'
import { useDb } from '@contexts/db'
import { openPngFile, pngBytesToURL } from '@lib/images'
import { DEFAULT_BLUE_TEAM } from '@models/MatchState'
import { DEFAULT_TOURNAMENT_STATE } from '@models/TournamentState'
import { readFile } from '@tauri-apps/plugin-fs'
import { createEffect, createSignal } from 'solid-js'

const Dev = () => {
  const ws = useWS()
  const db = useDb()

  const [team, setTeam] = createSignal(DEFAULT_BLUE_TEAM)
  const [logo, setLogo] = createSignal<string>('')

  const onTestFunction1 = () => {
    openPngFile()
      .then(readFile)
      .then(logo => setTeam(team => ({ ...team, logo })))
      .then(db().updateTeam)
      .catch(console.error)
  }

  const onTestFunction2 = () => {
    db().selectTeamById(0).then(setTeam).catch(console.error)
  }

  const onTestFunction3 = () => {
    db().insertTournament(DEFAULT_TOURNAMENT_STATE).catch(console.error)
  }

  createEffect(() => {
    console.log('team', team())
    console.log(typeof team().logo)
    setLogo(pngBytesToURL(team().logo))
  })

  return (
    <div class="flex flex-col p-4 gap-4">
      <h1 class="text-xl font-bold">Send event</h1>
      <div class="flex items-center gap-5 font-bold">
        <Button onclick={() => ws.send('game', 'initialized', '')}>
          game:initialized
        </Button>
        <Button onclick={() => ws.send('game', 'match_ended', { winner_team_num: 1 })}>
          game:match_ended
        </Button>
      </div>
      <h1 class="text-xl font-bold">Test functions</h1>
      <div class="flex items-center gap-5 font-bold">
        <Button onClick={onTestFunction1}>Actualizar team con blob</Button>
        <Button onClick={onTestFunction2}>Obtener team con blob</Button>
        <Button onClick={onTestFunction3}>Guardar torneo</Button>
        <img src={logo()} alt="Logo" class="w-32 h-32" />
      </div>
    </div>
  )
}

export default Dev
