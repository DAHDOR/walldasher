import { useRlWsStatus } from '@/contexts/rlWsStatus'
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip'
import { Button } from '@kobalte/core/button'
import { openUrl } from '@tauri-apps/plugin-opener'
import { Show } from 'solid-js'

const WarnTooltip = () => {
  const onBakkesMod = () => {
    openUrl('https://bakkesplugins.com/').then().catch(console.error)
  }

  const onSos = () => {
    openUrl('https://gitlab.com/bakkesplugins/sos/sos-plugin').then().catch(console.error)
  }

  return (
    <TooltipContent class="bg-warning text-warning-foreground border-warning-foreground text-wrap">
      Debes tener el plugin SOS cargado en Rocket League.
      <br />
      Para más información, visita la página de{' '}
      <Button class="font-bold underline" onClick={onSos}>
        SOS
      </Button>{' '}
      o la de{' '}
      <Button class="font-bold underline" onClick={onBakkesMod}>
        BakkesMod
      </Button>
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
