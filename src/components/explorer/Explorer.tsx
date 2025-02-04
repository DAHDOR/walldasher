import Settings from '@components/settings'
import { Button } from '@components/ui/button'
import { useNavigate } from '@solidjs/router'
import { Icon } from 'solid-heroicons'
import { home, lifebuoy, presentationChartBar } from 'solid-heroicons/solid'
import { Component } from 'solid-js'

const Explorer: Component = () => {
  const navigate = useNavigate()
  return (
    <div class="flex h-full w-10 flex-col">
      <div class="flex grow flex-col">
        <Button
          class="w-full rounded-none"
          variant="ghost"
          onclick={() => navigate('/app')}
        >
          <Icon path={home} />
        </Button>
        <Button
          class="w-full rounded-none"
          variant="ghost"
          onclick={() => navigate('/app/match')}
        >
          <Icon path={lifebuoy} />
        </Button>
        <Button
          class="w-full rounded-none"
          variant="ghost"
          onclick={() => navigate('/app/tournament')}
        >
          <Icon path={presentationChartBar} />
        </Button>
      </div>
      <div class="flex flex-col items-center justify-center py-2">
        <Settings />
      </div>
    </div>
  )
}

export default Explorer
