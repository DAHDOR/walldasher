import { useWS } from '@/contexts/ws'
import { Button } from '@components/ui/button'
import { openSvgFile, svgFileToURLWithXmlnsFix } from '@lib/images'
import { createSignal } from 'solid-js'

const Dev = () => {
  const ws = useWS()

  const [svg, setSvg] = createSignal('')

  const onTestFunction = () => {
    openSvgFile().then(svgFileToURLWithXmlnsFix).then(setSvg).catch(console.error)
  }

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
        <Button onClick={onTestFunction}>Prueba</Button>
        <img src={svg()} alt="Scorebug" class="w-32 h-32" />
      </div>
    </div>
  )
}

export default Dev
