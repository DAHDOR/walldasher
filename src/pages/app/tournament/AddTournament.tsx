import { Spinner } from '@assets/index'
import { Button } from '@components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@components/ui/dialog'
import { TextField, TextFieldInput } from '@components/ui/text-field'
import { showToast } from '@components/ui/toast'
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip'
import { useStartKey } from '@contexts/store'
import { useWS } from '@contexts/ws'
import { getSlugFromUrl } from '@lib/utils'
import { getFullTournament } from '@start/get'
import { Icon } from 'solid-heroicons'
import { plus } from 'solid-heroicons/solid'
import { createSignal, Match, Switch } from 'solid-js'

const AddTournament = () => {
  const ws = useWS()
  const [key] = useStartKey()

  const [url, setUrl] = createSignal('')
  const [loading, setLoading] = createSignal(false)

  const onUrlInput = (e: InputEvent) => {
    setUrl((e.target as HTMLInputElement).value)
  }

  const onUrlAdd = () => {
    setLoading(true)
    const slug = getSlugFromUrl(url())
    if (!slug) showToast({ title: 'URL inválida', variant: 'error' })
    else
      getFullTournament(key(), slug)
        .then(tournament => {
          ws.send('tournament', 'update_state', tournament)
          showToast({ title: 'Torneo agregado', variant: 'success' })
        })
        .catch((err: Error) => {
          if (err.message.includes('No tournament found'))
            showToast({ title: 'URL inválida', variant: 'error' })
          else
            showToast({
              title: 'Error desconocido',
              description: 'Comprueba tu conexión a internet y vuelve a intentarlo.',
              variant: 'error'
            })
        })
        .finally(() => setLoading(false))
  }

  return (
    <Dialog>
      <Tooltip placement="left">
        <TooltipTrigger class="absolute bottom-4 right-6">
          <DialogTrigger as={Button<'button'>} class="w-fit p-2.5 rounded-full">
            <Icon path={plus} class="!h-5 !w-5" />
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Agregar torneo</TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar torneo</DialogTitle>
        </DialogHeader>
        <div class="flex flex-col gap-4">
          <TextField class="flex flex-row items-center gap-4 w-full">
            <TextFieldInput
              type="text"
              value={url()}
              placeholder="URL o slug del torneo"
              onInput={onUrlInput}
            />
            <Button
              disabled={!url() || loading()}
              class="w-12 px-2 py-0"
              onClick={onUrlAdd}
            >
              <Switch>
                <Match when={!loading()}>
                  <Icon path={plus} class="!h-5 !w-5" />
                </Match>
                <Match when={loading()}>
                  <Spinner />
                </Match>
              </Switch>
            </Button>
          </TextField>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddTournament
