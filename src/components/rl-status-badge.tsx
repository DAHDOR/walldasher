import HyperLink from '@components/ui/hyperlink'
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip'
import { useRlWsStatus } from '@contexts/rl-ws-status'
import { createEffect, createSignal, Show } from 'solid-js'

const WarnTooltip = () => {
  return (
    <TooltipContent class="bg-warning text-warning-foreground border-warning-foreground text-wrap">
      Debes tener el plugin SOS cargado en Rocket League.
      <br />
      Para más información, visita la página de{' '}
      <HyperLink url="https://bakkesplugins.com/" text="BakkesPlugins" /> o la de{' '}
      <HyperLink url="https://gitlab.com/bakkesplugins/sos/sos-plugin" text="SOS" />.
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
  const status = useRlWsStatus()

  const [statusClass, setStatusClass] = createSignal('')
  const [statusText, setStatusText] = createSignal('')

  createEffect(() => {
    switch (status()) {
      case 'DISCONNECTED':
        setStatusClass('bg-error text-error-foreground')
        setStatusText('Desconectado')
        break
      case 'CONNECTING':
        setStatusClass('bg-warning text-warning-foreground')
        setStatusText('Conectando')
        break
      case 'CONNECTED':
        setStatusClass('bg-success text-success-foreground')
        setStatusText('Conectado')
        break
    }
  })

  return (
    <div
      data-tauri-drag-region
      class={`flex items-center h-6 font-medium text-xs px-2 bg-opacity-20 item rounded-sm ${statusClass()}`}
    >
      Rocket League: {statusText()}
    </div>
  )
}

const RLStatusBadge = () => {
  const status = useRlWsStatus()

  return (
    <Tooltip closeDelay={0}>
      <TooltipTrigger class="cursor-default">
        <RLStatusBlock />
      </TooltipTrigger>
      <Show when={status() === 'CONNECTED'} fallback={<WarnTooltip />}>
        <SuccessTooltip />
      </Show>
    </Tooltip>
  )
}

export { RLStatusBadge }
