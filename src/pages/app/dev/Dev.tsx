import { useWS } from '@/contexts/ws'
import ChangeLogo from '@components/changeLogo'
import { Button } from '@components/ui/button'

const Dev = () => {
  const ws = useWS()

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
        <ChangeLogo />
      </div>
    </div>
  )
}

export default Dev
