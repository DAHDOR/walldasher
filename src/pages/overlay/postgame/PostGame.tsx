import { Component } from 'solid-js';
import { Col, Grid } from "@components/ui/grid";
import wallpaperImage from './assets/Wallpaper.jpg';
import bg from './assets/PostGameBG.png';
import blueNameBlock from './assets/blueNameBlock.svg';
import orangeNameBlock from './assets/orangeNameBlock.svg';
import orangeLogoBlock from './assets/orangeLogoBlock.svg';
import blueLogoBlock from './assets/blueLogoBlock.svg';
import blueScoreBlock from './assets/blueScoreBlock.svg';
import orangeScoreBlock from './assets/orangeScoreBlock.svg';
import orangeMatchWonBlock from './assets/orangeMatchWonBlock.svg';
import blueMatchWonBlock from './assets/blueMatchWonBlock.svg';
import orangeMatchLostBlock from './assets/orangeMatchLostBlock.svg';
import blueMatchLostBlock from './assets/blueMatchLostBlock.svg';

const PostGame: Component = () => {
  interface PlayerData {
    id: number;
    name: string;
    score: number;
    goals: number;
    assists: number;
    saves: number;
    shots: number;
  }

  interface TeamData {
    id: number;
    name: string;
    pfp: string;
    players: number;
  }

  interface GameData {
    id: number;
    score1: number;
    score2: number;
    stats: number;
  }

  const game: GameData[] = [
    {
      id: 2,
      score1: 3,
      score2: 7,
      stats: 0
    }
  ]

  const teams: TeamData[] = [
    {
      id: 0,
      name: "Equipo Exagerado A",
      pfp: wallpaperImage,
      players: 3
    },
    {
      id: 0,
      name: "Equipo Exagerado B",
      pfp: wallpaperImage,
      players: 3
    }
  ]

  const players: PlayerData[] = [
    {
      id: 0,
      name: "Jugador A",
      score: 120,
      goals: 2,
      assists: 1,
      saves: 0,
      shots: 5,
    },
    {
      id: 1,
      name: "Jugador B",
      score: 120,
      goals: 2,
      assists: 1,
      saves: 0,
      shots: 5,
    },
    {
      id: 2,
      name: "Jugador C",
      score: 120,
      goals: 2,
      assists: 1,
      saves: 0,
      shots: 5,
    },
    {
      id: 3,
      name: "Jugador D",
      score: 120,
      goals: 2,
      assists: 1,
      saves: 0,
      shots: 5,
    },
    {
      id: 4,
      name: "Jugador E",
      score: 120,
      goals: 2,
      assists: 1,
      saves: 0,
      shots: 5,
    },
    {
      id: 5,
      name: "Jugador F",
      score: 120,
      goals: 2,
      assists: 1,
      saves: 0,
      shots: 5,
    }
  ];

  return (
    <div class="w-screen h-screen" style={{ background: `url(${bg})` , "background-size": 'cover', "background-position": 'center' }}>
      <div class="w-[90vw] text-center z-10 mx-auto">
        <div class='text-gray-300 text-[1.2vw] pb-[0vw] pt-[1vw] font-bold opacity-50'>
          {'CAMPEONATO HELLO WORLD | CARACAS OPEN #1 | LATAM | PLAYOFFS | WEEK 8'}
        </div>
        <Grid cols={7} class='pb-[0vw] pt-[1vw]'>{teams.map((team, index) => (
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
                  <img src={orangeScoreBlock} class="w-auto h-auto object-cover absolute inset-0 z-0" alt={team.name} />
                  <div class="absolute inset-0 z-10">
                    <div class="text-[color:#ff8a15] text-center text-[4vw] font-bold" style={{ top: '50%', left: '50%', transform: 'translate(-75%, -10%)'}}>
                      {game[0].score2}
                    </div>
                  </div>
                </Col>
                <Col class="relative">
                  <img src={orangeNameBlock} class="w-auto h-auto object-cover absolute inset-0 z-0" alt={team.name} />
                  <div class="absolute inset-0 z-10">
                    <div class="text-white text-center text-[2.5vw] text-nowrap" style={{ top: '50%', left: '50%', transform: 'translate(-70%, 15%)'}}>
                      {team.name}
                    </div>
                  </div>
                </Col>
                <Col class="relative">
                  <img src={orangeLogoBlock} class="w-auto h-auto object-cover absolute inset-0 z-0" alt={team.name} />
                  <div class="absolute inset-0 z-10">
                    <div class="text-white text-center text-[2.5vw] text-nowrap" style={{ top: '50%', left: '50%', transform: 'translate(0%, -15%)'}}>
                      <img src={team.pfp} class="w-fit h-fit scale-50 mb-[1vh]"/>
                    </div>
                  </div>
                </Col>
              </>
            ) : (
              <>
                <Col class="relative">
                  <img src={blueLogoBlock} class="w-auto h-auto object-cover absolute inset-0 z-0" alt={team.name} />
                  <div class="absolute inset-0 z-10">
                    <div class="text-white text-center text-[2.5vw] text-nowrap" style={{ top: '50%', left: '50%', transform: 'translate(0%, -15%)'}}>
                      <img src={team.pfp} class="w-fit h-fit scale-50 mb-[1vh]"/>
                    </div>
                  </div>
                </Col>
                <Col class="relative">
                  <img src={blueNameBlock} class="w-auto h-auto object-cover absolute inset-0 z-0" alt={team.name} />
                  <div class="absolute inset-0 z-10">
                    <div class="text-white text-center text-[2.5vw] text-nowrap" style={{ top: '50%', left: '50%', transform: 'translate(0%, 15%)'}}>
                      {team.name}
                    </div>
                  </div>
                </Col>
                <Col class="relative">
                  <img src={blueScoreBlock} class="w-auto h-auto object-cover absolute inset-0 z-0" alt={team.name} />
                  <div class="absolute inset-0 z-10">
                    <div class="text-[color:#22b0ff] text-center text-[4vw] font-bold" style={{ top: '50%', left: '50%', transform: 'translate(75%, -10%)'}}>
                      {game[0].score1}
                    </div>
                  </div>
                </Col>
              </>
            )}
          </>
          ))}
        </Grid>
        <Grid cols={3} class='pb-[0vw] pt-[5vw]'>
          <Col class="inset-0 z-10 relative flex items-center justify-center" style={{ top: '0%', left: '0%', transform: 'translate(55.4%, 10%)'}}>
            <img src={blueMatchWonBlock} class="max-w-[5vw] max-h-[1.5vw] object-contain" style={{ top: '50%', left: '50%', transform: 'translate(60%, 0%)'}}/>
            <img src={blueMatchWonBlock} class="max-w-[5vw] max-h-[1.5vw] object-contain" style={{ top: '50%', left: '50%', transform: 'translate(40%, 0%)'}}/>
            <img src={blueMatchWonBlock} class="max-w-[5vw] max-h-[1.5vw] object-contain" style={{ top: '50%', left: '50%', transform: 'translate(20%, 0%)'}}/>
            <img src={blueMatchWonBlock} class="max-w-[5vw] max-h-[1.5vw] object-contain" style={{ top: '50%', left: '50%', transform: 'translate(0%, 0%)'}}/>
          </Col>
          <Col class="relative">
            <div class="absolute inset-0 z-10">
              <div class="text-white text-center text-[1.5vw] text-nowrap" style={{ top: '50%', left: '50%', transform: 'translate(0%, -10%)'}}>
                {'JUEGO 2'}
              </div>
            </div>
          </Col>
          <Col class="inset-0 z-10 relative flex items-center justify-center" style={{ top: '0%', left: '0%', transform: 'translate(-63%, 10%)'}}>
            <img src={orangeMatchWonBlock} class="max-w-[5vw] max-h-[1.5vw] object-contain" style={{ top: '50%', left: '50%', transform: 'translate(60%, 0%)'}}/>
            <img src={orangeMatchWonBlock} class="max-w-[5vw] max-h-[1.5vw] object-contain" style={{ top: '50%', left: '50%', transform: 'translate(40%, 0%)'}}/>
            <img src={orangeMatchWonBlock} class="max-w-[5vw] max-h-[1.5vw] object-contain" style={{ top: '50%', left: '50%', transform: 'translate(20%, 0%)'}}/>
            <img src={orangeMatchWonBlock} class="max-w-[5vw] max-h-[1.5vw] object-contain" style={{ top: '50%', left: '50%', transform: 'translate(0%, 0%)'}}/>
          </Col>
        </Grid>
        <Grid cols={7} class="pb-[1vw] pt-[1vw] text-[2vw] font-semibold text-">
          {players.map((player, index) => {
            if (index < 3) {
              return (
                <Col span={1} class='pb-[1vw] pt-[1vw]'>
                  <div class='pb-[1vw] pt-[1vw] bg-gradient-to-b from-transparent from-0% via-transparent via-90% to-[color:#22b0ff] to-90%'>{player.name}</div>
                  <div class='pb-[1vw] pt-[1vw]'>{player.score}</div>
                  <div class='pb-[1vw] pt-[1vw]'>{player.goals}</div>
                  <div class='pb-[1vw] pt-[1vw]'>{player.assists}</div>
                  <div class='pb-[1vw] pt-[1vw]'>{player.shots}</div>
                  <div class='pb-[1vw] pt-[1vw]'>{player.saves}</div>
                </Col>
              );
            } else if (index === 3) {
              return (
                <>
                  <Col span={1} class='pb-[1vw] pt-[1vw]'>
                    <div class='pb-[1vw] pt-[1vw]'>Jugadores</div>
                    <div class='pb-[1vw] pt-[1vw]'>Puntos</div>
                    <div class='pb-[1vw] pt-[1vw]'>Goles</div>
                    <div class='pb-[1vw] pt-[1vw]'>Asistencias</div>
                    <div class='pb-[1vw] pt-[1vw]'>Tiros</div>
                    <div class='pb-[1vw] pt-[1vw]'>Salvadas</div>
                  </Col>
                  <Col span={1} class='pb-[1vw] pt-[1vw]'>
                    <div class='pb-[1vw] pt-[1vw] bg-gradient-to-b from-transparent from-0% via-transparent via-90% to-[color:#ff8a15] to-90%'>{player.name}</div>
                    <div class='pb-[1vw] pt-[1vw]'>{player.score}</div>
                    <div class='pb-[1vw] pt-[1vw]'>{player.goals}</div>
                    <div class='pb-[1vw] pt-[1vw]'>{player.assists}</div>
                    <div class='pb-[1vw] pt-[1vw]'>{player.shots}</div>
                    <div class='pb-[1vw] pt-[1vw]'>{player.saves}</div>
                </Col>
                </>
              );
            } else {
              return (
                <Col span={1} class='pb-[1vw] pt-[1vw]'>
                  <div class='pb-[1vw] pt-[1vw] bg-gradient-to-b from-transparent from-0% via-transparent via-90% to-orange-500 to-90%'>{player.name}</div>
                  <div class='pb-[1vw] pt-[1vw] '>{player.score}</div>
                  <div class='pb-[1vw] pt-[1vw]'>{player.goals}</div>
                  <div class='pb-[1vw] pt-[1vw]'>{player.assists}</div>
                  <div class='pb-[1vw] pt-[1vw]'>{player.shots}</div>
                  <div class='pb-[1vw] pt-[1vw]'>{player.saves}</div>
                </Col>
              );
            }
          })}
        </Grid>
      </div>
    </div>
  );
};

export default PostGame;