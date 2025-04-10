import { PlayerBoostMeter } from './boostmeter'
import { Replay } from './replay'
import { Scorebug } from './scorebug'
import { PlayerStatCard } from './statcard'

const InGame = () => {
  return (
    <div class="w-screen h-screen">
      <Scorebug />
      <PlayerBoostMeter />
      <PlayerStatCard />
      <Replay />
    </div>
  )
}

export { InGame }
