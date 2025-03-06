import { useMatchState } from '@/contexts/matchState'
import { useSnapshot } from '@/contexts/snapshot'
import { DeltaBar } from '@components/ui/delta-bar'
import { Col, Grid } from '@components/ui/grid'
import { USPlayer } from '@models/ingame/events/UpdateState/USPlayer'
import { Component, createEffect } from 'solid-js'
import blueLogoBlock from './assets/blueLogoBlock.svg'
import blueMatchLostBlock from './assets/blueMatchLostBlock.svg'
import blueMatchWonBlock from './assets/blueMatchWonBlock.svg'
import blueNameBlock from './assets/blueNameBlock.svg'
import blueScoreBlock from './assets/blueScoreBlock.svg'
import orangeLogoBlock from './assets/orangeLogoBlock.svg'
import orangeMatchLostBlock from './assets/orangeMatchLostBlock.svg'
import orangeMatchWonBlock from './assets/orangeMatchWonBlock.svg'
import orangeNameBlock from './assets/orangeNameBlock.svg'
import orangeScoreBlock from './assets/orangeScoreBlock.svg'
import bg from './assets/PostGameBG.png'

const PostGame: Component = () => {
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

  const stats = useSnapshot()
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
    gameWins0 = matchState().blueWins
    gameWins1 = matchState().orangeWins
    firstTo = (matchState().bestOf + 1) / 2
  }
  return (
    <>
      <div
        class="w-[1920px] h-[1080px] bg-[image:var(--bg)] bg-cotain bg-center"
        style={{ '--bg': `url(${bg})` }}
      >
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
                          {snapState().teams[1].name}
                        </div>
                      </div>
                    </Col>
                    <Col class="relative">
                      <img
                        src={orangeLogoBlock}
                        class="w-[1000px] h-[100px] object-cover absolute inset-0 z-0"
                      />
                      <div class="absolute inset-0 z-10">
                        <div class="w-[100px] h-[100px] translate-x-[90px]">
                          <img src={matchState().orange.logo_url} class="w-fit h-fit" />
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
                      <div class="absolute inset-0 z-10">
                        <div class="w-[100px] h-[100px] translate-x-[50px]">
                          <img src={matchState().blue.logo_url} class="w-fit h-fit" />
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
                          {snapState().teams[0].name}
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
          <Grid cols={3} class="pt-[82px]">
            <Col class="inset-0 z-10 relative flex flex-row-reverse translate-y-[5px]">
              {Array.from({ length: firstTo }, (_, index) => {
                if (index < gameWins0) {
                  return (
                    <img
                      src={blueMatchWonBlock}
                      class="w-[60px] h-[50px] object-contain translate-x-[calc((175px)_+_15px_*_var(--index))]"
                      style={{ '--index': index }}
                    />
                  )
                } else {
                  return (
                    <img
                      src={blueMatchLostBlock}
                      class="w-[60px] h-[50px] object-contain translate-x-[calc((175px)_+_15px_*_var(--index))]"
                      style={{ '--index': index }}
                    />
                  )
                }
              })}
            </Col>
            <Col class="relative">
              <div class="absolute inset-0 z-10">
                <div class="text-white text-center text-[30px] text-nowrap translate-y-[5px]">
                  {'JUEGO '}
                  {matchState().gameNumber}
                </div>
              </div>
            </Col>
            <Col class="inset-0 z-10 relative flex flex-row translate-x-[0px] translate-y-[5px]">
              {Array.from({ length: firstTo }, (_, index) => {
                if (index < gameWins1) {
                  return (
                    <img
                      src={orangeMatchWonBlock}
                      class="w-[60px] h-[50px] object-contain translate-x-[calc((-175px)_-_15px_*_var(--index))] translate-y-[0%]"
                      style={{ '--index': index }}
                    />
                  )
                } else {
                  return (
                    <img
                      src={orangeMatchLostBlock}
                      class="w-[60px] h-[50px] object-contain translate-x-[calc((-175px)_-_15px_*_var(--index))] translate-y-[0%]"
                      style={{ '--index': index }}
                    />
                  )
                }
              })}
            </Col>
          </Grid>
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

export default PostGame
