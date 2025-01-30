import Cog6ToothIcon from '@assets/Cog6ToothIcon'
import { Component } from 'solid-js'

const Explorer: Component = () => {
  return (
    <div class="flex h-full w-32 flex-col">
      <div class="flex grow flex-col"></div>
      <div class="flex h-7 w-full flex-row">
        <a class="grow" href="/settings">
          <div class="align-center flex h-full w-full justify-center p-[6px] text-white transition-all duration-100 ease-in hover:bg-white hover:bg-opacity-10">
            <Cog6ToothIcon />
          </div>
        </a>
      </div>
    </div>
  )
}

export default Explorer
