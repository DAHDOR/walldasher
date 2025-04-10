import { useWS } from '@/contexts/ws'
import { useGameState } from '@contexts/game-state'
import { useMatchState } from '@contexts/match-state'
import { BoostService } from '@lib/boost-service'
import { GameService } from '@lib/game-service'
import { USPlayer } from '@models/ingame/events/UpdateState/USPlayer'
import gsap from 'gsap'
import { createEffect, createSignal, Show } from 'solid-js'

function normalizeRadius(radius: number, thickness: number) {
  return radius - thickness / 2
}

const PlayerBoostMeter = () => {
  const gameState = useGameState()
  const matchState = useMatchState()

  const [targetPlayer, setTargetPlayer] = createSignal<USPlayer | undefined>(undefined)

  const RADIUS = 130

  const BOOST_THICKNESS = 32

  const BOOST_MARGIN = 8

  const boostNormalizedRadius = normalizeRadius(RADIUS, BOOST_THICKNESS)

  const backgroundStrokeWidth = BOOST_MARGIN / 2

  const backgroundNormalizedRadius = normalizeRadius(RADIUS, backgroundStrokeWidth)

  const circumference = 2 * Math.PI * boostNormalizedRadius

  createEffect(() =>
    setTargetPlayer(
      GameService.getPlayerFromTarget(gameState().players, gameState().target)
    )
  )

  let boostMeterRef: SVGSVGElement | null
  const setBoostMeterRef = (el: SVGSVGElement) => (boostMeterRef = el)

  const [inReplayPosition, setInReplayPosition] = createSignal(false)

  const enterReplay = () => {
    gsap
      .to(boostMeterRef, { y: -190, ease: 'power2.out', duration: 1 })
      .then(() => setInReplayPosition(true))
      .catch(console.error)
  }

  const exitReplay = () => {
    gsap
      .to(boostMeterRef, { y: 0, ease: 'power2.out', duration: 1 })
      .then(() => setInReplayPosition(false))
      .catch(console.error)
  }

  const ws = useWS()
  ws.subscribe('game', 'replay_start', () => {
    enterReplay()
  })
  ws.subscribe('game', 'replay_end', () => {
    exitReplay()
  })

  return (
    <Show when={targetPlayer() && matchState().isGameInProgress}>
      <svg
        ref={setBoostMeterRef}
        width={RADIUS * 2}
        height={RADIUS * 2}
        y={inReplayPosition() ? -190 : 0}
        class="absolute bottom-8 right-14"
      >
        {/* BACKGROUND */}
        <circle
          fill="rgba(28, 28, 28, 0.95)"
          r={backgroundNormalizedRadius}
          cx={RADIUS}
          cy={RADIUS}
          stroke={
            targetPlayer().team === 0
              ? 'rgba(34, 178, 255, 0.25)'
              : 'rgba(255, 138, 21, 0.25)'
          }
          stroke-width={backgroundStrokeWidth}
        />

        {/* DETAILS */}
        <circle
          mask="url(#boostplaceholder-mask)"
          stroke={'#161616'}
          stroke-dasharray={`${circumference} ${circumference}`}
          stroke-dashoffset={BoostService.getBoostBarCircumference(62.5, circumference)}
          stroke-width={BOOST_THICKNESS - BOOST_MARGIN}
          fill="transparent"
          r={boostNormalizedRadius - BOOST_MARGIN / 2}
          cx={RADIUS}
          cy={RADIUS}
          transform={`rotate(90 ${RADIUS} ${RADIUS})`}
        />
        <mask id="boostplaceholder-mask">
          <circle
            stroke="white"
            stroke-dashoffset={BoostService.getBoostBarCircumference(62.5, circumference)}
            stroke-width={BOOST_THICKNESS - BOOST_MARGIN}
            fill="transparent"
            r={boostNormalizedRadius - BOOST_MARGIN / 2}
            cx={RADIUS}
            cy={RADIUS}
            transform={`rotate(90 ${RADIUS} ${RADIUS})`}
          />
          <circle
            stroke="black"
            stroke-dasharray={`${circumference * 0.375} ${circumference * 0.359}`}
            stroke-width={BOOST_THICKNESS - BOOST_MARGIN - 20}
            fill="transparent"
            r={boostNormalizedRadius - BOOST_MARGIN / 2}
            cx={RADIUS}
            cy={RADIUS}
            transform={`rotate(90 ${RADIUS} ${RADIUS})`}
          />
        </mask>

        {/* BOOST */}
        <circle
          stroke={targetPlayer().team === 0 ? '#22b0ff' : '#ff8a15'}
          stroke-dasharray={`${circumference} ${circumference}`}
          stroke-dashoffset={BoostService.getBoostBarCircumference(
            targetPlayer().boost * 0.625,
            circumference
          )}
          style={{ transition: 'stroke-dashoffset 0.1s ease' }}
          stroke-width={BOOST_THICKNESS - BOOST_MARGIN}
          fill="transparent"
          r={boostNormalizedRadius - BOOST_MARGIN / 2}
          cx={RADIUS}
          cy={RADIUS}
          transform={`rotate(90 ${RADIUS} ${RADIUS})`}
        />

        {/* TEXT BACKGROUND */}
        <circle
          fill={'#161616'}
          r={boostNormalizedRadius - BOOST_THICKNESS / 2 - BOOST_MARGIN / 2}
          cx={RADIUS}
          cy={RADIUS}
        />

        {/* TEXT */}
        <text
          fill="#ffffff"
          x={RADIUS}
          y={RADIUS + 6}
          text-anchor="middle"
          dominant-baseline="middle"
          font-family="Chivo Mono"
          font-style="italic"
          font-size="54"
          font-weight="bold"
        >
          {targetPlayer().boost}
        </text>
      </svg>
    </Show>
  )
}

export { PlayerBoostMeter }
