import { Col, Grid } from '@components/ui/grid'
import gsap from 'gsap'
import { Component, onMount } from 'solid-js'
import cloud9 from './assets/logos/cloud9.png'
import faze from './assets/logos/faze.png'
import fnatic from './assets/logos/fnatic.png'
import heroic from './assets/logos/heroic.png'
import navi from './assets/logos/navi.png'
import spacestation from './assets/logos/spacestation.png'
import tsm from './assets/logos/tsm.png'
import vitality from './assets/logos/vitality.png'
import tableBG from './assets/roundRobin.svg'

interface TeamData {
  id: number
  name: string
  pfp: string
  players: number
}

const teams: TeamData[] = [
  {
    id: 1,
    name: 'Cloud 9',
    pfp: cloud9,
    players: 27
  },
  {
    id: 2,
    name: 'Vitality',
    pfp: vitality,
    players: 22
  },
  {
    id: 3,
    name: 'Faze',
    pfp: faze,
    players: 18
  },
  {
    id: 4,
    name: 'Navi',
    pfp: navi,
    players: 17
  },
  {
    id: 5,
    name: 'Spacestation Gaming',
    pfp: spacestation,
    players: 10
  },
  {
    id: 6,
    name: 'TSM',
    pfp: tsm,
    players: 9
  },
  {
    id: 7,
    name: 'Heroic',
    pfp: heroic,
    players: 8
  },
  {
    id: 8,
    name: 'Fnatic',
    pfp: fnatic,
    players: 3
  }
  // {
  //   id: 9,
  //   name: "Equipo Exagerado I",
  //   pfp: wallpaperImage,
  //   players: 6
  // },
  // {
  //   id: 10,
  //   name: "Equipo Exagerado J",
  //   pfp: wallpaperImage,
  //   players: 5
  // },
  // {
  //   id: 11,
  //   name: "Equipo Exagerado K",
  //   pfp: wallpaperImage,
  //   players: 4
  // }
]

interface TeamComponentProps {
  team: TeamData
}

const TeamComponent: Component<TeamComponentProps> = props => {
  const { team } = props
  return (
    <>
      <div class="grid grid-cols-3 gap-2 font-[chivo]">
        {/* <div>{team.id}</div> */}
        <img src={team.pfp} class="w-[50px] h-[50px] mx-auto" />
        <div class="text-left">{team.name}</div>
        <div>{team.players}</div>
      </div>
    </>
  )
}

const LeaderComponent: Component<TeamComponentProps> = props => {
  const { team } = props
  return (
    <>
      <div class="grid grid-cols-3 gap-2 bg-white text-black font-[chivo]">
        {/* <div>{team.id}</div> */}
        <img src={team.pfp} class="w-[50px] h-[50px] mx-auto" />
        <div class="text-left">{team.name}</div>
        <div>{team.players}</div>
      </div>
    </>
  )
}

const RoundRobin: Component = () => {
  onMount(() => {
    setTimeout(() => {
      setTimeout(() => {}, 3000)
    }, 2000)
    enter()
  })

  const start = gsap.timeline({ paused: true, repeat: 0 })

  const animateInitDivs = () => {
    const initDivs = document.querySelectorAll('#init')
    gsap.fromTo(initDivs, { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.2 })
  }

  const prepareSlide = () => {
    const initDivs = document.querySelectorAll('#slide')
    initDivs.forEach((el, i) => {
      gsap.set(el, { y: 0 - el.clientHeight * i - el.clientHeight, opacity: 0 })
    })
  }

  const slideTeam = () => {
    const initDivs = document.querySelectorAll('#slide')
    initDivs.forEach((el, i) => {
      gsap.set(el, { y: 0 - el.clientHeight * i - el.clientHeight, opacity: 100 })
      gsap.to(el, { y: 0, duration: 1 * ((el.clientHeight * i) / 100), ease: 'linear' })
    })
  }

  const hideTeam = () => {
    const initDivs = document.querySelectorAll('#slide')
    initDivs.forEach((el, i) => {
      gsap.set(el, { y: 0 })
      gsap.to(el, {
        y: 0 - el.clientHeight * i - el.clientHeight,
        duration: 1 * ((el.clientHeight * i) / 150),
        ease: 'linear'
      })
    })
  }

  const enter = () => {
    prepareSlide()
    animateInitDivs()
    setTimeout(() => slideTeam(), 1000)
    setTimeout(() => hideTeam(), 15000)
  }

  return (
    <div class="w-[1920px] h-[1080px] font-[chivo]">
      <div class="w-[75vw] text-center z-10 mx-auto pt-[5vw]">
        <Col class="relative">
          <img
            src={tableBG}
            class="w-[60vw] h-auto object-cover absolute inset-0 z-0 mx-auto pt-[5vw]"
          />
          <div class="absolute inset-0 z-10">
            <div
              class="text-white text-center text-[2.5vw] text-nowrap px-[10vw] mx-auto leading-none"
              style={{ top: '50%', left: '50%', transform: 'translate(0%,-5%)' }}
            >
              <div
                id="init"
                class="pt-[8vw] text-[3vw] font-semibold text-left text-[color:#22b0ff]"
              >
                {'GRAN LIGA DE PRUEBA SPRINT 4'}
              </div>
              <Grid cols={2} id="init">
                <Col span={1}>
                  <div class="pt-[0vw] text-[2.5vw] text-left text-[color:#22b0ff]">
                    {'SEMANA 12'}
                  </div>
                </Col>
                <Col span={1}>
                  <div class="pt-[1vw] pr-[6vw] text-[1.5vw] font-semibold text-right text-[color:#22b0ff]">
                    {'PUNTOS'}
                  </div>
                </Col>
              </Grid>
              <div class="pb-[1vw] pt-[1vw] text-[1.5vw] font-semibold leading-[2vw]">
                {teams.map((team, index) => {
                  if (index > 0 && index < 10) {
                    return (
                      <div
                        id="slide"
                        class="relative bg-[#1a1a1aff]"
                        style={{ 'z-index': teams.length - index }}
                      >
                        <TeamComponent team={teams[index]} />
                      </div>
                    )
                  } else if (index === 0) {
                    return (
                      <div id="init" class="z-50 inset-0 relative">
                        <LeaderComponent team={teams[0]} />
                      </div>
                    )
                  }
                  // else {
                  //   return (
                  //     <div class="relative">
                  //       <TeamComponent team={teams[index]} />
                  //     </div>
                  //   );
                  // }
                })}
              </div>
            </div>
          </div>
        </Col>
      </div>
    </div>
  )
}

export { RoundRobin }
