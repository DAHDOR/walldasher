import { Match, Team } from "@models/db"
import { Component, createEffect, onMount, createSignal, For } from 'solid-js'
import { getPhases } from '@lib/start'
import { useMatchState } from '@/contexts/matchState'
import bluePhase from './assets/phaseBlue.svg'
import orangePhase from './assets/phaseOrange.svg'
import blueScore from './assets/blueScorePhase.svg'
import orangeScore from './assets/orangeScorePhase.svg'
import logoPhase from './assets/logoPhase.svg'
import bottomPhase from './assets/bottomBracketPhase.svg'
import topPhase from './assets/upperBracketPhase.svg'
import finalBackground from './assets/finalBracketPhase.svg'

const matchState = useMatchState()
const playOffMatches = 8

const TransparentPhaseComponent: Component<{}> = (props) => {
  const normalHeight = 100 * 4/playOffMatches
  const doubleHeight = 200 * 4/playOffMatches
  const betweenTeams = 10 * 4/playOffMatches
  const betweenMatch = 25 * 4/playOffMatches
  const normalWidth = normalHeight
  const doubleWidth = doubleHeight
  const letterSize = normalHeight/4
  const pointSize = normalHeight/1.5
  return (
    <div class='' style={{'--nw': `${normalWidth}px`,'--dw': `${doubleWidth}px`,'--bt': `${betweenTeams}px`,'--bm': `${betweenMatch}px`,'--nh': `${normalHeight}px`,'--dh': `${doubleHeight}px`,'--ls': `${letterSize}px`,'--ps': `${pointSize}px`}}>
      <div class="h-[var(--bm)]"></div>
      <div class="relative flex h-[var(--nh)]"></div>
      <div class="h-[var(--bt)]"></div>
      <div class='relative flex h-[var(--nh)]'></div>
      <div class="h-[var(--bm)]"></div>
    </div>
  )
}

const EmptyPhaseComponent: Component<{}> = (props) => {
  const normalHeight = 100 * 4/playOffMatches
  const doubleHeight = 200 * 4/playOffMatches
  const betweenTeams = 10 * 4/playOffMatches
  const betweenMatch = 25 * 4/playOffMatches
  const normalWidth = normalHeight
  const doubleWidth = doubleHeight
  const letterSize = normalHeight/4
  const pointSize = normalHeight/1.5
  return (
    <div class='bg-[#1a1a1aff]' style={{'--nw': `${normalWidth}px`,'--dw': `${doubleWidth}px`,'--bt': `${betweenTeams}px`,'--bm': `${betweenMatch}px`,'--nh': `${normalHeight}px`,'--dh': `${doubleHeight}px`,'--ls': `${letterSize}px`,'--ps': `${pointSize}px`}}>
      <div class="h-[var(--bm)]"></div>
      <div class="relative flex h-[var(--nh)]"></div>
      <div class="h-[var(--bt)]"></div>
      <div class='relative flex h-[var(--nh)]'></div>
      <div class="h-[var(--bm)]"></div>
    </div>
  )
}

const PhaseComponent: Component<{}> = (props) => {
  const normalHeight = 100 * 4/playOffMatches
  const doubleHeight = 200 * 4/playOffMatches
  const betweenTeams = 10 * 4/playOffMatches
  const betweenMatch = 25 * 4/playOffMatches
  const normalWidth = normalHeight
  const doubleWidth = doubleHeight
  const letterSize = normalHeight/4
  const pointSize = normalHeight/1.5
  return (
    <div style={{'--nw': `${normalWidth}px`,'--dw': `${doubleWidth}px`,'--bt': `${betweenTeams}px`,'--bm': `${betweenMatch}px`,'--nh': `${normalHeight}px`,'--dh': `${doubleHeight}px`,'--ls': `${letterSize}px`,'--ps': `${pointSize}px`}}>
      <div class="h-[var(--bm)]"></div>
      <div class="relative flex">
        <div class="w-[var(--nw)] h-[var(--nh)] relative flex justify-center items-center">
          <img src={logoPhase} class="w-fit h-fit object-cover absolute inset-0 z-0"></img>
          <img src={matchState().blue.logo_url} class="w-fit h-fit z-10 absolute"></img>
        </div>
        <div class="w-[var(--dw)] h-[var(--nh)] relative flex justify-center items-center">
          <img src={bluePhase} class="w-fit h-fit object-cover absolute inset-0 z-0"/>
          <div class='w-fit h-fit z-10 text-[length:--ls] text-center absolute'>{'Team A'}</div>
        </div>
        <div class="w-[var(--nw)] h-[var(--nh)] relative flex justify-center items-center">
          <img src={blueScore} class="w-fit h-fit object-cover absolute inset-0 z-0"></img>
          <div class="w-fit h-fit z-10 text-[length:--ps] absolute">
            {'5'}
          </div>
        </div>
      </div>
      <div class="h-[var(--bt)]"></div>
      <div class='relative flex'>
        <div class="w-[var(--nw)] h-[var(--nh)] relative flex justify-center items-center">
          <img src={logoPhase} class="w-fit h-fit object-cover absolute inset-0 z-0"></img>
          <img src={matchState().orange.logo_url} class="w-fit h-fit z-10 absolute"></img>
        </div>
        <div class="w-[var(--dw)] h-[var(--nh)] relative flex justify-center items-center">
          <img src={orangePhase} class="w-fit h-fit object-cover absolute inset-0 z-0"/>
          <div class='w-fit h-fit z-10 text-[length:--ls] text-center absolute'>{'Team B'}</div>
        </div>
        <div class="w-[var(--nw)] h-[var(--nh)] relative flex justify-center items-center">
          <img src={orangeScore} class="w-fit h-fit object-cover absolute inset-0 z-0"></img>
          <div class="w-fit h-fit z-10 text-[length:--ps] absolute">
            {'3'}
          </div>
        </div>
      </div>
      <div class="h-[var(--bm)]"></div>
    </div>
  )
}

const Phase: Component = () => {
  const matchHeight = 260 * 4/playOffMatches
  const matchWidth = 400 * 4/playOffMatches
  let phaseBackground = bottomPhase
  let lineCounter = 0
  return (
    <>
      <div class='w-[1920px] h-[1080px] flex absolute mx-auto justify-center z-0' style={{'--mw': `${matchWidth}px`,'--mh': `${matchHeight}px`}}>
        {Array.from({ length: Math.log2(playOffMatches*2) }, (_, i) => {
          return(
            <>
              <div class="w-[100px] flex text-[50px] -rotate-90 justify-center items-center text-nowrap"></div>
              <div class='my-auto'>
                {Array.from({ length: (playOffMatches/(2**i))}, (_, j) => {
                  if (j < playOffMatches/(2**i) && j != 0 && i != 0){
                    return(
                      <>
                        {Array.from({ length: (2**i)-1}, (_, k) => {
                          {(() => {
                            if (phaseBackground === topPhase) {
                              phaseBackground = bottomPhase;
                            } else {
                              phaseBackground = topPhase;
                            }
                            return null;
                          })()}
                          return (
                            <div class="w-[var(--mw)] h-[var(--mh)]"></div>
                          )
                        })}
                        <img src={phaseBackground} class="w-[var(--mw)] h-[var(--mh)]"/>
                      </>
                    )
                  } else {
                    if (phaseBackground === topPhase) {
                      phaseBackground = bottomPhase;
                    } else {
                      phaseBackground = topPhase;
                    }
                    if ((playOffMatches/(2**i)) === 1){
                      return <img src={finalBackground} class="w-[var(--mw)] h-[var(--mh)]"/>
                    } else {
                      return <img src={phaseBackground} class="w-[var(--mw)] h-[var(--mh)]"/>
                    }
                  }
                })}
              </div>
            </>      
          )
        })}
      </div>
      <div class='w-[1920px] h-[1080px] flex absolute mx-auto justify-center font-[chivo] uppercase z-10' style={{'--mw': `${matchWidth}px`,'--mh': `${matchHeight}px`}}>
        {Array.from({ length: Math.log2(playOffMatches*2) }, (_, i) => {
          return(
            <>
              {(() => {
                if (i === Math.log2(playOffMatches*2)-1) {
                  return (
                    <>
                      <div class="w-[100px] flex text-[50px] [writing-mode:vertical-lr] justify-center items-center text-nowrap">
                        {'Final'}
                      </div>
                      <div class="w-[100px] flex text-[50px] ml-[-100px] [writing-mode:vertical-lr] justify-center items-center text-nowrap">
                        {(() => {
                          lineCounter = 0
                          return null
                        })()}
                        {Array.from({ length: (playOffMatches/(2**(i-1)))}, (_, j) => {
                          if (j < playOffMatches/(2**(i-1)) && j != 0 && i != 0){
                            return(
                              <>
                                {Array.from({ length: (2**(i-1))-1}, (_, k) => {
                                  if (lineCounter < 2){
                                    return <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-white from 10% via-white via-10% to-transparent to-10%"/>
                                  } else {
                                    lineCounter = 0
                                    return <div class="w-full h-[var(--mh)] bg-transparent"></div>
                                  }
                                })}
                                {(() => {
                                  lineCounter++
                                  return null
                                })()}
                                <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-white from 10% via-white via-10% to-transparent to-10%"/>
                              </>
                            )
                          } else {
                            lineCounter++
                            return(
                              <>
                                <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-white from 10% via-white via-10% to-transparent to-10%"/>
                              </>
                            )
                          }
                        })}
                      </div>
                      <div class="w-[100px] flex text-[50px] ml-[-100px] [writing-mode:vertical-lr] justify-center items-center text-nowrap">
                        <div class="w-full h-[10px] bg-white"/>
                      </div>
                      <div class="w-[100px] flex text-[50px] ml-[-100px] [writing-mode:vertical-lr] justify-center items-center text-nowrap">
                        <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-transparent from 90% via-transparent via-90% to-white to-90%"/>
                      </div>
                    </>
                  )
                } else if (i === Math.log2(playOffMatches*2)-2) {
                  return (
                    <>
                      <div class="w-[100px] flex text-[50px] [writing-mode:vertical-lr] justify-center items-center text-nowrap">
                        <div class="w-fit h-fit absolute">
                          {'Semi-final'}
                        </div>
                        {(() => {
                          lineCounter = 0
                          return null
                        })()}
                        {Array.from({ length: (playOffMatches/(2**(i-1)))}, (_, j) => {
                          if (j < playOffMatches/(2**(i-1)) && j != 0 && (i-1) != 0){
                            return(
                              <>
                                {Array.from({ length: (2**(i-1))-1}, (_, k) => {
                                  if (lineCounter < 2){
                                    return <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-white from 10% via-white via-10% to-transparent to-10%"/>
                                  } else {
                                    lineCounter = 0
                                    return <div class="w-full h-[var(--mh)] bg-transparent"></div>
                                  }
                                })}
                                {(() => {
                                  lineCounter++
                                  return null
                                })()}
                                <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-white from 10% via-white via-10% to-transparent to-10%"/>
                              </>
                            )
                          } else {
                            lineCounter++
                            return(
                              <>
                                <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-white from 10% via-white via-10% to-transparent to-10%"/>
                              </>
                            )
                          }
                        })}
                      </div>
                      <div class="w-[100px] flex text-[50px] ml-[-100px] [writing-mode:vertical-lr] justify-center items-center text-nowrap">
                        {(() => {
                          lineCounter = 0
                          return null
                        })()}
                        {Array.from({ length: (playOffMatches/(2**i))}, (_, j) => {
                          if (j < playOffMatches/(2**i) && j != 0 && i != 0){
                            return(
                              <>
                                {Array.from({ length: (2**i)-1}, (_, k) => {
                                  if (lineCounter < 2){
                                    return <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-transparent from 90% via-transparent via-90% to-white to-90%"/>
                                  } else {
                                    lineCounter = 0
                                    return <div class="w-full h-[var(--mh)] bg-transparent"></div>
                                  }
                                })}
                                {(() => {
                                  lineCounter++
                                  return null
                                })()}
                                <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-transparent from 90% via-transparent via-90% to-white to-90%"/>
                              </>
                            )
                          } else {
                            lineCounter++
                            return(
                              <>
                                <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-transparent from 90% via-transparent via-90% to-white to-90%"/>
                              </>
                            )
                          }
                        })}
                      </div>
                      <div class="w-[100px] flex text-[50px] ml-[-100px] [writing-mode:vertical-lr] justify-center items-center text-nowrap">
                        {Array.from({ length: (playOffMatches/(2**i))}, (_, j) => {
                          console.log((playOffMatches/(2**i)))
                          console.log(matchHeight)
                          if (j === 0){
                            return (
                              <>
                                <div class="w-full h-[calc(var(--mh)-10px)] bg-transparent"/>
                                <div class="w-full h-[10px] bg-white"/>
                                <div class="w-full h-[calc(var(--mh)/2)] bg-transparent"/>
                                {Array.from({ length: (2**i-1) }, (_, i) => {
                                  return <div class="w-full h-[calc(var(--mh))] bg-transparent"/>
                                })}
                                <div class="w-full h-[calc(var(--mh)/2)] bg-transparent"/>
                              </>
                            )
                          } else {
                            return (
                              <>
                                <div class="w-full h-[10px] bg-white"/>
                                <div class="w-full h-[calc(var(--mh)-10px)] bg-transparent"/>
                              </>
                            )
                          }
                        })}
                      </div>
                    </>
                  )
                } else {
                  if (i != 0){
                    return (
                      <>
                        <div class="w-[100px] flex text-[50px] [writing-mode:vertical-lr] justify-center items-center text-nowrap">
                          <div class="w-fit h-fit absolute">
                            {'Ronda de ' + ((playOffMatches / (2 ** i)))}
                          </div>
                          {Array.from({ length: (playOffMatches/(2**(i-1)))}, (_, j) => {
                            if (j < playOffMatches/(2**(i-1)) && j != 0 && (i-1) != 0){
                              return(
                                <>
                                  {Array.from({ length: (2**(i-1)-1)}, (_, k) => {
                                    return <div class="w-full h-[var(--mh)] bg-transparent"/>
                                  })}
                                  <div class="w-full h-[var(--mh)] bg-gradient-to-r from-white from 0% via-white via-10% to-transparent to-10%"/>
                                </>
                              )
                            } else {
                              return(
                                <>
                                  <div class="w-full h-[var(--mh)] bg-gradient-to-r from-white from 0% via-white via-10% to-transparent to-10%"/>
                                </>
                              )
                            }
                          })}
                        </div>
                        <div class="w-[100px] flex text-[50px] ml-[-100px] [writing-mode:vertical-lr] justify-center items-center text-nowrap">
                          {(() => {
                            lineCounter = 0
                            return null
                          })()}
                          {Array.from({ length: (playOffMatches/(2**i))}, (_, j) => {
                            if (j < playOffMatches/(2**i) && j != 0 && i != 0){
                              return(
                                <>
                                  {Array.from({ length: (2**i)-1}, (_, k) => {
                                    if (lineCounter < 2){
                                      return <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-transparent from 90% via-transparent via-90% to-white to-90%"/>
                                    } else {
                                      lineCounter = 0
                                      return <div class="w-full h-[var(--mh)] bg-transparent"></div>
                                    }
                                  })}
                                  {(() => {
                                    lineCounter++
                                    return null
                                  })()}
                                  <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-transparent from 90% via-transparent via-90% to-white to-90%"/>
                                </>
                              )
                            } else {
                              lineCounter++
                              return(
                                <>
                                  <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-transparent from 90% via-transparent via-90% to-white to-90%"/>
                                </>
                              )
                            }
                          })}
                        </div>
                        <div class="w-[100px] flex text-[50px] ml-[-100px] [writing-mode:vertical-lr] justify-center items-center text-nowrap">
                          {Array.from({ length: Math.log2(playOffMatches*2) }, (_, i) => {
                            return (
                              <>
                                <div class="w-full h-[calc(var(--mh)-5px)] bg-transparent"/>
                                <div class="w-full h-[10px] bg-white"/>
                                <div class="w-full h-[calc(var(--mh)-5px)] bg-transparent"/> 
                              </>
                            )
                          })}
                        </div>
                      </>
                    )
                  } else {
                    return (
                      <div class="w-[100px] flex text-[50px] [writing-mode:vertical-lr] justify-center items-center text-nowrap">
                        <div class="w-fit h-fit absolute">
                          {'Ronda de ' + ((playOffMatches / (2 ** i)))}
                        </div>
                        <div class="w-[100px] flex text-[50px] ml-] [writing-mode:vertical-lr] justify-center items-center text-nowrap">
                          {(() => {
                            lineCounter = 0
                            return null
                          })()}
                          {Array.from({ length: (playOffMatches/(2**i))}, (_, j) => {
                            if (j < playOffMatches/(2**i) && j != 0 && i != 0){
                              return(
                                <>
                                  {Array.from({ length: (2**i)-1}, (_, k) => {
                                    if (lineCounter < 2){
                                      return <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-transparent from 90% via-transparent via-90% to-white to-90%"/>
                                    } else {
                                      lineCounter = 0
                                      return <div class="w-full h-[var(--mh)] bg-transparent"></div>
                                    }
                                  })}
                                  {(() => {
                                    lineCounter++
                                    return null
                                  })()}
                                  <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-transparent from 90% via-transparent via-90% to-white to-90%"/>
                                </>
                              )
                            } else {
                              lineCounter++
                              return(
                                <>
                                  <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-transparent from 90% via-transparent via-90% to-white to-90%"/>
                                </>
                              )
                            }
                          })}
                        </div>
                      </div>
                    )
                  }
                }
              })()}
              <div class='my-auto'>
                {(() => {
                  lineCounter = 0
                  return null
                })()}
                {Array.from({ length: (playOffMatches/(2**i))}, (_, j) => {
                  if (j < playOffMatches/(2**i) && j != 0 && i != 0){
                    return(
                      <>
                        {Array.from({ length: (2**i)-1}, (_, k) => {
                          if (lineCounter < 2){
                            return <EmptyPhaseComponent/>
                          } else {
                            lineCounter = 0
                            return <TransparentPhaseComponent/>
                          }
                        })}
                        {(() => {
                          lineCounter++
                          return null
                        })()}
                        <PhaseComponent/>
                      </>
                    )
                  } else {
                    lineCounter++
                    return <PhaseComponent/>
                  }
                })}
              </div>
            </>      
          )
        })}
      </div>
    </>
  )
}

export default Phase;