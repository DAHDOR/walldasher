import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip'
import { useInternet } from '@contexts/internet'
import { Icon } from 'solid-heroicons'
import { exclamationTriangle } from 'solid-heroicons/outline'
import { Show } from 'solid-js'

const NoInternet = () => {
  const internet = useInternet()

  return (
    <Show when={!internet()}>
      <Tooltip>
        <TooltipTrigger>
          <div class="flex items-center gap-2 p-1 w-6 h-6 rounded-sm bg-zinc-900">
            <Icon path={exclamationTriangle} />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          Parece que no tienes conexión a internet. Algunas funciones pueden no estar
          disponibles.
        </TooltipContent>
      </Tooltip>
    </Show>
  )
}

export default NoInternet
