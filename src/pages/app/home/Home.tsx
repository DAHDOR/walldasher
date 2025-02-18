import DummyText from '@components/DummyText'
import { Component } from 'solid-js'

const Home: Component = () => {
  return (
    <div class="px-6 py-4">
      <h1 class="font-semibold text-xl">Dashboard</h1>
      <DummyText />
    </div>
  )
}

export default Home
