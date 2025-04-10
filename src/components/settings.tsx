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
import { APIForm } from './api-form-old'

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
          <APIForm
            label="Start.gg"
            placeholder="Llave de autenticación de Start.gg"
            info='Obtén tu llave de la API en los "Developer Settings" de Start.gg'
          />
          <APIForm
            label="Rocket League"
            placeholder="ej.: localhost:49122"
            info="Ruta de conexión al servidor WS de Rocket League"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { Settings }
