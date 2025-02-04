import Explorer from '@components/explorer'
import Topbar from '@components/topbar'
import { Component, ParentProps } from 'solid-js'

const Layout: Component<ParentProps> = props => {
  return (
    <div class="flex h-screen flex-col">
      <Topbar />
      <div class="flex grow flex-row">
        <Explorer />
        <div class="flex h-full grow flex-col rounded-tl-md bg-zinc-900">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Layout
