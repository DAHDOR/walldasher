import { useMatchState } from '@/contexts/matchState'
import { useWS } from '@/contexts/ws'
import { Button } from '@components/ui/button'

const Dev = () => {
  const ws = useWS()
  const matchState = useMatchState()
  const toggleIsGameInProgress = () => {
    if (matchState().isGameInProgress) {
      ws.send('game', 'match_ended', { winner_team_num: 0 })
      console.log('match_ended')
    } else {
      ws.send('game', 'initialized', '')
      console.log('initialized')
    }
  }

  return (
    <div class="flex flex-col p-4">
      <div class="flex items-center gap-5 font-bold">
        <Button onclick={toggleIsGameInProgress}>Toggle: isGameInProgress</Button>
        isGameInProgress: {matchState().isGameInProgress.toString()}
      </div>
    </div>
  )
}

export default Dev
