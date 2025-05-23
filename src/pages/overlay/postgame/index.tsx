import { useSnapshot } from '@/contexts/snapshot'
import { DeltaBar } from '@components/ui/delta-bar'
import { Col, Grid } from '@components/ui/grid'
import { useMatchState } from '@contexts/match-state'
import { USPlayer } from '@models/ingame/events/UpdateState/USPlayer'
import gsap from 'gsap'
import { Component, createEffect, createSignal, onMount } from 'solid-js'
import blueLogoBlock from './assets/blueLogoBlock.svg'
import blueNameBlock from './assets/blueNameBlock.svg'
import blueScoreBlock from './assets/blueScoreBlock.svg'
import orangeLogoBlock from './assets/orangeLogoBlock.svg'
import orangeNameBlock from './assets/orangeNameBlock.svg'
import orangeScoreBlock from './assets/orangeScoreBlock.svg'

const Blue = '22b0ff'
const LightBlue = '36d0ff'
const Orange = 'ff8a15'
const LightOrange = 'ffbc00'

let ColorA = Blue
let ColorB = LightBlue

interface AnimatedSVGProps {
  setRef: (el: SVGSVGElement) => void
}

const LineAtoRight: Component<AnimatedSVGProps> = ({ setRef }) => {
  return (
    <svg ref={setRef} width="300" height="1080" style="position: absolute;">
      <g>
        <path
          style={`fill:#${ColorA};stroke-width:20;stroke-linecap:square;stroke-miterlimit:5.8;fill-opacity:1`}
          d="M 0,0 150,540 0,1080 H 150 L 300,540 150,0 Z"
          id="path1"
        />
      </g>
    </svg>
  )
}

const LineBtoRight: Component<AnimatedSVGProps> = ({ setRef }) => {
  return (
    <svg ref={setRef} width="300" height="1080" style="position: absolute;">
      <g>
        <path
          style={`fill:#${ColorB};stroke-width:20;stroke-linecap:square;stroke-miterlimit:5.8;fill-opacity:1`}
          d="M 0,0 150,540 0,1080 H 150 L 300,540 150,0 Z"
          id="path1"
        />
      </g>
    </svg>
  )
}

const LineAtoLeft: Component<AnimatedSVGProps> = ({ setRef }) => {
  return (
    <svg ref={setRef} width="300" height="1080" style="position: absolute;">
      <g transform="scale(-1 1) translate(-300 0)">
        <path
          style={`fill:#${ColorA};stroke-width:20;stroke-linecap:square;stroke-miterlimit:5.8;fill-opacity:1`}
          d="M 0,0 150,540 0,1080 H 150 L 300,540 150,0 Z"
          id="path1"
        />
      </g>
    </svg>
  )
}

const LineBtoLeft: Component<AnimatedSVGProps> = ({ setRef }) => {
  return (
    <svg ref={setRef} width="300" height="1080" style="position: absolute;">
      <g transform="scale(-1 1) translate(-300 0)">
        <path
          style={`fill:#${ColorB};stroke-width:20;stroke-linecap:square;stroke-miterlimit:5.8;fill-opacity:1`}
          d="M 0,0 150,540 0,1080 H 150 L 300,540 150,0 Z"
          id="path1"
        />
      </g>
    </svg>
  )
}

const PostGame: Component = () => {
  const stats = useSnapshot()
  const length = 20
  const durationSecs = 2.5
  const extraSpaceMultiplier = 300 * 5
  const [svgElementsAtoRight, setSvgElementsAtoRight] = createSignal<
    (SVGSVGElement | undefined)[]
  >([])
  const [svgElementsBtoRight, setSvgElementsBtoRight] = createSignal<
    (SVGSVGElement | undefined)[]
  >([])
  const [svgElementsAtoLeft, setSvgElementsAtoLeft] = createSignal<
    (SVGSVGElement | undefined)[]
  >([])
  const [svgElementsBtoLeft, setSvgElementsBtoLeft] = createSignal<
    (SVGSVGElement | undefined)[]
  >([])

  onMount(() => {
    enter()
  })

  const start = gsap.timeline({ paused: true, repeat: 0 })

  const setStart = () => {
    svgElementsAtoRight().forEach((el, i) => {
      gsap.set(el, { x: 960 + extraSpaceMultiplier - 300 * i })
      start.to(el, { x: -300 - 300 * i, duration: durationSecs, ease: 'sine.in' }, 0)
    })

    svgElementsBtoRight().forEach((el, i) => {
      gsap.set(el, { x: 810 + extraSpaceMultiplier - 300 * i })
      start.to(el, { x: -450 - 300 * i, duration: durationSecs, ease: 'sine.in' }, 0)
    })

    svgElementsAtoLeft().forEach((el, i) => {
      gsap.set(el, { x: -960 - extraSpaceMultiplier + 300 * i })
      start.to(el, { x: 300 + 300 * i, duration: durationSecs, ease: 'sine.in' }, 0)
    })

    svgElementsBtoLeft().forEach((el, i) => {
      gsap.set(el, { x: -810 - extraSpaceMultiplier + 300 * i })
      start.to(el, { x: 450 + 300 * i, duration: durationSecs, ease: 'sine.in' }, 0)
    })

    start.play()
  }

  const enter = () => {
    setStart()
  }

  {
    if (stats().winner === stats().teams[0].name) {
      ColorA = Blue
      ColorB = LightBlue
    } else {
      ColorA = Orange
      ColorB = LightOrange
    }
  }

  const [lightOrangeStar, setLightOrangeStar] = createSignal(`
<svg
   width="512"
   height="512"
   viewBox="0 0 512 512"
   version="1.1"
   id="svg1"
   xml:space="preserve"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg"><defs
     id="defs1" /><g
     id="layer1"><circle
       style="display:inline;fill:none;stroke:#ffffff;stroke-width:14.8249;stroke-linecap:square;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62542957;paint-order:normal"
       id="path2"
       cx="256"
       cy="255.99998"
       r="213.58755" /><ellipse
       style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:12;stroke-linecap:square;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62543;paint-order:normal"
       id="path3"
       cx="256"
       cy="255.99998"
       rx="23.999996"
       ry="24.000011" /><path
       style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:8.894;stroke-linecap:square;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62543;paint-order:normal"
       d="M 221.49334,181.55274 243.01122,80.447228 h 25.82145 l 21.51788,101.105512 z"
       id="path5" /><path
       style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:8.89449;stroke-linecap:square;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62543;paint-order:normal"
       d="m 337.72656,263.34004 76.80101,69.18779 -12.91072,22.36203 -98.31889,-31.91773 z"
       id="path5-2" /><path
       style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:8.89449;stroke-linecap:square;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62543;paint-order:normal"
       d="m 174.27348,263.34005 -76.801011,69.18779 12.910721,22.36203 98.31889,-31.91773 z"
       id="path5-2-0" /><path
       style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62543;paint-order:markers fill stroke"
       d="m 210.68913,264.48076 c 0,0 5.66987,-19.82051 10.66987,-28.48076 5,-8.66026 19.33013,-23.48076 19.33013,-23.48076 l -51.96153,-30 c 0,0 -14.33012,14.8205 -19.33012,23.48076 -5,8.66025 -10.66988,28.48076 -10.66988,28.48076 z"
       id="path7" /><path
       style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62543;paint-order:markers fill stroke"
       d="m 271.31092,212.51923 c 0,0 14.33012,14.82051 19.33011,23.48077 5.00001,8.66025 10.66987,28.48075 10.66987,28.48075 l 51.96153,-30 c 0,0 -5.66986,-19.8205 -10.66986,-28.48076 -5,-8.66025 -19.33013,-23.48076 -19.33013,-23.48076 z"
       id="path7-3" /><path
       style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62543;paint-order:markers fill stroke"
       d="m 286,291.00002 c 0,0 -20,5 -30,4.99998 -10,2e-5 -29.99999,-5 -29.99999,-5 v 60.00001 c 0,0 19.99999,5 29.99999,5.00001 10,-1e-5 30,-5.00001 30,-5.00001 z"
       id="path7-3-4" /></g></svg>`)
  const [lightBlueStar, setLightBlueStar] = createSignal(`
<svg
   width="512"
   height="512"
   viewBox="0 0 512 512"
   version="1.1"
   id="svg1"
   xml:space="preserve"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg"><defs
     id="defs1" /><g
     id="layer1"><circle
       style="display:inline;fill:none;stroke:#ffffff;stroke-width:14.8249;stroke-linecap:square;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62542957;paint-order:normal"
       id="path2"
       cx="256"
       cy="255.99998"
       r="213.58755" /><ellipse
       style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:12;stroke-linecap:square;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62543;paint-order:normal"
       id="path3"
       cx="256"
       cy="255.99998"
       rx="23.999996"
       ry="24.000011" /><path
       style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:8.894;stroke-linecap:square;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62543;paint-order:normal"
       d="M 221.49334,181.55274 243.01122,80.447228 h 25.82145 l 21.51788,101.105512 z"
       id="path5" /><path
       style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:8.89449;stroke-linecap:square;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62543;paint-order:normal"
       d="m 337.72656,263.34004 76.80101,69.18779 -12.91072,22.36203 -98.31889,-31.91773 z"
       id="path5-2" /><path
       style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:8.89449;stroke-linecap:square;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62543;paint-order:normal"
       d="m 174.27348,263.34005 -76.801011,69.18779 12.910721,22.36203 98.31889,-31.91773 z"
       id="path5-2-0" /><path
       style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62543;paint-order:markers fill stroke"
       d="m 210.68913,264.48076 c 0,0 5.66987,-19.82051 10.66987,-28.48076 5,-8.66026 19.33013,-23.48076 19.33013,-23.48076 l -51.96153,-30 c 0,0 -14.33012,14.8205 -19.33012,23.48076 -5,8.66025 -10.66988,28.48076 -10.66988,28.48076 z"
       id="path7" /><path
       style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62543;paint-order:markers fill stroke"
       d="m 271.31092,212.51923 c 0,0 14.33012,14.82051 19.33011,23.48077 5.00001,8.66025 10.66987,28.48075 10.66987,28.48075 l 51.96153,-30 c 0,0 -5.66986,-19.8205 -10.66986,-28.48076 -5,-8.66025 -19.33013,-23.48076 -19.33013,-23.48076 z"
       id="path7-3" /><path
       style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62543;paint-order:markers fill stroke"
       d="m 286,291.00002 c 0,0 -20,5 -30,4.99998 -10,2e-5 -29.99999,-5 -29.99999,-5 v 60.00001 c 0,0 19.99999,5 29.99999,5.00001 10,-1e-5 30,-5.00001 30,-5.00001 z"
       id="path7-3-4" /></g></svg>
    `)
  const [orangeStar, setOrangeStar] = createSignal(`
<svg
   width="512"
   height="512"
   viewBox="0 0 512 512"
   version="1.1"
   id="svg1"
   xml:space="preserve"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg"><defs
     id="defs1" /><g
     id="layer1"><circle
       style="display:inline;fill:none;stroke:#ffffff;stroke-width:14.8249;stroke-linecap:square;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62542957;paint-order:normal"
       id="path2"
       cx="256"
       cy="255.99998"
       r="213.58755" /><ellipse
       style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:12;stroke-linecap:square;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62543;paint-order:normal"
       id="path3"
       cx="256"
       cy="255.99998"
       rx="23.999996"
       ry="24.000011" /><path
       style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:8.894;stroke-linecap:square;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62543;paint-order:normal"
       d="M 221.49334,181.55274 243.01122,80.447228 h 25.82145 l 21.51788,101.105512 z"
       id="path5" /><path
       style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:8.89449;stroke-linecap:square;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62543;paint-order:normal"
       d="m 337.72656,263.34004 76.80101,69.18779 -12.91072,22.36203 -98.31889,-31.91773 z"
       id="path5-2" /><path
       style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:8.89449;stroke-linecap:square;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62543;paint-order:normal"
       d="m 174.27348,263.34005 -76.801011,69.18779 12.910721,22.36203 98.31889,-31.91773 z"
       id="path5-2-0" /><path
       style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62543;paint-order:markers fill stroke"
       d="m 210.68913,264.48076 c 0,0 5.66987,-19.82051 10.66987,-28.48076 5,-8.66026 19.33013,-23.48076 19.33013,-23.48076 l -51.96153,-30 c 0,0 -14.33012,14.8205 -19.33012,23.48076 -5,8.66025 -10.66988,28.48076 -10.66988,28.48076 z"
       id="path7" /><path
       style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62543;paint-order:markers fill stroke"
       d="m 271.31092,212.51923 c 0,0 14.33012,14.82051 19.33011,23.48077 5.00001,8.66025 10.66987,28.48075 10.66987,28.48075 l 51.96153,-30 c 0,0 -5.66986,-19.8205 -10.66986,-28.48076 -5,-8.66025 -19.33013,-23.48076 -19.33013,-23.48076 z"
       id="path7-3" /><path
       style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62543;paint-order:markers fill stroke"
       d="m 286,291.00002 c 0,0 -20,5 -30,4.99998 -10,2e-5 -29.99999,-5 -29.99999,-5 v 60.00001 c 0,0 19.99999,5 29.99999,5.00001 10,-1e-5 30,-5.00001 30,-5.00001 z"
       id="path7-3-4" /></g></svg>`)
  const [blueStar, setBlueStar] = createSignal(`
<svg
   width="512"
   height="512"
   viewBox="0 0 512 512"
   version="1.1"
   id="svg1"
   xml:space="preserve"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg"><defs
     id="defs1" /><g
     id="layer1"><circle
       style="display:inline;fill:none;stroke:#ffffff;stroke-width:14.8249;stroke-linecap:square;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62542957;paint-order:normal"
       id="path2"
       cx="256"
       cy="255.99998"
       r="213.58755" /><ellipse
       style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:12;stroke-linecap:square;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62543;paint-order:normal"
       id="path3"
       cx="256"
       cy="255.99998"
       rx="23.999996"
       ry="24.000011" /><path
       style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:8.894;stroke-linecap:square;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62543;paint-order:normal"
       d="M 221.49334,181.55274 243.01122,80.447228 h 25.82145 l 21.51788,101.105512 z"
       id="path5" /><path
       style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:8.89449;stroke-linecap:square;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62543;paint-order:normal"
       d="m 337.72656,263.34004 76.80101,69.18779 -12.91072,22.36203 -98.31889,-31.91773 z"
       id="path5-2" /><path
       style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:8.89449;stroke-linecap:square;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62543;paint-order:normal"
       d="m 174.27348,263.34005 -76.801011,69.18779 12.910721,22.36203 98.31889,-31.91773 z"
       id="path5-2-0" /><path
       style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62543;paint-order:markers fill stroke"
       d="m 210.68913,264.48076 c 0,0 5.66987,-19.82051 10.66987,-28.48076 5,-8.66026 19.33013,-23.48076 19.33013,-23.48076 l -51.96153,-30 c 0,0 -14.33012,14.8205 -19.33012,23.48076 -5,8.66025 -10.66988,28.48076 -10.66988,28.48076 z"
       id="path7" /><path
       style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62543;paint-order:markers fill stroke"
       d="m 271.31092,212.51923 c 0,0 14.33012,14.82051 19.33011,23.48077 5.00001,8.66025 10.66987,28.48075 10.66987,28.48075 l 51.96153,-30 c 0,0 -5.66986,-19.8205 -10.66986,-28.48076 -5,-8.66025 -19.33013,-23.48076 -19.33013,-23.48076 z"
       id="path7-3" /><path
       style="fill:none;fill-opacity:1;stroke:#ffffff;stroke-width:5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:5.8;stroke-dasharray:none;stroke-opacity:0.62543;paint-order:markers fill stroke"
       d="m 286,291.00002 c 0,0 -20,5 -30,4.99998 -10,2e-5 -29.99999,-5 -29.99999,-5 v 60.00001 c 0,0 19.99999,5 29.99999,5.00001 10,-1e-5 30,-5.00001 30,-5.00001 z"
       id="path7-3-4" /></g></svg>`)

  onMount(() => {
    const numStars = 4
    const container = document.getElementById('starry-sky')

    if (!container) return

    const stars = [lightOrangeStar, lightBlueStar, orangeStar, blueStar]

    for (let i = 0; i < numStars; i++) {
      for (let j = 0; j < 2; j++) {
        const star = document.createElement('div')
        const randomStar = stars[Math.floor(Math.random() * stars.length)]
        star.innerHTML = randomStar()
        star.style.position = 'absolute'
        star.style.pointerEvents = 'none'

        const x = 450 * i + 25
        const y = 450 * j + 50
        const opacity = Math.random() / 4

        star.style.left = `${x}px`
        star.style.top = `${y}px`
        star.style.opacity = opacity.toString()

        container.appendChild(star)

        const flicker = () => {
          const fadeInDuration = Math.random() * 10
          const fadeOutDuration = Math.random() * 10
          const delay = Math.random() * 5

          gsap.to(star, {
            opacity: 0.25,
            duration: fadeInDuration,
            ease: 'power1.inOut',
            onComplete: () => {
              gsap.to(star, {
                opacity: 0,
                duration: fadeOutDuration,
                ease: 'power1.inOut',
                onComplete: () => {
                  setTimeout(flicker, delay * 1000)
                }
              })
            }
          })
        }

        flicker()
      }
    }
  })

  let players0: USPlayer[]
  let players1: USPlayer[]
  let scoreTotal0: number = 0
  let scoreTotal1: number = 0
  let goalsTotal0: number = 0
  let goalsTotal1: number = 0
  let assistsTotal0: number = 0
  let assistsTotal1: number = 0
  let shotsTotal0: number = 0
  let shotsTotal1: number = 0
  let savesTotal0: number = 0
  let savesTotal1: number = 0
  let gameWins0: number
  let gameWins1: number
  let firstTo: number

  const matchState = useMatchState()

  const snapState = () => stats()
  createEffect(() => {
    players0 = snapState().players.filter(player => player.team === 0)
    players1 = snapState().players.filter(player => player.team === 1)
  })
  {
    players0 = snapState().players.filter(player => player.team === 0)
    players1 = snapState().players.filter(player => player.team === 1)
    players0.sort((a: USPlayer, b: USPlayer) => a.score - b.score)
    players1.sort((a: USPlayer, b: USPlayer) => b.score - a.score)

    players0.map(player => {
      scoreTotal0 = scoreTotal0 + player.score
      goalsTotal0 = goalsTotal0 + player.goals
      assistsTotal0 = assistsTotal0 + player.assists
      shotsTotal0 = shotsTotal0 + player.shots
      savesTotal0 = savesTotal0 + player.saves
    })

    players1.map(player => {
      scoreTotal1 = scoreTotal1 + player.score
      goalsTotal1 = goalsTotal1 + player.goals
      assistsTotal1 = assistsTotal1 + player.assists
      shotsTotal1 = shotsTotal1 + player.shots
      savesTotal1 = savesTotal1 + player.saves
    })
    gameWins0 = matchState().blue.wins
    gameWins1 = matchState().orange.wins
    firstTo = (matchState().bestOf + 1) / 2
  }
  return (
    <>
      <div class="absolute w-[1920px] h-[1080px] z-20">
        <div class="overflow-hidden flex flex-row absolute w-[960px] h-[1080px]">
          {Array.from({ length }, (_, index) => {
            if (index % 2 === 0) {
              return (
                <LineAtoRight
                  setRef={el => setSvgElementsAtoRight(prev => [...prev, el])}
                />
              )
            } else {
              return (
                <LineBtoRight
                  setRef={el => setSvgElementsBtoRight(prev => [...prev, el])}
                />
              )
            }
          })}
        </div>
        <div class="overflow-hidden flex flex-row-reverse absolute w-[960px] h-[1080px] translate-x-[960px]">
          {Array.from({ length }, (_, index) => {
            if (index % 2 === 0) {
              return (
                <LineAtoLeft
                  setRef={el => setSvgElementsAtoLeft(prev => [...prev, el])}
                />
              )
            } else {
              return (
                <LineBtoLeft
                  setRef={el => setSvgElementsBtoLeft(prev => [...prev, el])}
                />
              )
            }
          })}
        </div>
      </div>
      <div
        id="starry-sky"
        class="fixed top-0 left-0 w-[1920px] h-[1080px] overflow-hidden -z-50 bg-black"
      ></div>
      <div class="w-[1920px] h-[1080px]">
        <div class="w-[1728px] text-center z-10 mx-auto font-[chivo]">
          <div class="text-gray-300 text-[25px] pt-[30px] font-bold opacity-50">
            {matchState().title}
          </div>
          <Grid cols={7} class="pt-[50px]">
            {snapState().teams.map((team, index) => (
              <>
                {index === 1 ? (
                  <>
                    <Col></Col>
                    <Col class="relative">
                      <img
                        src={orangeScoreBlock}
                        class="w-[1000px] h-[100px] object-cover absolute inset-0 z-0"
                      />
                      <div class="absolute inset-0 z-10">
                        <div class="text-[color:#ff8a15] text-center text-[80px] font-bold top-[50%] left-[50%] translate-x-[-75%] translate-y-[-10%]">
                          {snapState().score.orange}
                        </div>
                      </div>
                    </Col>
                    <Col class="relative">
                      <img
                        src={orangeNameBlock}
                        class="w-[1000px] h-[100px] object-cover absolute inset-0 z-0"
                      />
                      <div class="absolute inset-0 z-10">
                        <div class="text-white text-[50px] whitespace-nowrap text-left translate-x-[-200px] translate-y-[10px]">
                          {matchState().orange.name}
                        </div>
                      </div>
                    </Col>
                    <Col class="relative">
                      <img
                        src={orangeLogoBlock}
                        class="w-[1000px] h-[100px] object-cover absolute inset-0 z-0"
                      />
                      <div class="w-[100px] h-[100px] absolute inset-0 z-10 flex justify-center items-center">
                        <div class="translate-x-[90px]">
                          <img
                            src={matchState().orange.logoUrl}
                            class="w-fit h-fit scale-[70%]"
                          />
                        </div>
                      </div>
                    </Col>
                  </>
                ) : (
                  <>
                    <Col class="relative">
                      <img
                        src={blueLogoBlock}
                        class="w-[1000px] h-[100px] object-cover absolute inset-0 z-0"
                      />
                      <div class="w-[100px] h-[100px] absolute inset-0 z-10 flex justify-center items-center">
                        <div class="translate-x-[50px]">
                          <img
                            src={matchState().blue.logoUrl}
                            class="w-fit h-fit scale-[70%]"
                          />
                        </div>
                      </div>
                    </Col>
                    <Col class="relative">
                      <img
                        src={blueNameBlock}
                        class="w-[1000px] h-[100px] object-cover absolute inset-0 z-0"
                      />
                      <div class="absolute inset-0 z-10">
                        <div class="text-white text-[50px] flex flex-row-reverse whitespace-nowrap text-right translate-x-[200px] translate-y-[10px]">
                          {matchState().blue.name}
                        </div>
                      </div>
                    </Col>
                    <Col class="relative">
                      <img
                        src={blueScoreBlock}
                        class="w-[1000px] h-[100px] object-cover absolute inset-0 z-0"
                      />
                      <div class="absolute inset-0 z-10">
                        <div class="text-[color:#22b0ff] text-center text-[80px] font-bold top-[50%] left-[50%] translate-x-[75%] translate-y-[-10%]">
                          {snapState().score.blue}
                        </div>
                      </div>
                    </Col>
                  </>
                )}
              </>
            ))}
          </Grid>
          <div class="relative pt-[80px] mx-auto">
            <div class="text-white text-center text-[30px] text-nowrap translate-y-[-125px]">
              {'JUEGO '}
              {matchState().gameNumber}
            </div>
            {gameWins0 < firstTo && gameWins1 < firstTo ? (
              gameWins0 > gameWins1 ? (
                <div class="text-white text-center text-[30px] text-nowrap translate-y-[-15px] uppercase mt-[-10px]">
                  {matchState().blue.name +
                    ' lidera (' +
                    gameWins0 +
                    '-' +
                    gameWins1 +
                    ')'}
                </div>
              ) : gameWins0 === gameWins1 ? (
                <div class="text-white text-center text-[30px] text-nowrap translate-y-[-15px] uppercase mt-[-10px]">
                  {'Empatados (' + gameWins0 + '-' + gameWins1 + ')'}
                </div>
              ) : (
                <div class="text-white text-center text-[30px] text-nowrap translate-y-[-15px] uppercase mt-[-10px]">
                  {matchState().orange.name +
                    ' lidera (' +
                    gameWins0 +
                    '-' +
                    gameWins1 +
                    ')'}
                </div>
              )
            ) : gameWins0 > gameWins1 ? (
              <div class="text-white text-center text-[30px] text-nowrap translate-y-[-15px] uppercase mt-[-10px]">
                {matchState().blue.name + ' gana (' + gameWins0 + '-' + gameWins1 + ')'}
              </div>
            ) : (
              <div class="text-white text-center text-[30px] text-nowrap translate-y-[-15px] uppercase mt-[-10px]">
                {matchState().orange.name + ' gana (' + gameWins0 + '-' + gameWins1 + ')'}
              </div>
            )}
          </div>
          <Grid cols={7} class="pt-[30px]">
            {Array.from({ length: 3 }, (_, index) => {
              if (index === 0) {
                if (snapState().winner === snapState().teams[0].name) {
                  return players0.map((player, playerIndex) => {
                    if (playerIndex === players0.length - 1) {
                      return (
                        <Col class="flex justify-center items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            stroke-Width="1.5"
                            stroke="#36d0ff"
                            viewBox="0 0 24 24"
                            fill="#22b0ff"
                            class="size-[50px]"
                          >
                            <path
                              stroke-Linecap="miter"
                              stroke-Linejoin="miter"
                              fill-Rule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                              clip-Rule="evenodd"
                            />
                          </svg>
                        </Col>
                      )
                    } else {
                      return (
                        <Col class="flex justify-center items-center">
                          <div class="text-transparent size-[50px]"></div>
                        </Col>
                      )
                    }
                  })
                } else {
                  return players0.map((player, playerIndex) => (
                    <Col class="flex justify-center items-center">
                      <div class="text-transparent size-[50px]"></div>
                    </Col>
                  ))
                }
              } else if (index === 2) {
                if (snapState().winner === snapState().teams[1].name) {
                  return players1.map((player, playerIndex) => {
                    if (playerIndex === 0) {
                      return (
                        <Col class="flex justify-center items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            stroke-Width="1.5"
                            stroke="#ffbc00"
                            viewBox="0 0 24 24"
                            fill="#ff8a15"
                            class="size-[50px]"
                          >
                            <path
                              stroke-Linecap="miter"
                              stroke-Linejoin="miter"
                              fill-Rule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                              clip-Rule="evenodd"
                            />
                          </svg>
                        </Col>
                      )
                    } else {
                      return (
                        <Col class="flex justify-center items-center">
                          <div class="text-transparent size-[50px]"></div>
                        </Col>
                      )
                    }
                  })
                } else {
                  return players1.map((player, playerIndex) => (
                    <Col class="flex justify-center items-center">
                      <div class="text-transparent size-[50px]"></div>
                    </Col>
                  ))
                }
              } else if (index === 1) {
                return (
                  <Col class="flex justify-center items-center">
                    <div class="text-transparent size-[50px]"></div>
                  </Col>
                )
              }
            })}
          </Grid>
          <Grid cols={7} class="pt-[0px] text-[35px] font-semibold">
            {Array.from({ length: 3 }, (_, index) => {
              if (index === 0) {
                if (players0?.length > 0) {
                  return players0.map(player => (
                    <Col span={1} class="pt-[10px]">
                      <div class="pt-[25px] pb-[25px] bg-gradient-to-b from-transparent from-0% via-transparent via-90% to-[#22b0ff] to-90%">
                        {player.name}
                      </div>
                      <div class="pt-[11px]">{player.score}</div>
                      <div class="pt-[59px]">{player.goals}</div>
                      <div class="pt-[60px]">{player.assists}</div>
                      <div class="pt-[59px]">{player.shots}</div>
                      <div class="pt-[60px]">{player.saves}</div>
                    </Col>
                  ))
                } else {
                  return Array.from({ length: 3 }, (_, i) => (
                    <Col span={1} class="pt-[10px]">
                      <div class="pt-[25px] pb-[25px] bg-gradient-to-b from-transparent from-0% via-transparent via-90% to-[#22b0ff] to-90%">
                        {'Player B ' + i}
                      </div>
                      <div class="pt-[11px]">0</div>
                      <div class="pt-[59px]">0</div>
                      <div class="pt-[60px]">0</div>
                      <div class="pt-[59px]">0</div>
                      <div class="pt-[60px]">0</div>
                    </Col>
                  ))
                }
              } else if (index === 1) {
                return (
                  <Col span={1} class="pt-[10px]">
                    <div class="pt-[25px] text-transparent">Jugadores</div>
                    <div class="pt-[25px] leading-[75px]">
                      Puntos
                      <DeltaBar
                        class="h-3"
                        value={
                          ((scoreTotal1 / (scoreTotal0 + scoreTotal1)) * 100 - 50) * 2
                        }
                        isIncreasePositive={true}
                      />
                    </div>
                    <div class="pt-[25px] leading-[75px]">
                      Goles
                      <DeltaBar
                        class="h-3"
                        value={
                          ((goalsTotal1 / (goalsTotal0 + goalsTotal1)) * 100 - 50) * 2
                        }
                        isIncreasePositive={true}
                      />
                    </div>
                    <div class="pt-[25px] leading-[75px]">
                      Asistencias
                      <DeltaBar
                        class="h-3"
                        value={
                          ((assistsTotal1 / (assistsTotal0 + assistsTotal1)) * 100 - 50) *
                          2
                        }
                        isIncreasePositive={true}
                      />
                    </div>
                    <div class="pt-[25px] leading-[75px]">
                      Tiros
                      <DeltaBar
                        class="h-3"
                        value={
                          ((shotsTotal1 / (shotsTotal0 + shotsTotal1)) * 100 - 50) * 2
                        }
                        isIncreasePositive={true}
                      />
                    </div>
                    <div class="pt-[25px] leading-[75px]">
                      Salvadas
                      <DeltaBar
                        class="h-3"
                        value={
                          ((savesTotal1 / (savesTotal0 + savesTotal1)) * 100 - 50) * 2
                        }
                        isIncreasePositive={true}
                      />
                    </div>
                  </Col>
                )
              } else {
                if (players1?.length > 0) {
                  return players1.map(player => (
                    <Col span={1} class="pt-[10px]">
                      <div class="pt-[25px] pb-[25px] bg-gradient-to-b from-transparent from-0% via-transparent via-90% to-[#ff8a15] to-90%">
                        {player.name}
                      </div>
                      <div class="pt-[11px]">{player.score}</div>
                      <div class="pt-[59px]">{player.goals}</div>
                      <div class="pt-[60px]">{player.assists}</div>
                      <div class="pt-[59px]">{player.shots}</div>
                      <div class="pt-[60px]">{player.saves}</div>
                    </Col>
                  ))
                } else {
                  return Array.from({ length: 3 }, (_, i) => (
                    <Col span={1} class="pt-[10px]">
                      <div class="pt-[25px] pb-[25px] bg-gradient-to-b from-transparent from-0% via-transparent via-90% to-[#ff8a15] to-90%">
                        {'Player O ' + i}
                      </div>
                      <div class="pt-[11px]">0</div>
                      <div class="pt-[59px]">0</div>
                      <div class="pt-[60px]">0</div>
                      <div class="pt-[59px]">0</div>
                      <div class="pt-[60px]">0</div>
                    </Col>
                  ))
                }
              }
            })}
          </Grid>
        </div>
      </div>
    </>
  )
}

export { PostGame }
