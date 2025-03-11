import { Match, Team } from "@models/db"
import { Component, createEffect, onMount, createSignal, For } from 'solid-js'
import { getPhases } from '@lib/start'
import { useMatchState } from '@/contexts/matchState'
import bluePhase from './assets/phaseBlue.svg'
import orangePhase from './assets/phaseOrange.svg'
import blueScore from './assets/blueScorePhase.svg'
import orangeScore from './assets/orangeScorePhase.svg'
import logoPhase from './assets/logoPhase.svg'

const matchState = useMatchState()

const PhaseComponent: Component<{ }> = (props) => {
  return (
    <div class='m-[10px]'>
      <div class='relative flex'>
        <div class="w-[100px] h-[100px] relative flex justify-center items-center">
          <img src={logoPhase} class="w-full h-full object-cover absolute inset-0 z-0"></img>
          <img src={matchState().blue.logo_url} class="w-fit h-fit z-10 text-[50px]"></img>
        </div>
        <div class="w-[200px] h-[100px] relative flex justify-center items-center">
          <img src={bluePhase} class="w-full h-full object-cover absolute inset-0 z-0"/>
          <div class='w-fit h-fit z-10 text-[25px] text-center'>{'Team A'}</div>
        </div>
        <div class="w-[100px] h-[100px] relative flex justify-center items-center">
          <img src={blueScore} class="w-full h-full object-cover absolute inset-0 z-0"></img>
          <div class="w-fit h-fit z-10 text-[50px]">
            {'5'}
          </div>
        </div>
      </div>
      <div class="w-[200px] h-[50px]"></div>
      <div class='relative flex'>
        <div class="w-[100px] h-[100px] relative flex justify-center items-center">
          <img src={logoPhase} class="w-full h-full object-cover absolute inset-0 z-0"></img>
          <img src={matchState().orange.logo_url} class="w-fit h-fit z-10 text-[50px]"></img>
        </div>
        <div class="w-[200px] h-[100px] relative flex justify-center items-center">
          <img src={orangePhase} class="w-full h-full object-cover absolute inset-0 z-0"/>
          <div class='w-fit h-fit z-10 text-[25px] text-center'>{'Team B'}</div>
        </div>
        <div class="w-[100px] h-[100px] relative flex justify-center items-center">
          <img src={orangeScore} class="w-full h-full object-cover absolute inset-0 z-0"></img>
          <div class="w-fit h-fit z-10 text-[50px]">
            {'3'}
          </div>
        </div>
      </div>
    </div>
  )
}

const Phase: Component = () => {
  const matchNumber = 4
  return (
    <div class='w-[1920px] h-[1080px] flex bg-red-600'>
      {Array.from({ length: matchNumber }, (_, i) => {
        return(
          <>
            <div class="flex text-[50px] -rotate-90 justify-center items-center text-nowrap">
              {'Phase ' + i}
            </div>
            <div class='my-auto'>
              {Array.from({ length: (matchNumber/(2**i))}, (_, i) => {
                return(
                  <PhaseComponent/>
                )
              })}
            </div>
          </>
        )
      })}
    </div>
  )
}

export default Phase;