import { useMatchState } from '@contexts/matchState'
import './PlayerStatCard.css'
import { useGameState } from '@/contexts/gameState'
import { GameService } from '@lib/gameService'
import { USPlayer } from '@models/ingame/events/UpdateState/USPlayer'
import { Component, createEffect, createSignal, Show } from 'solid-js'

const SVGStat: Component<{ x: number; num: number; label: string }> = ({
  x,
  num,
  label
}) => {
  return (
    <>
      <text
        dominant-baseline="middle"
        text-anchor="end"
        x={x.toString()}
        y="19"
        fill="#ffffff"
        class="font-[Chivo] font-semibold italic text-xl"
      >
        {num}
      </text>
      <text
        dominant-baseline="middle"
        x={(x + 8).toString()}
        y="18"
        fill="#dfdfdf"
        class="font-[Chivo] font-light italic text-sm"
      >
        {label}
      </text>
    </>
  )
}

export default function PlayerStatCard() {
  const gameState = useGameState()
  const matchState = useMatchState()

  const [targetPlayer, setTargetPlayer] = createSignal<USPlayer | undefined>(undefined)

  createEffect(() =>
    setTargetPlayer(
      GameService.getPlayerFromTarget(gameState().players, gameState().target)
    )
  )

  return (
    <Show when={targetPlayer() && !gameState().isReplay && matchState().isGameInProgress}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 818 36"
        width={818}
        height={36}
        class="absolute bottom-[15px] left-[25px]"
      >
        <g id="Statcard">
          <g id="Stats">
            <polygon
              id="Panel"
              class="psc-cls-1"
              points="806 36 240 36 252 0 818 0 806 36"
            />
            <SVGStat x={318} num={targetPlayer().score} label="PUNTOS" />
            <SVGStat
              x={430}
              num={targetPlayer().goals}
              label={
                targetPlayer().goals === 0 || targetPlayer().goals > 1 ? 'GOLES' : 'GOL'
              }
            />
            <SVGStat x={530} num={targetPlayer().shots} label={'TIROS'} />
            <SVGStat x={628} num={targetPlayer().assists} label={'AST'} />
            <SVGStat x={710} num={targetPlayer().saves} label={'SALVADAS'} />
          </g>
          <g id="Player">
            <polygon
              id="Panel-2"
              data-name="Panel"
              class="psc-cls-3"
              points="241 36 0 36 12 0 253 0 241 36"
            />
            <text
              dominant-baseline="middle"
              text-anchor="middle"
              x="128"
              y="18"
              fill="#ffffff"
              class="font-[Chivo] font-semibold italic text-[18px]"
            >
              {targetPlayer().name}
            </text>
            <g id="Details">
              <polygon
                fill={targetPlayer().team === 0 ? '#22b0ff' : '#ff8a15'}
                points="1 36 0 36 12 0 13 0 1 36"
              />
              <polygon
                fill={targetPlayer().team === 0 ? '#22b0ff' : '#ff8a15'}
                points="241 36 0 36 1 35 242 35 241 36"
              />
            </g>
          </g>
        </g>
      </svg>
    </Show>
  )
}
