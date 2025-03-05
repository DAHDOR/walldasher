import { useRlWsStatus } from '@/contexts/rlWsStatus'
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip'
import { Show } from 'solid-js'

const WarnTooltip = () => {
  return (
    <TooltipContent class="bg-warning text-warning-foreground border-warning-foreground text-wrap">
      Debes tener el plugin SOS cargado en Rocket League.
      <br />
      Para más información, visita la página de{' '}
      <a
        class="font-bold underline"
        href="https://gitlab.com/bakkesplugins/sos/sos-plugin"
      >
        SOS
      </a>{' '}
      o la de{' '}
      <a class="font-bold underline" href="https://bakkesplugins.com/">
        BakkesMod
      </a>
      .
    </TooltipContent>
  )
}

const SuccessTooltip = () => {
  return (
    <TooltipContent class="bg-success text-success-foreground border-success-foreground text-wrap">
      Conectado correctamente a Rocket League.
    </TooltipContent>
  )
}

const RLStatusBlock = () => {
  const rlWsStatus = useRlWsStatus()

  return (
    <div
      data-tauri-drag-region
      class={`flex items-center h-6 font-medium text-xs px-2 bg-opacity-20 item rounded-sm hover:cursor-default
            ${
              rlWsStatus() === 'DISCONNECTED'
                ? 'bg-error text-error-foreground'
                : rlWsStatus() === 'CONNECTING'
                  ? 'bg-warning text-warning-foreground'
                  : 'bg-success text-success-foreground'
            }`}
    >
      Rocket League:{' '}
      {rlWsStatus() === 'DISCONNECTED'
        ? 'Desconectado'
        : rlWsStatus() === 'CONNECTING'
          ? 'Conectando'
          : 'Conectado'}
    </div>
  )
}

const RLStatus = () => {
  const rlWsStatus = useRlWsStatus()

  return (
    <Tooltip>
      <TooltipTrigger>
        <RLStatusBlock />
      </TooltipTrigger>
      <Show when={rlWsStatus() === 'CONNECTED'} fallback={<WarnTooltip />}>
        <SuccessTooltip />
      </Show>
    </Tooltip>
  )
}

export default RLStatus
