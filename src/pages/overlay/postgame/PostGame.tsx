import { useSnapshot } from '@/contexts/snapshot'
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
import wallpaperImage from './assets/Wallpaper.jpg'

const PostGame: Component = () => {
  let players0: USPlayer[]
  let players1: USPlayer[]
  let gameWins0: number
  let gameWins1: number
  let firstTo: number
  const stats = useSnapshot()
  const snapState = () => stats()
  createEffect(() => {
    players0 = snapState().players.filter(player => player.team === 0)
    players1 = snapState().players.filter(player => player.team === 1)
  })
  {
    players0 = snapState().players.filter(player => player.team === 0)
  }
  {
    players1 = snapState().players.filter(player => player.team === 1)
  }
  {
    gameWins0 = 14
  }
  {
    gameWins1 = 13
  }
  {
    firstTo = 15
  }
  return (
    <>
      <div
        class="w-[1920px] h-[1080px] bg-[image:var(--bg)] bg-cotain bg-center"
        style={{ '--bg': `url(${bg})` }}
      >
        <div class="w-[1728px] text-center z-10 mx-auto">
          <div class="text-gray-300 text-[25px] pt-[30px] font-bold opacity-50">
            {'CAMPEONATO HELLO WORLD | CARACAS OPEN #1 | LATAM | PLAYOFFS | WEEK 8'}
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
                        <div class="top-[50%] left-[50%] translate-x-[0%] translate-y-[-15%]">
                          <img src={wallpaperImage} class="w-fit h-fit scale-50" />
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
                        <div class="top-[50%] left-[50%] translate-x-[0%] translate-y-[-15%]">
                          <img
                            src={wallpaperImage}
                            class="w-fit h-fit scale-50 bg-[image:var(--wallpaperImage)] bg-cotain bg-center"
                            style={{ '--bg': `url(${wallpaperImage})` }}
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
                        <div class="text-white text-[50px] whitespace-nowrap text-center translate-x-[100px] translate-y-[10px]">
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
                  {'JUEGO 5'}
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
          <Grid cols={7} class="pt-[50px] text-[35px] font-semibold">
            {Array.from({ length: 3 }, (_, index) => {
              if (index === 0) {
                if (players0?.length > 0) {
                  return players0.map(player => (
                    <Col span={1} class="pb-[25px] pt-[25px]">
                      <div class="pb-[25px] pt-[25px] bg-gradient-to-b from-transparent from-0% via-transparent via-90% to-[#22b0ff] to-90%">
                        {player.name}
                      </div>
                      <div class="pb-[25px] pt-[25px]">{player.score}</div>
                      <div class="pb-[25px] pt-[25px]">{player.goals}</div>
                      <div class="pb-[25px] pt-[25px]">{player.assists}</div>
                      <div class="pb-[25px] pt-[25px]">{player.shots}</div>
                      <div class="pb-[25px] pt-[25px]">{player.saves}</div>
                    </Col>
                  ))
                } else {
                  return Array.from({ length: 3 }, (_, i) => (
                    <Col span={1} class="pb-[25px] pt-[25px]">
                      <div class="pb-[25px] pt-[25px] bg-gradient-to-b from-transparent from-0% via-transparent via-90% to-[#22b0ff] to-90%">
                        {'Player B ' + i}
                      </div>
                      <div class="pb-[25px] pt-[25px]">0</div>
                      <div class="pb-[25px] pt-[25px]">0</div>
                      <div class="pb-[25px] pt-[25px]">0</div>
                      <div class="pb-[25px] pt-[25px]">0</div>
                      <div class="pb-[25px] pt-[25px]">0</div>
                    </Col>
                  ))
                }
              } else if (index === 1) {
                return (
                  <Col span={1} class="pb-[25px] pt-[25px]">
                    <div class="pb-[25px] pt-[25px]">Jugadores</div>
                    <div class="pb-[25px] pt-[25px]">Puntos</div>
                    <div class="pb-[25px] pt-[25px]">Goles</div>
                    <div class="pb-[25px] pt-[25px]">Asistencias</div>
                    <div class="pb-[25px] pt-[25px]">Tiros</div>
                    <div class="pb-[25px] pt-[25px]">Salvadas</div>
                  </Col>
                )
              } else {
                if (players1?.length > 0) {
                  return players1.map(player => (
                    <Col span={1} class="pb-[25px] pt-[25px]">
                      <div class="pb-[25px] pt-[25px] bg-gradient-to-b from-transparent from-0% via-transparent via-90% to-[#ff8a15] to-90%">
                        {player.name}
                      </div>
                      <div class="pb-[25px] pt-[25px]">{player.score}</div>
                      <div class="pb-[25px] pt-[25px]">{player.goals}</div>
                      <div class="pb-[25px] pt-[25px]">{player.assists}</div>
                      <div class="pb-[25px] pt-[25px]">{player.shots}</div>
                      <div class="pb-[25px] pt-[25px]">{player.saves}</div>
                    </Col>
                  ))
                } else {
                  return Array.from({ length: 3 }, (_, i) => (
                    <Col span={1} class="pb-[25px] pt-[25px]">
                      <div class="pb-[25px] pt-[25px] bg-gradient-to-b from-transparent from-0% via-transparent via-90% to-[#ff8a15] to-90%">
                        {'Player O ' + i}
                      </div>
                      <div class="pb-[25px] pt-[25px]">0</div>
                      <div class="pb-[25px] pt-[25px]">0</div>
                      <div class="pb-[25px] pt-[25px]">0</div>
                      <div class="pb-[25px] pt-[25px]">0</div>
                      <div class="pb-[25px] pt-[25px]">0</div>
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
