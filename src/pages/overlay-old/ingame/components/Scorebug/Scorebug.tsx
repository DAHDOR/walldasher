import { GameService } from '@lib/gameService'
import './Scorebug.css'
import { useGameState } from '@/contexts/gameState'
import { useMatchState } from '@/contexts/matchState'
import unknown from '@assets/images/unknown.png'
import gsap from 'gsap'
import { Component, createEffect, onMount } from 'solid-js'

interface AnimatedSVGProps {
  setRef: (el: SVGSVGElement) => void
}

const BlueGames: Component<AnimatedSVGProps> = ({ setRef }) => {
  const matchState = useMatchState()
  return (
    <>
      <mask id="bluegames-mask">
        <polygon points="456 126 298 126 292 108 450 108 456 126" />
      </mask>
      <g mask="url(#bluegames-mask)">
        <g ref={setRef} id="bluegames">
          <g id="bluegames-panel">
            <polygon class="cls-1" points="456 126 298 126 292 108 450 108 456 126" />
            <g data-name="TBD">
              {matchState().bestOf > 5 ? (
                <polygon
                  data-name="4"
                  class="cls-5"
                  points="334 120 304 120 302 114 332 114 334 120"
                />
              ) : null}
              {matchState().bestOf > 3 ? (
                <polygon
                  data-name="3"
                  class="cls-5"
                  points="372 120 342 120 340 114 370 114 372 120"
                />
              ) : null}
              {matchState().bestOf > 1 ? (
                <polygon
                  data-name="2"
                  class="cls-5"
                  points="410 120 380 120 378 114 408 114 410 120"
                />
              ) : null}
              {matchState().bestOf > 0 ? (
                <polygon
                  data-name="1"
                  class="cls-5"
                  points="448 120 418 120 416 114 446 114 448 120"
                />
              ) : null}
            </g>
          </g>
          <g id="bluewins">
            {matchState().blue.wins > 3 ? (
              <g data-name="4">
                <polygon
                  class="cls-7"
                  points="304.36 119.5 302.69 114.5 331.64 114.5 333.31 119.5 304.36 119.5"
                />
                <path
                  class="cls-8"
                  d="M331.28,115l1.33,4h-27.89l-1.33-4h27.89M332,114h-30l2,6h30l-2-6h0Z"
                />
              </g>
            ) : null}
            {matchState().blue.wins > 2 ? (
              <g data-name="3">
                <polygon
                  class="cls-7"
                  points="342.36 119.5 340.69 114.5 369.64 114.5 371.31 119.5 342.36 119.5"
                />
                <path
                  class="cls-8"
                  d="M369.28,115l1.33,4h-27.89l-1.33-4h27.89M370,114h-30l2,6h30l-2-6h0Z"
                />
              </g>
            ) : null}
            {matchState().blue.wins > 1 ? (
              <g data-name="2">
                <polygon
                  class="cls-7"
                  points="380.36 119.5 378.69 114.5 407.64 114.5 409.31 119.5 380.36 119.5"
                />
                <path
                  class="cls-8"
                  d="M407.28,115l1.33,4h-27.89l-1.33-4h27.89M408,114h-30l2,6h30l-2-6h0Z"
                />
              </g>
            ) : null}
            {matchState().blue.wins > 0 ? (
              <g data-name="1">
                <polygon
                  class="cls-7"
                  points="418.36 119.5 416.69 114.5 445.64 114.5 447.31 119.5 418.36 119.5"
                />
                <path
                  class="cls-8"
                  d="M445.28,115l1.33,4h-27.89l-1.33-4h27.89M446,114h-30l2,6h30l-2-6h0Z"
                />
              </g>
            ) : null}
          </g>
        </g>
      </g>
    </>
  )
}

const OrangeGames: Component<AnimatedSVGProps> = ({ setRef }) => {
  const matchState = useMatchState()
  return (
    <>
      <mask id="orangegames-mask">
        <polygon points="760 126 918 126 924 108 766 108 760 126" />
      </mask>
      <g mask="url(#orangegames-mask)">
        <g ref={setRef} id="orangegames">
          <g id="orangegames-panel">
            <polygon class="cls-1" points="760 126 918 126 924 108 766 108 760 126" />
            <g id="TBD">
              {matchState().bestOf > 5 ? (
                <polygon
                  data-name="4"
                  class="cls-5"
                  points="912 120 882 120 884 114 914 114 912 120"
                />
              ) : null}
              {matchState().bestOf > 3 ? (
                <polygon
                  data-name="3"
                  class="cls-5"
                  points="874 120 844 120 846 114 876 114 874 120"
                />
              ) : null}
              {matchState().bestOf > 1 ? (
                <polygon
                  data-name="2"
                  class="cls-5"
                  points="836 120 806 120 808 114 838 114 836 120"
                />
              ) : null}
              <polygon
                data-name="1"
                class="cls-5"
                points="798 120 768 120 770 114 800 114 798 120"
              />
            </g>
          </g>
          <g id="orangewins">
            {matchState().orange.wins > 3 ? (
              <g data-name="4">
                <polygon
                  class="cls-2"
                  points="882.69 119.5 884.36 114.5 913.31 114.5 911.64 119.5 882.69 119.5"
                />
                <path
                  class="cls-6"
                  d="M912.61,115l-1.33,4h-27.89l1.33-4h27.89M914,114h-30l-2,6h30l2-6h0Z"
                />
              </g>
            ) : null}
            {matchState().orange.wins > 2 ? (
              <g data-name="3">
                <polygon
                  class="cls-2"
                  points="844.69 119.5 846.36 114.5 875.31 114.5 873.64 119.5 844.69 119.5"
                />
                <path
                  class="cls-6"
                  d="M874.61,115l-1.33,4h-27.89l1.33-4h27.89M876,114h-30l-2,6h30l2-6h0Z"
                />
              </g>
            ) : null}
            {matchState().orange.wins > 1 ? (
              <g data-name="2">
                <polygon
                  class="cls-2"
                  points="806.69 119.5 808.36 114.5 837.31 114.5 835.64 119.5 806.69 119.5"
                />
                <path
                  class="cls-6"
                  d="M836.61,115l-1.33,4h-27.89l1.33-4h27.89M838,114h-30l-2,6h30l2-6h0Z"
                />
              </g>
            ) : null}
            {matchState().orange.wins > 0 ? (
              <g data-name="1">
                <polygon
                  class="cls-2"
                  points="768.69 119.5 770.36 114.5 799.31 114.5 797.64 119.5 768.69 119.5"
                />
                <path
                  class="cls-6"
                  d="M798.61,115l-1.33,4h-27.89l1.33-4h27.89M800,114h-30l-2,6h30l2-6h0Z"
                />
              </g>
            ) : null}
          </g>
        </g>
      </g>
    </>
  )
}

const Games: Component<AnimatedSVGProps> = ({ setRef }) => {
  const matchState = useMatchState()
  return (
    <>
      <mask id="games-mask">
        <polygon points="756 144 460 144 448 108 768 108 756 144" />
      </mask>
      <g mask="url(#games-mask)">
        <g ref={setRef} id="games">
          <polygon class="cls-4" points="756 144 460 144 448 108 768 108 756 144" />
          <text
            x={608}
            y={128}
            dominant-baseline="middle"
            text-anchor="middle"
            font-family="Chivo"
            font-size="16px"
            font-style="italic"
            fill="#ffffff"
          >
            {`JUEGO ${matchState().gameNumber} | MEJOR DE ${matchState().bestOf}`}
          </text>
        </g>
      </g>
    </>
  )
}

const BlueTeam: Component<AnimatedSVGProps> = ({ setRef }) => {
  const matchState = useMatchState()
  return (
    <>
      <mask id="blueteam-mask">
        <polygon points="0 36 24 108 450 108 426 36 0 36" />
      </mask>
      <g mask="url(#blueteam-mask)">
        <g ref={setRef} id="blueteam">
          <g data-name="logo">
            <polygon class="cls-4" points="24 108 120 108 96 36 0 36 24 108" />
            <image
              href={matchState().blue.logoUrl || unknown}
              x={36}
              y={47}
              width={48}
              height={48}
            />
          </g>
          <g data-name="name">
            <polygon class="cls-3" points="118 108 450 108 426 36 94 36 118 108" />
            <text
              x={410}
              y={74}
              dominant-baseline="middle"
              text-anchor="end"
              fill="white"
              font-family="Chivo"
              font-size="34px"
              font-style="italic"
              font-weight="500"
            >
              {matchState().blue.name}
            </text>
          </g>
          <g data-name="details">
            <polygon class="cls-7" points="24 108 450 108 449 106 25 107 24 108" />
            <polygon class="cls-7" points="24 108 25 107 0 36 24 108" />
          </g>
        </g>
      </g>
    </>
  )
}

const OrangeTeam: Component<AnimatedSVGProps> = ({ setRef }) => {
  const matchState = useMatchState()
  return (
    <>
      <mask id="orangeteam-mask">
        <polygon points="1216 36 1192 108 766 108 790 36 1216 36" />
      </mask>
      <g mask="url(#orangeteam-mask)">
        <g ref={setRef} id="orangeteam">
          <g data-name="logo">
            <polygon class="cls-4" points="1192 108 1096 108 1120 36 1216 36 1192 108" />
            <image
              href={matchState().orange.logoUrl || unknown}
              x={1133}
              y={47}
              width={48}
              height={48}
            />
          </g>
          <g data-name="name">
            <polygon class="cls-3" points="1098 108 766 108 790 36 1122 36 1098 108" />
            <text
              x={803}
              y={74}
              dominant-baseline="middle"
              text-anchor="start"
              fill="#ffffff"
              font-family="Chivo"
              font-size="34px"
              font-style="italic"
              font-weight="500"
            >
              {matchState().orange.name}
            </text>
          </g>
          <g data-name="details">
            <polygon class="cls-2" points="1192 108 766 108 767 106 1191 107 1192 108" />
            <polygon class="cls-2" points="1192 108 1191 107 1216 36 1192 108" />
          </g>
        </g>
      </g>
    </>
  )
}

const Center: Component<AnimatedSVGProps> = ({ setRef }) => {
  const gameState = useGameState()
  const matchState = useMatchState()

  return (
    <g ref={setRef} id="center">
      <g id="clock">
        <polygon class="cls-3" points="676 108 540 108 516 36 700 36 676 108" />
        <text
          x={607}
          y={76}
          dominant-baseline="middle"
          text-anchor="middle"
          font-family="NK57 Monospace NO"
          font-size="42px"
          font-weight="600"
          fill="#ffffff"
        >
          {GameService.getClockFromSeconds(gameState().timeRemaining, gameState().isOT)}
        </text>
      </g>
      <g id="orangescore">
        <polygon class="cls-4" points="766 108 674 108 698 36 790 36 766 108" />
        <text
          x={734}
          y={76}
          dominant-baseline="middle"
          text-anchor="middle"
          class="cls-2"
          font-family="NK57 Monospace SE"
          font-size="42px"
          font-weight="600"
        >
          {gameState().teams[1].score}
        </text>
      </g>
      <g id="bluescore">
        <polygon class="cls-4" points="450 108 542 108 518 36 426 36 450 108" />
        <text
          x={484}
          y={76}
          dominant-baseline="middle"
          text-anchor="middle"
          class="cls-7"
          font-family="NK57 Monospace SE"
          font-size="42px"
          font-weight="600"
        >
          {gameState().teams[0].score}
        </text>
      </g>
      <g id="title">
        <polygon class="cls-4" points="790 36 426 36 414 0 802 0 790 36" />
        <text
          x={608}
          y={19}
          dominant-baseline="middle"
          text-anchor="middle"
          font-family="Chivo"
          font-size="18px"
          font-style="italic"
          font-weight="500"
          fill="#ffffff"
        >
          {matchState().title}
        </text>
      </g>
      <g data-name="details">
        <polygon class="cls-7" points="447 108 450 108 414 0 447 108" />
        <polygon class="cls-2" points="769 108 766 108 802 0 769 108" />
        <polygon class="cls-7" points="572 36 426 36 425 35 572 36" />
        <polygon class="cls-2" points="790 36 644 36 791 35 790 36" />
        <polygon class="cls-7" points="542 108 450 108 449 106 542 108" />
        <polygon class="cls-2" points="766 108 674 108 767 106 766 108" />
      </g>
    </g>
  )
}

const Scorebug = () => {
  const matchState = useMatchState()

  let blueGamesRef: SVGSVGElement | null
  let orangeGamesRef: SVGSVGElement | null
  let gamesRef: SVGSVGElement | null
  let blueTeamRef: SVGSVGElement | null
  let orangeTeamRef: SVGSVGElement | null
  let centerRef: SVGSVGElement | null

  const inTl = gsap.timeline({ paused: true })
  const outTl = gsap.timeline({ paused: true })

  const setBlueGamesRef = (el: SVGSVGElement) => (blueGamesRef = el)
  const setOrangeGamesRef = (el: SVGSVGElement) => (orangeGamesRef = el)
  const setGamesRef = (el: SVGSVGElement) => (gamesRef = el)
  const setBlueTeamRef = (el: SVGSVGElement) => (blueTeamRef = el)
  const setOrangeTeamRef = (el: SVGSVGElement) => (orangeTeamRef = el)
  const setCenterRef = (el: SVGSVGElement) => (centerRef = el)

  const setInTl = () => {
    inTl.to(centerRef, { y: 0, duration: 0.9, ease: 'power1.out' })
    inTl.to(blueTeamRef, { x: 0, duration: 0.7, ease: 'power2.out' })
    inTl.to(orangeTeamRef, { x: 0, duration: 0.7, ease: 'power2.out' }, '<')
    inTl.to(gamesRef, { y: 0, duration: 0.3, ease: 'power2.out' }, '<')
    inTl.to(blueGamesRef, { x: 0, duration: 0.4, ease: 'power2.out' }, '>')
    inTl.to(orangeGamesRef, { x: 0, duration: 0.4, ease: 'power2.out' }, '<')
  }

  const setOutTl = () => {
    outTl.to(blueTeamRef, { x: 450, duration: 0.7, ease: 'power2.out' })
    outTl.to(orangeTeamRef, { x: -450, duration: 0.7, ease: 'power2.out' }, '<')
    outTl.to(blueGamesRef, { x: 164, duration: 0.4, ease: 'power2.inOut' }, '<')
    outTl.to(orangeGamesRef, { x: -164, duration: 0.4, ease: 'power2.inOut' }, '<')
    outTl.to(gamesRef, { y: -36, duration: 0.3, ease: 'power2.inOut' }, '>')
    outTl.to(centerRef, { y: -144, duration: 0.9, ease: 'power2.inOut' })
  }

  const enter = () => {
    outTl.pause()
    inTl.play()
  }

  const exit = () => {
    inTl.pause()
    outTl.play()
  }

  const initial = () => {
    gsap.set(blueTeamRef, { x: 450 })
    gsap.set(orangeTeamRef, { x: -450 })
    gsap.set(blueGamesRef, { x: 164 })
    gsap.set(orangeGamesRef, { x: -164 })
    gsap.set(gamesRef, { y: -36 })
    gsap.set(centerRef, { y: -144 })
  }

  onMount(() => {
    initial()
    setInTl()
    setOutTl()
    createEffect(() => (matchState().isGameInProgress ? enter() : exit()))
  })

  return (
    <div class="flex justify-center items-center absolute w-full h-[144px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1216 144"
        class="absolute w-[1216px] h-[136px] top-0"
        fill="#ffffff"
      >
        <BlueGames setRef={setBlueGamesRef} />
        <OrangeGames setRef={setOrangeGamesRef} />
        <Games setRef={setGamesRef} />

        <BlueTeam setRef={setBlueTeamRef} />
        <OrangeTeam setRef={setOrangeTeamRef} />

        <Center setRef={setCenterRef} />
      </svg>
    </div>
  )
}

export default Scorebug
