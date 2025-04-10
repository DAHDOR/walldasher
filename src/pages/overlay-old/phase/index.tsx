import { useMatchState } from '@contexts/match-state'
import { Component, createSignal } from 'solid-js'
import blueScore from './assets/blueScorePhase.svg'
import bottomPhase from './assets/bottomBracketPhase.svg'
import finalBackground from './assets/finalBracketPhase.svg'
import logoPhase from './assets/logoPhase.svg'
import cloud9 from './assets/logos/cloud9.png'
import faze from './assets/logos/faze.png'
import fnatic from './assets/logos/fnatic.png'
import heroic from './assets/logos/heroic.png'
import navi from './assets/logos/navi.png'
import spacestation from './assets/logos/spacestation.png'
import tsm from './assets/logos/tsm.png'
import vitality from './assets/logos/vitality.png'
import orangeScore from './assets/orangeScorePhase.svg'
import bluePhase from './assets/phaseBlue.svg'
import orangePhase from './assets/phaseOrange.svg'
import topPhase from './assets/upperBracketPhase.svg'

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
]

const matchState = useMatchState()
const playOffMatches = 4

const TransparentPhaseComponent: Component<{}> = props => {
  const normalHeight = (100 * 4) / playOffMatches
  const doubleHeight = (200 * 4) / playOffMatches
  const betweenTeams = (10 * 4) / playOffMatches
  const betweenMatch = (25 * 4) / playOffMatches
  const normalWidth = normalHeight
  const doubleWidth = doubleHeight
  const letterSize = normalHeight / 4
  const pointSize = normalHeight / 1.5
  return (
    <div
      class=""
      style={{
        '--nw': `${normalWidth}px`,
        '--dw': `${doubleWidth}px`,
        '--bt': `${betweenTeams}px`,
        '--bm': `${betweenMatch}px`,
        '--nh': `${normalHeight}px`,
        '--dh': `${doubleHeight}px`,
        '--ls': `${letterSize}px`,
        '--ps': `${pointSize}px`
      }}
    >
      <div class="h-[var(--bm)]"></div>
      <div class="relative flex h-[var(--nh)]"></div>
      <div class="h-[var(--bt)]"></div>
      <div class="relative flex h-[var(--nh)]"></div>
      <div class="h-[var(--bm)]"></div>
    </div>
  )
}

const EmptyPhaseComponent: Component<{}> = position => {
  const normalHeight = (100 * 4) / playOffMatches
  const doubleHeight = (200 * 4) / playOffMatches
  const betweenTeams = (10 * 4) / playOffMatches
  const betweenMatch = (25 * 4) / playOffMatches
  const normalWidth = normalHeight
  const doubleWidth = doubleHeight
  const letterSize = normalHeight / 4
  const pointSize = normalHeight / 1.5
  return (
    <div
      class="bg-[#1a1a1aff]"
      style={{
        '--nw': `${normalWidth}px`,
        '--dw': `${doubleWidth}px`,
        '--bt': `${betweenTeams}px`,
        '--bm': `${betweenMatch}px`,
        '--nh': `${normalHeight}px`,
        '--dh': `${doubleHeight}px`,
        '--ls': `${letterSize}px`,
        '--ps': `${pointSize}px`
      }}
    >
      <div class="h-[var(--bm)]"></div>
      <div class="relative flex h-[var(--nh)]"></div>
      <div class="h-[var(--bt)]"></div>
      <div class="relative flex h-[var(--nh)]"></div>
      <div class="h-[var(--bm)]"></div>
    </div>
  )
}

interface PositionNumber {
  positionA: number
  positionB: number
}

const PhaseComponent: Component<PositionNumber> = props => {
  const [valueA, setValueA] = createSignal(props.positionA)
  const [valueB, setValueB] = createSignal(props.positionB)
  const normalHeight = (100 * 4) / playOffMatches
  const doubleHeight = (200 * 4) / playOffMatches
  const betweenTeams = (10 * 4) / playOffMatches
  const betweenMatch = (25 * 4) / playOffMatches
  const normalWidth = normalHeight
  const doubleWidth = doubleHeight
  const letterSize = normalHeight / 4
  const pointSize = normalHeight / 1.5
  return (
    <div
      style={{
        '--nw': `${normalWidth}px`,
        '--dw': `${doubleWidth}px`,
        '--bt': `${betweenTeams}px`,
        '--bm': `${betweenMatch}px`,
        '--nh': `${normalHeight}px`,
        '--dh': `${doubleHeight}px`,
        '--ls': `${letterSize}px`,
        '--ps': `${pointSize}px`
      }}
    >
      <div class="h-[var(--bm)]"></div>
      <div class="relative flex">
        <div class="w-[var(--nw)] h-[var(--nh)] relative flex justify-center items-center">
          <img
            src={logoPhase}
            class="w-fit h-fit object-cover absolute inset-0 z-0"
          ></img>
          <img src={teams[valueA()].pfp} class="w-fit h-fit z-10 absolute"></img>
        </div>
        <div class="w-[var(--dw)] h-[var(--nh)] relative flex justify-center items-center">
          <img src={bluePhase} class="w-fit h-fit object-cover absolute inset-0 z-0" />
          <div class="w-fit h-fit z-10 text-[length:--ls] text-center absolute">
            {teams[valueA()].name}
          </div>
        </div>
        <div class="w-[var(--nw)] h-[var(--nh)] relative flex justify-center items-center">
          <img
            src={blueScore}
            class="w-fit h-fit object-cover absolute inset-0 z-0"
          ></img>
          <div class="w-fit h-fit z-10 text-[length:--ps] absolute">{'5'}</div>
        </div>
      </div>
      <div class="h-[var(--bt)]"></div>
      <div class="relative flex">
        <div class="w-[var(--nw)] h-[var(--nh)] relative flex justify-center items-center">
          <img
            src={logoPhase}
            class="w-fit h-fit object-cover absolute inset-0 z-0"
          ></img>
          <img src={teams[valueB()].pfp} class="w-fit h-fit z-10 absolute"></img>
        </div>
        <div class="w-[var(--dw)] h-[var(--nh)] relative flex justify-center items-center">
          <img src={orangePhase} class="w-fit h-fit object-cover absolute inset-0 z-0" />
          <div class="w-fit h-fit z-10 text-[length:--ls] text-center absolute">
            {teams[valueB()].name}
          </div>
        </div>
        <div class="w-[var(--nw)] h-[var(--nh)] relative flex justify-center items-center">
          <img
            src={orangeScore}
            class="w-fit h-fit object-cover absolute inset-0 z-0"
          ></img>
          <div class="w-fit h-fit z-10 text-[length:--ps] absolute">{'3'}</div>
        </div>
      </div>
      <div class="h-[var(--bm)]"></div>
    </div>
  )
}

const Phase: Component = () => {
  const matchHeight = (260 * 4) / playOffMatches
  const matchWidth = (400 * 4) / playOffMatches
  let phaseBackground = bottomPhase
  let lineCounter = 0
  let teamCounter = -1
  return (
    <>
      <div
        class="w-[1920px] h-[1080px] flex absolute mx-auto justify-center z-0"
        style={{ '--mw': `${matchWidth}px`, '--mh': `${matchHeight}px` }}
      >
        {Array.from({ length: Math.log2(playOffMatches * 2) }, (_, i) => {
          return (
            <>
              <div class="w-[100px] flex text-[50px] -rotate-90 justify-center items-center text-nowrap"></div>
              <div class="my-auto">
                {Array.from({ length: playOffMatches / 2 ** i }, (_, j) => {
                  if (j < playOffMatches / 2 ** i && j != 0 && i != 0) {
                    return (
                      <>
                        {Array.from({ length: 2 ** i - 1 }, (_, k) => {
                          {
                            ;(() => {
                              if (phaseBackground === topPhase) {
                                phaseBackground = bottomPhase
                              } else {
                                phaseBackground = topPhase
                              }
                              return null
                            })()
                          }
                          return <div class="w-[var(--mw)] h-[var(--mh)]"></div>
                        })}
                        <img src={phaseBackground} class="w-[var(--mw)] h-[var(--mh)]" />
                      </>
                    )
                  } else {
                    if (phaseBackground === topPhase) {
                      phaseBackground = bottomPhase
                    } else {
                      phaseBackground = topPhase
                    }
                    if (playOffMatches / 2 ** i === 1) {
                      return (
                        <img src={finalBackground} class="w-[var(--mw)] h-[var(--mh)]" />
                      )
                    } else {
                      return (
                        <img src={phaseBackground} class="w-[var(--mw)] h-[var(--mh)]" />
                      )
                    }
                  }
                })}
              </div>
            </>
          )
        })}
      </div>
      <div
        class="w-[1920px] h-[1080px] flex absolute mx-auto justify-center font-[chivo] uppercase z-10"
        style={{ '--mw': `${matchWidth}px`, '--mh': `${matchHeight}px` }}
      >
        {Array.from({ length: Math.log2(playOffMatches * 2) }, (_, i) => {
          return (
            <>
              {(() => {
                if (i === Math.log2(playOffMatches * 2) - 1) {
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
                        {Array.from({ length: playOffMatches / 2 ** (i - 1) }, (_, j) => {
                          if (j < playOffMatches / 2 ** (i - 1) && j != 0 && i != 0) {
                            return (
                              <>
                                {Array.from({ length: 2 ** (i - 1) - 1 }, (_, k) => {
                                  if (lineCounter < 2) {
                                    return (
                                      <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-white from 10% via-white via-10% to-transparent to-10%" />
                                    )
                                  } else {
                                    lineCounter = 0
                                    return (
                                      <div class="w-full h-[var(--mh)] bg-transparent"></div>
                                    )
                                  }
                                })}
                                {(() => {
                                  lineCounter++
                                  return null
                                })()}
                                <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-white from 10% via-white via-10% to-transparent to-10%" />
                              </>
                            )
                          } else {
                            lineCounter++
                            return (
                              <>
                                <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-white from 10% via-white via-10% to-transparent to-10%" />
                              </>
                            )
                          }
                        })}
                      </div>
                      <div class="w-[100px] flex text-[50px] ml-[-100px] [writing-mode:vertical-lr] justify-center items-center text-nowrap">
                        <div class="w-full h-[10px] bg-white" />
                      </div>
                      <div class="w-[100px] flex text-[50px] ml-[-100px] [writing-mode:vertical-lr] justify-center items-center text-nowrap">
                        <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-transparent from 90% via-transparent via-90% to-white to-90%" />
                      </div>
                    </>
                  )
                } else if (i === Math.log2(playOffMatches * 2) - 2) {
                  return (
                    <>
                      <div class="w-[100px] flex text-[50px] [writing-mode:vertical-lr] justify-center items-center text-nowrap">
                        <div class="w-fit h-fit absolute">{'Semi-final'}</div>
                        {(() => {
                          lineCounter = 0
                          return null
                        })()}
                        {Array.from({ length: playOffMatches / 2 ** (i - 1) }, (_, j) => {
                          if (j < playOffMatches / 2 ** (i - 1) && j != 0 && i - 1 != 0) {
                            return (
                              <>
                                {Array.from({ length: 2 ** (i - 1) - 1 }, (_, k) => {
                                  if (lineCounter < 2) {
                                    return (
                                      <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-white from 10% via-white via-10% to-transparent to-10%" />
                                    )
                                  } else {
                                    lineCounter = 0
                                    return (
                                      <div class="w-full h-[var(--mh)] bg-transparent"></div>
                                    )
                                  }
                                })}
                                {(() => {
                                  lineCounter++
                                  return null
                                })()}
                                <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-white from 10% via-white via-10% to-transparent to-10%" />
                              </>
                            )
                          } else {
                            lineCounter++
                            return (
                              <>
                                <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-white from 10% via-white via-10% to-transparent to-10%" />
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
                        {Array.from({ length: playOffMatches / 2 ** i }, (_, j) => {
                          if (j < playOffMatches / 2 ** i && j != 0 && i != 0) {
                            return (
                              <>
                                {Array.from({ length: 2 ** i - 1 }, (_, k) => {
                                  if (lineCounter < 2) {
                                    return (
                                      <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-transparent from 90% via-transparent via-90% to-white to-90%" />
                                    )
                                  } else {
                                    lineCounter = 0
                                    return (
                                      <div class="w-full h-[var(--mh)] bg-transparent"></div>
                                    )
                                  }
                                })}
                                {(() => {
                                  lineCounter++
                                  return null
                                })()}
                                <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-transparent from 90% via-transparent via-90% to-white to-90%" />
                              </>
                            )
                          } else {
                            lineCounter++
                            return (
                              <>
                                <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-transparent from 90% via-transparent via-90% to-white to-90%" />
                              </>
                            )
                          }
                        })}
                      </div>
                      <div class="w-[100px] flex text-[50px] ml-[-100px] [writing-mode:vertical-lr] justify-center items-center text-nowrap">
                        {Array.from({ length: playOffMatches / 2 ** i }, (_, j) => {
                          if (j === 0) {
                            return (
                              <>
                                <div class="w-full h-[calc(var(--mh)-10px)] bg-transparent" />
                                <div class="w-full h-[10px] bg-white" />
                                <div class="w-full h-[calc(var(--mh)/2)] bg-transparent" />
                                {Array.from({ length: 2 ** i - 1 }, (_, i) => {
                                  return (
                                    <div class="w-full h-[calc(var(--mh))] bg-transparent" />
                                  )
                                })}
                                <div class="w-full h-[calc(var(--mh)/2)] bg-transparent" />
                              </>
                            )
                          } else {
                            return (
                              <>
                                <div class="w-full h-[10px] bg-white" />
                                <div class="w-full h-[calc(var(--mh)-10px)] bg-transparent" />
                              </>
                            )
                          }
                        })}
                      </div>
                    </>
                  )
                } else {
                  if (i != 0) {
                    return (
                      <>
                        <div class="w-[100px] flex text-[50px] [writing-mode:vertical-lr] justify-center items-center text-nowrap">
                          <div class="w-fit h-fit absolute">
                            {'Ronda de ' + playOffMatches / 2 ** i}
                          </div>
                          {Array.from(
                            { length: playOffMatches / 2 ** (i - 1) },
                            (_, j) => {
                              if (
                                j < playOffMatches / 2 ** (i - 1) &&
                                j != 0 &&
                                i - 1 != 0
                              ) {
                                return (
                                  <>
                                    {Array.from({ length: 2 ** (i - 1) - 1 }, (_, k) => {
                                      return (
                                        <div class="w-full h-[var(--mh)] bg-transparent" />
                                      )
                                    })}
                                    <div class="w-full h-[var(--mh)] bg-gradient-to-r from-white from 0% via-white via-10% to-transparent to-10%" />
                                  </>
                                )
                              } else {
                                return (
                                  <>
                                    <div class="w-full h-[var(--mh)] bg-gradient-to-r from-white from 0% via-white via-10% to-transparent to-10%" />
                                  </>
                                )
                              }
                            }
                          )}
                        </div>
                        <div class="w-[100px] flex text-[50px] ml-[-100px] [writing-mode:vertical-lr] justify-center items-center text-nowrap">
                          {(() => {
                            lineCounter = 0
                            return null
                          })()}
                          {Array.from({ length: playOffMatches / 2 ** i }, (_, j) => {
                            if (j < playOffMatches / 2 ** i && j != 0 && i != 0) {
                              return (
                                <>
                                  {Array.from({ length: 2 ** i - 1 }, (_, k) => {
                                    if (lineCounter < 2) {
                                      return (
                                        <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-transparent from 90% via-transparent via-90% to-white to-90%" />
                                      )
                                    } else {
                                      lineCounter = 0
                                      return (
                                        <div class="w-full h-[var(--mh)] bg-transparent"></div>
                                      )
                                    }
                                  })}
                                  {(() => {
                                    lineCounter++
                                    return null
                                  })()}
                                  <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-transparent from 90% via-transparent via-90% to-white to-90%" />
                                </>
                              )
                            } else {
                              lineCounter++
                              return (
                                <>
                                  <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-transparent from 90% via-transparent via-90% to-white to-90%" />
                                </>
                              )
                            }
                          })}
                        </div>
                        <div class="w-[100px] flex text-[50px] ml-[-100px] [writing-mode:vertical-lr] justify-center items-center text-nowrap">
                          {Array.from(
                            { length: Math.log2(playOffMatches * 2) },
                            (_, i) => {
                              return (
                                <>
                                  <div class="w-full h-[calc(var(--mh)-5px)] bg-transparent" />
                                  <div class="w-full h-[10px] bg-white" />
                                  <div class="w-full h-[calc(var(--mh)-5px)] bg-transparent" />
                                </>
                              )
                            }
                          )}
                        </div>
                      </>
                    )
                  } else {
                    return (
                      <div class="w-[100px] flex text-[50px] [writing-mode:vertical-lr] justify-center items-center text-nowrap">
                        <div class="w-fit h-fit absolute">
                          {'Ronda de ' + playOffMatches / 2 ** i}
                        </div>
                        <div class="w-[100px] flex text-[50px] ml-] [writing-mode:vertical-lr] justify-center items-center text-nowrap">
                          {(() => {
                            lineCounter = 0
                            return null
                          })()}
                          {Array.from({ length: playOffMatches / 2 ** i }, (_, j) => {
                            if (j < playOffMatches / 2 ** i && j != 0 && i != 0) {
                              return (
                                <>
                                  {Array.from({ length: 2 ** i - 1 }, (_, k) => {
                                    if (lineCounter < 2) {
                                      return (
                                        <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-transparent from 90% via-transparent via-90% to-white to-90%" />
                                      )
                                    } else {
                                      lineCounter = 0
                                      return (
                                        <div class="w-full h-[var(--mh)] bg-transparent"></div>
                                      )
                                    }
                                  })}
                                  {(() => {
                                    lineCounter++
                                    return null
                                  })()}
                                  <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-transparent from 90% via-transparent via-90% to-white to-90%" />
                                </>
                              )
                            } else {
                              lineCounter++
                              return (
                                <>
                                  <div class="w-full h-[calc(var(--mh))] bg-gradient-to-r from-transparent from 90% via-transparent via-90% to-white to-90%" />
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
              <div class="my-auto">
                {(() => {
                  lineCounter = 0
                  return null
                })()}
                {(() => {
                  teamCounter = -1
                  return null
                })()}
                {Array.from({ length: playOffMatches / 2 ** i }, (_, j) => {
                  console.log('i: ' + i + ' j: ' + j)
                  if (j < playOffMatches / 2 ** i && j != 0 && i != 0) {
                    return (
                      <>
                        {Array.from({ length: 2 ** i - 1 }, (_, k) => {
                          if (lineCounter < 2) {
                            return <EmptyPhaseComponent />
                          } else {
                            lineCounter = 0
                            return <TransparentPhaseComponent />
                          }
                        })}
                        {(() => {
                          lineCounter++
                          if (i == 2) {
                            teamCounter = teamCounter + 4
                            return (
                              <PhaseComponent
                                positionA={teamCounter - 3}
                                positionB={teamCounter + 1}
                              />
                            )
                          } else if (i == 1) {
                            teamCounter = teamCounter + 4
                            return (
                              <PhaseComponent
                                positionA={teamCounter - 1}
                                positionB={teamCounter + 1}
                              />
                            )
                          } else {
                            teamCounter = teamCounter + 2
                            return (
                              <PhaseComponent
                                positionA={teamCounter - 1}
                                positionB={teamCounter}
                              />
                            )
                          }
                        })()}
                      </>
                    )
                  } else {
                    lineCounter++
                    if (i == 2) {
                      teamCounter = teamCounter + 4
                      return (
                        <PhaseComponent
                          positionA={teamCounter - 3}
                          positionB={teamCounter + 1}
                        />
                      )
                    } else if (i == 1) {
                      teamCounter = teamCounter + 2
                      return (
                        <PhaseComponent
                          positionA={teamCounter - 1}
                          positionB={teamCounter + 1}
                        />
                      )
                    } else {
                      teamCounter = teamCounter + 2
                      return (
                        <PhaseComponent
                          positionA={teamCounter - 1}
                          positionB={teamCounter}
                        />
                      )
                    }
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

export { Phase }
