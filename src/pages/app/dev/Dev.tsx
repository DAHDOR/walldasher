import { useWS } from '@/contexts/ws'
import { Button } from '@components/ui/button'
import { openLogo } from '@lib/images'
import { readFile } from '@tauri-apps/plugin-fs'
import { Icon } from 'solid-heroicons'
import { folderPlus } from 'solid-heroicons/solid'
import { createSignal } from 'solid-js'

const Dev = () => {
  const ws = useWS()

  const [url, setUrl] = createSignal('')

  const onSelectLogo = () => {
    openLogo()
      .then(readFile)
      .then(file => new Blob([file], { type: 'image/png' }))
      .then(blob => URL.createObjectURL(blob))
      .then(setUrl)
      .catch(console.error)
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
        <Button onClick={onSelectLogo}>
          <Icon path={folderPlus} />
          Cargar PNG
        </Button>
        <img src={url()} class="w-20 h-20" />
      </div>
    </div>
  )
}

export default Dev
