import { Button } from '@components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@components/ui/dialog'
import { Icon } from 'solid-heroicons'
import { cog_6Tooth } from 'solid-heroicons/solid'
import { Component } from 'solid-js'
import { RLForm } from './rl-form'
import { StartForm } from './start-form'

const Settings: Component = () => {
  return (
    <Dialog>
      <DialogTrigger as={Button<'button'>} variant="ghost" class="p-1 w-7 h-7">
        <Icon path={cog_6Tooth} class="!max-w-full" />
      </DialogTrigger>
      <DialogContent class="max-w-lg">
        <DialogHeader>
          <DialogTitle>Configuración</DialogTitle>
        </DialogHeader>
        <div class="flex flex-col gap-4 p-4">
          <StartForm />
          <RLForm />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { Settings }
