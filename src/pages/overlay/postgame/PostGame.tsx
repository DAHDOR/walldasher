import { useSnapshot } from '@/contexts/snapshot'
import { Col, Grid } from '@components/ui/grid'
import { USPlayer } from '@models/ingame/events/UpdateState/USPlayer'
import { Component, createEffect} from 'solid-js'
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
    players0 = snapState().players.filter((player) => player.team === 0)
    players1 = snapState().players.filter((player) => player.team === 1)
  })
  {players0 = snapState().players.filter((player) => player.team === 0)}
  {players1 = snapState().players.filter((player) => player.team === 1)}
  {gameWins0 = 2}
  {gameWins1 = 3}
  {firstTo = 4}
  return (
    <>
      <div class="w-screen h-screen bg-[image:var(--bg)] bg-cotain bg-center" style={{'--bg': `url(${bg})`}}>
        <div class="w-[90vw] text-center z-10 mx-auto">
          <div class="text-gray-300 text-[1.2vw] pb-[0vw] pt-[1vw] font-bold opacity-50">
            {'CAMPEONATO HELLO WORLD | CARACAS OPEN #1 | LATAM | PLAYOFFS | WEEK 8'}
          </div>
          <Grid cols={7} class="pb-[0vw] pt-[2vw]">
            {snapState().teams.map((team, index) => (
              <>
                {index === 1 ? (
                  <>
                    <Col></Col>
                    <Col class="relative">
                      <img src={orangeScoreBlock} class="w-auto h-auto object-cover absolute inset-0 z-0"/>
                      <div class="absolute inset-0 z-10">
                        <div class="text-[color:#ff8a15] text-center text-[4vw] font-bold top-[50%] left-[50%] translate-x-[-75%] translate-y-[-10%]">
                          {snapState().score.orange}
                        </div>
                      </div>
                    </Col>
                    <Col class="relative">
                      <img src={orangeNameBlock} class="w-auto h-auto object-cover absolute inset-0 z-0"/>
                      <div class="absolute inset-0 z-10">
                        <div class="text-white text-[2.5vw] whitespace-nowrap text-left translate-x-[-10vw] translate-y-[0.5vw]">
                          {snapState().teams[1].name}
                        </div>
                      </div>
                    </Col>
                    <Col class="relative">
                      <img src={orangeLogoBlock} class="w-auto h-auto object-cover absolute inset-0 z-0"/>
                      <div class="absolute inset-0 z-10">
                        <div class="text-white text-center text-[2.5vw] text-nowrap top-[50%] left-[50%] translate-x-[0%] translate-y-[-15%]">
                          <img src={wallpaperImage} class="w-fit h-fit scale-50 mb-[1vh]" />
                        </div>
                      </div>
                    </Col>
                  </>
                ) : (
                  <>
                    <Col class="relative">
                      <img src={blueLogoBlock} class="w-auto h-auto object-cover absolute inset-0 z-0"/>
                      <div class="absolute inset-0 z-10">
                        <div class="text-white text-center text-[2.5vw] text-nowrap top-[50%] left-[50%] translate-x-[0%] translate-y-[-15%]">
                          <img src={wallpaperImage} class="w-fit h-fit scale-50 mb-[1vh]" />
                        </div>
                      </div>
                    </Col>
                    <Col class="relative">
                      <img src={blueNameBlock} class="w-auto h-auto object-cover absolute inset-0 z-0"/>
                      <div class="absolute inset-0 z-10">
                        <div class="text-white text-[2.5vw] whitespace-nowrap text-center translate-x-[3vw] translate-y-[0.5vw]">
                          {snapState().teams[0].name}
                        </div>
                      </div>
                    </Col>
                    <Col class="relative">
                      <img src={blueScoreBlock} class="w-auto h-auto object-cover absolute inset-0 z-0"/>
                      <div class="absolute inset-0 z-10">
                        <div class="text-[color:#22b0ff] text-center text-[4vw] font-bold top-[50%] left-[50%] translate-x-[75%] translate-y-[-10%]">
                          {snapState().score.blue}
                        </div>
                      </div>
                    </Col>
                  </>
                )}
              </>
            ))}
          </Grid>
          <Grid cols={3} class="pb-[0vw] pt-[5vw]">
            <Col class="inset-0 z-10 relative flex items-center justify-center top-[0%] left-[0%] translate-x-[55.4%] translate-y-[10%]">
              {Array.from({ length: firstTo }, (_, index) => {
                if (index < gameWins0){
                  return(
                    <img src={blueMatchLostBlock} class="max-w-[5vw] max-h-[1.5vw] object-contain top-[50%] left-[50%] translate-x-[calc(2.45vw_-_(0.8vw_*_var(--index)))] translate-y-[0%]" style={{ '--index': index }} />
                  )
                } else {
                  return(
                    <img src={blueMatchWonBlock} class="max-w-[5vw] max-h-[1.5vw] object-contain top-[50%] left-[50%] translate-x-[calc(2.45vw_-_(0.8vw_*_var(--index)))] translate-y-[0%]" style={{ '--index': index }} />
                  )
                }
              })}
            </Col>
            <Col class="relative">
              <div class="absolute inset-0 z-10">
                <div class="text-white text-center text-[1.5vw] text-nowrap top-[50%] left-[50%] translate-x-[0%] translate-y-[-10%]">
                  {'JUEGO 5'}
                </div>
              </div>
            </Col>
            <Col class="inset-0 z-10 relative flex items-center justify-center top-[0%] left-[0%] translate-x-[-63%] translate-y-[10%]">
              {Array.from({ length: firstTo }, (_, index) => {
                if (index < gameWins1){
                  return(
                    <img src={orangeMatchWonBlock} class="max-w-[5vw] max-h-[1.5vw] object-contain top-[50%] left-[50%] translate-x-[calc(2.22vw_-_(0.8vw_*_var(--index)))] translate-y-[0%]" style={{ '--index': index }} />
                  )
                  } else {
                  return(
                    <img src={orangeMatchLostBlock} class="max-w-[5vw] max-h-[1.5vw] object-contain top-[50%] left-[50%] translate-x-[calc(2.22vw_-_(0.8vw_*_var(--index)))] translate-y-[0%]" style={{ '--index': index }} />
                  )
                }
              })}
            </Col>
          </Grid>
          <Grid cols={7} class="pb-[1vw] pt-[3vw] text-[2vw] font-semibold">
            {Array.from({ length: 3 }, (_, index) => {
              if (index === 0) {
                if (players0?.length > 0) {
                  return players0.map((player) => (
                    <Col span={1} class="pb-[1vw] pt-[1vw]">
                      <div class="pb-[1vw] pt-[1vw] bg-gradient-to-b from-transparent from-0% via-transparent via-90% to-[#22b0ff] to-90%">
                        {player.name}
                      </div>
                      <div class="pb-[1vw] pt-[1vw]">{player.score}</div>
                      <div class="pb-[1vw] pt-[1vw]">{player.goals}</div>
                      <div class="pb-[1vw] pt-[1vw]">{player.assists}</div>
                      <div class="pb-[1vw] pt-[1vw]">{player.shots}</div>
                      <div class="pb-[1vw] pt-[1vw]">{player.saves}</div>
                    </Col>
                  ));
                } else {
                  return Array.from({ length: 3 }, (_, i) => (
                    <Col span={1} class="pb-[1vw] pt-[1vw]">
                      <div class="pb-[1vw] pt-[1vw] bg-gradient-to-b from-transparent from-0% via-transparent via-90% to-[#22b0ff] to-90%">
                        {'Player B ' + i}
                      </div>
                      <div class="pb-[1vw] pt-[1vw]">0</div>
                      <div class="pb-[1vw] pt-[1vw]">0</div>
                      <div class="pb-[1vw] pt-[1vw]">0</div>
                      <div class="pb-[1vw] pt-[1vw]">0</div>
                      <div class="pb-[1vw] pt-[1vw]">0</div>
                    </Col>
                  ));
                }
              } else if (index === 1) {
                return (
                  <Col span={1} class="pb-[1vw] pt-[1vw]">
                    <div class="pb-[1vw] pt-[1vw]">Jugadores</div>
                    <div class="pb-[1vw] pt-[1vw]">Puntos</div>
                    <div class="pb-[1vw] pt-[1vw]">Goles</div>
                    <div class="pb-[1vw] pt-[1vw]">Asistencias</div>
                    <div class="pb-[1vw] pt-[1vw]">Tiros</div>
                    <div class="pb-[1vw] pt-[1vw]">Salvadas</div>
                  </Col>
                );
              } else {
                if (players1?.length > 0) {
                  return players1.map((player) => (
                    <Col span={1} class="pb-[1vw] pt-[1vw]">
                      <div class="pb-[1vw] pt-[1vw] bg-gradient-to-b from-transparent from-0% via-transparent via-90% to-[#ff8a15] to-90%">
                        {player.name}
                      </div>
                      <div class="pb-[1vw] pt-[1vw]">{player.score}</div>
                      <div class="pb-[1vw] pt-[1vw]">{player.goals}</div>
                      <div class="pb-[1vw] pt-[1vw]">{player.assists}</div>
                      <div class="pb-[1vw] pt-[1vw]">{player.shots}</div>
                      <div class="pb-[1vw] pt-[1vw]">{player.saves}</div>
                    </Col>
                  ));
                } else {
                  return Array.from({ length: 3 }, (_, i) => (
                    <Col span={1} class="pb-[1vw] pt-[1vw]">
                      <div class="pb-[1vw] pt-[1vw] bg-gradient-to-b from-transparent from-0% via-transparent via-90% to-[#ff8a15] to-90%">
                        {'Player O ' + i}
                      </div>
                      <div class="pb-[1vw] pt-[1vw]">0</div>
                      <div class="pb-[1vw] pt-[1vw]">0</div>
                      <div class="pb-[1vw] pt-[1vw]">0</div>
                      <div class="pb-[1vw] pt-[1vw]">0</div>
                      <div class="pb-[1vw] pt-[1vw]">0</div>
                    </Col>
                  ));
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
