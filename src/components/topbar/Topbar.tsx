/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from '@components/ui/button'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { Icon } from 'solid-heroicons'
import { square_2Stack, stop, xMark } from 'solid-heroicons/outline'
import { minus } from 'solid-heroicons/solid'
import { Component, createSignal, Match, Switch } from 'solid-js'

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

  return (
    <div data-tauri-drag-region class="flex h-8 flex-row">
      <div data-tauri-drag-region class="flex grow flex-row items-center">
        <div class="pl-4 font-semibold">Walldasher</div>
      </div>
      <div class="flex flex-row items-center justify-center">
        <Button variant="ghost" onclick={minimize}>
          <Icon path={minus} />
        </Button>
        <Button variant="ghost" onclick={toggleMaximize}>
          <Icon path={maximized() ? square_2Stack : stop} />
        </Button>
        <Button variant="ghost" onclick={close} class="hover:bg-red-500">
          <Icon path={xMark} />
        </Button>
      </div>
    </div>
  )
}

export default Topbar
