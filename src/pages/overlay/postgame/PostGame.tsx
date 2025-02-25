import { useStats } from '@/contexts/snapshot'
import { Col, Grid } from '@components/ui/grid'
import { USPlayer } from '@models/ingame/events/UpdateState/USPlayer'
import {
  Accessor,
  Component,
  createContext,
  createEffect,
  createSignal,
  useContext
} from 'solid-js'
import { readSignal } from 'solid-js/types/reactive/signal'
import { useGameState } from 'src/contexts/gameState'
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
  const gameState = useGameState()
  const players = () => gameState()
  createEffect(() => {
    console.log(players())
  })

  const stats = useStats()
  const statsPlayer = () => stats()
  createEffect(() => {
    console.log('ABAJO')
    console.log(statsPlayer()[0].team)
  })

  interface TeamData {
    id: number
    name: string
    pfp: string
    players: number
  }

  const teams: TeamData[] = [
    {
      id: 0,
      name: 'Equipo Exagerado A',
      pfp: wallpaperImage,
      players: 3
    },
    {
      id: 0,
      name: 'Equipo Exagerado B',
      pfp: wallpaperImage,
      players: 3
    }
  ]

  return (
    <div
      class="w-screen h-screen"
      style={{
        background: `url(${bg})`,
        'background-size': 'cover',
        'background-position': 'center'
      }}
    >
      <div class="w-[90vw] text-center z-10 mx-auto">
        <div class="text-gray-300 text-[1.2vw] pb-[0vw] pt-[1vw] font-bold opacity-50">
          {'CAMPEONATO HELLO WORLD | CARACAS OPEN #1 | LATAM | PLAYOFFS | WEEK 8'}
        </div>
        <Grid cols={7} class="pb-[0vw] pt-[1vw]">
          {teams.map((team, index) => (
            <>
              {index === 1 ? (
                <>
                  <Col></Col>
                  {/* <Col class="relative">
                  <div class="absolute inset-0">
                    <div class="text-white text-center text-[2.5vw] leading-none" style={{ top: '50%', left: '50%', transform: 'translate(0%, 0%)'}}>
                      <span class='text-[1.8vw]'>JUEGO</span><br/>
                      <span class='text-[1.4vw]'>{game[0].id}</span>
                    </div>
                  </div>
                </Col> */}
                  <Col class="relative">
                    <img
                      src={orangeScoreBlock}
                      class="w-auto h-auto object-cover absolute inset-0 z-0"
                      alt={team.name}
                    />
                    <div class="absolute inset-0 z-10">
                      <div
                        class="text-[color:#ff8a15] text-center text-[4vw] font-bold"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-75%, -10%)'
                        }}
                      >
                        {players().score.orange}
                      </div>
                    </div>
                  </Col>
                  <Col class="relative">
                    <img
                      src={orangeNameBlock}
                      class="w-auto h-auto object-cover absolute inset-0 z-0"
                      alt={team.name}
                    />
                    <div class="absolute inset-0 z-10">
                      <div
                        class="text-white text-[2.5vw] text-nowrap text-center"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-70%, 15%)'
                        }}
                      >
                        {players().winner}
                      </div>
                    </div>
                  </Col>
                  <Col class="relative">
                    <img
                      src={orangeLogoBlock}
                      class="w-auto h-auto object-cover absolute inset-0 z-0"
                      alt={team.name}
                    />
                    <div class="absolute inset-0 z-10">
                      <div
                        class="text-white text-center text-[2.5vw] text-nowrap"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: 'translate(0%, -15%)'
                        }}
                      >
                        <img src={team.pfp} class="w-fit h-fit scale-50 mb-[1vh]" />
                      </div>
                    </div>
                  </Col>
                </>
              ) : (
                <>
                  <Col class="relative">
                    <img
                      src={blueLogoBlock}
                      class="w-auto h-auto object-cover absolute inset-0 z-0"
                      alt={team.name}
                    />
                    <div class="absolute inset-0 z-10">
                      <div
                        class="text-white text-center text-[2.5vw] text-nowrap"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: 'translate(0%, -15%)'
                        }}
                      >
                        <img src={team.pfp} class="w-fit h-fit scale-50 mb-[1vh]" />
                      </div>
                    </div>
                  </Col>
                  <Col class="relative">
                    <img
                      src={blueNameBlock}
                      class="w-auto h-auto object-cover absolute inset-0 z-0"
                      alt={team.name}
                    />
                    <div class="absolute inset-0 z-10">
                      <div
                        class="text-white text-[2.5vw] text-nowrap text-center"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: 'translate(0%, 15%)'
                        }}
                      >
                        {players().winner}
                      </div>
                    </div>
                  </Col>
                  <Col class="relative">
                    <img
                      src={blueScoreBlock}
                      class="w-auto h-auto object-cover absolute inset-0 z-0"
                      alt={team.name}
                    />
                    <div class="absolute inset-0 z-10">
                      <div
                        class="text-[color:#22b0ff] text-center text-[4vw] font-bold"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: 'translate(75%, -10%)'
                        }}
                      >
                        {players().score.blue}
                      </div>
                    </div>
                  </Col>
                </>
              )}
            </>
          ))}
        </Grid>
        <Grid cols={3} class="pb-[0vw] pt-[5vw]">
          <Col
            class="inset-0 z-10 relative flex items-center justify-center"
            style={{ top: '0%', left: '0%', transform: 'translate(55.4%, 10%)' }}
          >
            <img
              src={blueMatchLostBlock}
              class="max-w-[5vw] max-h-[1.5vw] object-contain"
              style={{ top: '50%', left: '50%', transform: 'translate(60%, 0%)' }}
            />
            <img
              src={blueMatchLostBlock}
              class="max-w-[5vw] max-h-[1.5vw] object-contain"
              style={{ top: '50%', left: '50%', transform: 'translate(40%, 0%)' }}
            />
            <img
              src={blueMatchWonBlock}
              class="max-w-[5vw] max-h-[1.5vw] object-contain"
              style={{ top: '50%', left: '50%', transform: 'translate(20%, 0%)' }}
            />
            <img
              src={blueMatchWonBlock}
              class="max-w-[5vw] max-h-[1.5vw] object-contain"
              style={{ top: '50%', left: '50%', transform: 'translate(0%, 0%)' }}
            />
          </Col>
          <Col class="relative">
            <div class="absolute inset-0 z-10">
              <div
                class="text-white text-center text-[1.5vw] text-nowrap"
                style={{ top: '50%', left: '50%', transform: 'translate(0%, -10%)' }}
              >
                {'JUEGO 5'}
              </div>
            </div>
          </Col>
          <Col
            class="inset-0 z-10 relative flex items-center justify-center"
            style={{ top: '0%', left: '0%', transform: 'translate(-63%, 10%)' }}
          >
            <img
              src={orangeMatchWonBlock}
              class="max-w-[5vw] max-h-[1.5vw] object-contain"
              style={{ top: '50%', left: '50%', transform: 'translate(60%, 0%)' }}
            />
            <img
              src={orangeMatchWonBlock}
              class="max-w-[5vw] max-h-[1.5vw] object-contain"
              style={{ top: '50%', left: '50%', transform: 'translate(40%, 0%)' }}
            />
            <img
              src={orangeMatchWonBlock}
              class="max-w-[5vw] max-h-[1.5vw] object-contain"
              style={{ top: '50%', left: '50%', transform: 'translate(20%, 0%)' }}
            />
            <img
              src={orangeMatchLostBlock}
              class="max-w-[5vw] max-h-[1.5vw] object-contain"
              style={{ top: '50%', left: '50%', transform: 'translate(0%, 0%)' }}
            />
          </Col>
        </Grid>
        <Grid cols={7} class="pb-[1vw] pt-[1vw] text-[2vw] font-semibold text-">
          {players().players.map((player, index) => {
            if (index < 3) {
              return (
                <Col span={1} class="pb-[1vw] pt-[1vw]">
                  <div class="pb-[1vw] pt-[1vw] bg-gradient-to-b from-transparent from-0% via-transparent via-90% to-[color:#22b0ff] to-90%">
                    {player.name}
                  </div>
                  <div class="pb-[1vw] pt-[1vw]">{player.score}</div>
                  <div class="pb-[1vw] pt-[1vw]">{player.goals}</div>
                  <div class="pb-[1vw] pt-[1vw]">{player.assists}</div>
                  <div class="pb-[1vw] pt-[1vw]">{player.shots}</div>
                  <div class="pb-[1vw] pt-[1vw]">{player.saves}</div>
                </Col>
              )
            } else if (index === 3) {
              return (
                <>
                  <Col span={1} class="pb-[1vw] pt-[1vw]">
                    <div class="pb-[1vw] pt-[1vw]">Jugadores</div>
                    <div class="pb-[1vw] pt-[1vw]">Puntos</div>
                    <div class="pb-[1vw] pt-[1vw]">Goles</div>
                    <div class="pb-[1vw] pt-[1vw]">Asistencias</div>
                    <div class="pb-[1vw] pt-[1vw]">Tiros</div>
                    <div class="pb-[1vw] pt-[1vw]">Salvadas</div>
                  </Col>
                  <Col span={1} class="pb-[1vw] pt-[1vw]">
                    <div class="pb-[1vw] pt-[1vw] bg-gradient-to-b from-transparent from-0% via-transparent via-90% to-[color:#ff8a15] to-90%">
                      {player.name}
                    </div>
                    <div class="pb-[1vw] pt-[1vw]">{player.score}</div>
                    <div class="pb-[1vw] pt-[1vw]">{player.goals}</div>
                    <div class="pb-[1vw] pt-[1vw]">{player.assists}</div>
                    <div class="pb-[1vw] pt-[1vw]">{player.shots}</div>
                    <div class="pb-[1vw] pt-[1vw]">{player.saves}</div>
                  </Col>
                </>
              )
            } else {
              return (
                <Col span={1} class="pb-[1vw] pt-[1vw]">
                  <div class="pb-[1vw] pt-[1vw] bg-gradient-to-b from-transparent from-0% via-transparent via-90% to-[color:#ff8a15] to-90%">
                    {player.name}
                  </div>
                  <div class="pb-[1vw] pt-[1vw] ">{player.score}</div>
                  <div class="pb-[1vw] pt-[1vw]">{player.goals}</div>
                  <div class="pb-[1vw] pt-[1vw]">{player.assists}</div>
                  <div class="pb-[1vw] pt-[1vw]">{player.shots}</div>
                  <div class="pb-[1vw] pt-[1vw]">{player.saves}</div>
                </Col>
              )
            }
          })}
        </Grid>
      </div>
    </div>
  )
}

export default PostGame
