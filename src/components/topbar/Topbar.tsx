/* eslint-disable @typescript-eslint/no-misused-promises */
import MinusIcon from '@assets/MinusIcon'
import Square2StackIcon from '@assets/Square2StackIcon'
import StopIcon from '@assets/StopIcon'
import XMarkIcon from '@assets/XMarkIcon'
import { getCurrentWindow } from '@tauri-apps/api/window'
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
      <div data-tauri-drag-region class="flex grow flex-row items-center"></div>
      <div class="flex flex-row items-center justify-center">
        <div
          class="flex h-full w-10 items-center justify-center p-3 text-white transition-all duration-100 ease-in hover:cursor-default hover:bg-white hover:bg-opacity-10"
          onClick={minimize}
        >
          <MinusIcon />
        </div>
        <div
          class="flex h-full w-10 items-center justify-center p-3 text-white transition-all duration-100 ease-in hover:cursor-default hover:bg-white hover:bg-opacity-10"
          onClick={toggleMaximize}
        >
          <Switch>
            <Match when={maximized()}>
              <Square2StackIcon />
            </Match>
            <Match when={!maximized()}>
              <StopIcon />
            </Match>
          </Switch>
        </div>
        <div
          class="flex h-full w-10 items-center justify-center p-[11px] text-white transition-all duration-100 ease-in hover:cursor-default hover:bg-red-500 hover:bg-opacity-70"
          onClick={close}
        >
          <XMarkIcon />
        </div>
      </div>
    </div>
  )
}

export default Topbar
