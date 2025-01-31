import { Button } from '@components/ui/button'
import { Icon } from 'solid-heroicons'
import { cog_6Tooth } from 'solid-heroicons/solid'
import { Component } from 'solid-js'

const Explorer: Component = () => {
  return (
    <div class="flex h-full w-11 flex-col">
      <div class="flex grow flex-col"></div>
      <Button variant="ghost" class="rounded-none">
        <Icon path={cog_6Tooth} />
      </Button>
    </div>
  )
}

export default Explorer
