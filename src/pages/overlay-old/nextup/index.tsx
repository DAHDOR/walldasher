import { useMatchState } from '@contexts/match-state'
import { Component } from 'solid-js'
import logoNextGame from './assets/logoNextGame.svg'
import blueNextGame from './assets/nextGameBlue.svg'
import orangeNextGame from './assets/nextGameOrange.svg'

const matchState = useMatchState()

const NextGameComponent: Component<{}> = props => {
  return (
    <>
      <div class="relative flex">
        <div class="w-[100px] h-[100px] relative flex justify-center items-center">
          <img
            src={logoNextGame}
            class="w-full h-full object-cover absolute inset-0 z-0"
          ></img>
          <img src={matchState().blue.logo} class="w-fit h-fit z-10 text-[50px]"></img>
        </div>
        <div class="w-[200px] h-[100px] relative flex justify-center items-center">
          <img
            src={blueNextGame}
            class="w-full h-full object-cover absolute inset-0 z-0"
          />
          <div class="w-fit h-fit z-10 text-[25px] text-center">{'Team A'}</div>
        </div>
        <div class="w-[50px] h-[100px]"></div>
        <div class="w-[200px] h-[100px] relative flex justify-center items-center">
          <img
            src={orangeNextGame}
            class="w-full h-full object-cover absolute inset-0 z-0"
          />
          <div class="w-fit h-fit z-10 text-[25px] text-center">{'Team B'}</div>
        </div>
        <div class="w-[100px] h-[100px] relative flex justify-center items-center">
          <img
            src={logoNextGame}
            class="w-full h-full object-cover absolute inset-0 z-0"
          ></img>
          <img src={matchState().orange.logo} class="w-fit h-fit z-10 text-[50px]"></img>
        </div>
      </div>
    </>
  )
}

const NextUp = () => {
  return (
    <div class="w-[1920px] h-[1080px] bg-red-900 flex flex-col items-center justify-center space-y-[25px]">
      {Array.from({ length: 4 }, (_, i) => {
        return <NextGameComponent />
      })}
    </div>
  )
}

export { NextUp }
