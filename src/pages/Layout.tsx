import Explorer from '@components/explorer'
import Topbar from '@components/topbar'
import { Component, ParentProps } from 'solid-js'

const Layout: Component<ParentProps> = props => {
  return (
    <div class="flex h-screen flex-col">
      <Topbar />
      <div class="flex grow flex-row">
        <Explorer />
        <div class="r- flex h-full grow flex-col rounded-tl-md bg-neutral-950">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Layout
