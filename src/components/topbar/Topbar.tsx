import { Button } from '@components/ui/button'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { Icon } from 'solid-heroicons'
import { square_2Stack, stop, xMark } from 'solid-heroicons/outline'
import { minus } from 'solid-heroicons/solid'
import { Component, createSignal } from 'solid-js'
import RLStatus from './RLStatus'

const Topbar: Component = () => {
  const appWindow = getCurrentWindow()

  const [maximized, setMaximized] = createSignal(false)

  const minimize = () => {
    appWindow.minimize().catch(console.error)
  }

  const toggleMaximize = () => {
    appWindow
      .toggleMaximize()
      .then(() => appWindow.isMaximized().then(setMaximized).catch(console.error))
      .catch(console.error)
  }

  const close = () => {
    appWindow.close().catch(console.error)
  }

  return (
    <div data-tauri-drag-region class="flex h-10 flex-row">
      <div data-tauri-drag-region class="flex flex-row grow items-center gap-4 px-4">
        <div data-tauri-drag-region class="hover:cursor-default font-semibold mb-[2px]">
          Walldasher
        </div>
        <RLStatus />
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
