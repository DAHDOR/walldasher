import { Button } from '@components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@components/ui/dialog'
import { TextField, TextFieldInput } from '@components/ui/text-field'
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip'
import { Icon } from 'solid-heroicons'
import { cloudArrowUp, userCircle } from 'solid-heroicons/outline'
import { Component, createSignal } from 'solid-js'

const ChangeLogo: Component = () => {
  const [url, setUrl] = createSignal('')
  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger>
          <DialogTrigger as={Button<'button'>} class="!py-0">
            <Icon path={userCircle} class="!max-w-full" />
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Cambiar logo</TooltipContent>
      </Tooltip>
      <DialogContent class="max-w-lg">
        <DialogHeader>
          <DialogTitle>Cambiar logo del equipo</DialogTitle>
        </DialogHeader>
        <div class="flex flex-col gap-4 p-4">
          <TextField>
            <TextFieldInput
              value={url()}
              onInput={e => setUrl(e.currentTarget.value)}
              placeholder="Inserta una URL"
            />
          </TextField>
          <Button>
            <Icon path={cloudArrowUp} />O carga un archivo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ChangeLogo
