import PlayerBoostMeter from './components/PlayerBoostMeter/PlayerBoostMeter'
import PlayerStatCard from './components/PlayerStatCard/PlayerStatCard'
import Replay from './components/Replay'
import Scorebug from './components/Scorebug'

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

export default InGame
