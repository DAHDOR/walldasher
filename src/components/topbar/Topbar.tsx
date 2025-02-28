/* eslint-disable @typescript-eslint/no-misused-promises */
import { useRlWsStatus } from '@/contexts/rlWsStatus'
import { Button } from '@components/ui/button'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { Icon } from 'solid-heroicons'
import { square_2Stack, stop, xMark } from 'solid-heroicons/outline'
import { minus } from 'solid-heroicons/solid'
import { Component, createSignal } from 'solid-js'

const Topbar: Component = () => {
  const appWindow = getCurrentWindow()

  const [maximized, setMaximized] = createSignal(false)

  const minimize = async () => {
    await appWindow.minimize()
  }

  const toggleMaximize = async () => {
    await appWindow.toggleMaximize()
    const isMaximized = await appWindow.isMaximized()
    setMaximized(isMaximized)
  }

  const close = async () => {
    await appWindow.close()
  }

  const rl = useRlWsStatus()

  return (
    <div data-tauri-drag-region class="flex h-10 flex-row">
      <div data-tauri-drag-region class="flex flex-row grow items-center gap-4 px-4">
        <div class="font-semibold mb-[2px]">Walldasher</div>
        <div
          class={`flex items-center h-6 font-medium text-xs px-2 bg-opacity-20 item rounded-sm
            ${
              rl() === 'DISCONNECTED'
                ? 'bg-orange-800 text-orange-800'
                : rl() === 'CONNECTING'
                  ? 'bg-orange-600 text-orange-600'
                  : 'bg-orange-400 text-orange-400'
            }`}
        >
          Rocket League:{' '}
          {rl() === 'DISCONNECTED'
            ? 'Desconectado'
            : rl() === 'CONNECTING'
              ? 'Conectando'
              : 'Conectado'}
        </div>
      </div>
      <div class="flex flex-row items-center justify-center">
        <Button variant="ghost" onclick={minimize} class="cursor-default rounded-none">
          <Icon path={minus} />
        </Button>
        <Button
          variant="ghost"
          onclick={toggleMaximize}
          class="cursor-default rounded-none"
        >
          <Icon path={maximized() ? square_2Stack : stop} />
        </Button>
        <Button
          variant="ghost"
          onclick={close}
          class="hover:bg-red-500 cursor-default rounded-none"
        >
          <Icon path={xMark} />
        </Button>
      </div>
    </div>
  )
}

export default Topbar
