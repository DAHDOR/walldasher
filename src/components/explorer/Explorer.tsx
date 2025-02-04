import Settings from '@components/settings'
import { Component } from 'solid-js'

const Explorer: Component = () => {
  return (
    <div class="flex h-full w-10 flex-col">
      <div class="flex grow flex-col"></div>
      <div class="flex flex-col items-center justify-center py-2">
        <Settings />
      </div>
    </div>
  )
}

export default Explorer
