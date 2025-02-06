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
import matchBlock from './assets/matchBlock.svg';

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
      name: "Equipo A",
      pfp: wallpaperImage,
      players: 3
    },
    {
      id: 0,
      name: "Equipo B",
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
      <div class="w-[80vw] text-center z-10 mx-auto">
        <Grid cols={7} class='pb-[0vh] pt-[10vh]'>{teams.map((team, index) => (
          <>
            {index === 1 ? (
              <>
                <Col>
                  <div class='leading-none m-0 p-0'>
                    <span class='text-[6vh]'>JUEGO</span><br/>
                    <span class='text-[4vh]'>{game[0].id}</span>
                  </div>
                </Col>
                <Col class='relative'>
                  <img src={orangeScoreBlock} class='w-auto h-auto object-cover inset-0 z-0'/>
                  <div class="absolute inset-0 flex items-center justify-center z-10">
                    <div class='text-orange-500 text-center text-[8vh] mb-[1vh] pr-[8vw] font-bold'>
                      {game[0].score2}
                    </div>
                  </div>
                </Col>
                <Col class='relative'>
                  <img src={orangeNameBlock} class='w-auto h-auto object-cover inset-0 z-0'/>
                  <div class="absolute inset-0 flex items-center justify-center z-10">
                    <div class='text-white text-center text-[5vh] mb-[1vh]'>
                      {team.name}
                    </div>
                  </div>
                </Col>
                <Col class='relative'>
                  <img src={orangeLogoBlock} class='w-auto h-auto object-cover inset-0 z-0'/>
                  <div class="absolute inset-0 flex items-center justify-center z-10">
                    <img src={team.pfp} class="w-fit h-fit scale-50 mb-[1vh]"/>
                  </div>
                </Col>
              </>
            ) : (
              <>
                <Col class='relative'>
                  <img src={blueLogoBlock} class='w-auto h-auto object-cover inset-0 z-0'/>
                  <div class="absolute inset-0 flex items-center justify-center z-10">
                    <img src={team.pfp} class="w-fit h-fit scale-50 mb-[1vh]"/>
                  </div>
                </Col>
                <Col class='relative'>
                  <img src={blueNameBlock} class='w-auto h-auto object-cover inset-0 z-0'/>
                  <div class="absolute inset-0 flex items-center justify-center z-10">
                    <div class='text-white text-center text-[5vh] mb-[1vh]'>
                      {team.name}
                    </div>
                  </div>
                </Col>
                <Col class='relative'>
                  <img src={blueScoreBlock} class='w-auto h-auto object-cover inset-0 z-0'/>
                  <div class="absolute inset-0 flex items-center justify-center z-10">
                    <div class='text-blue-500 text-center text-[8vh] mb-[1vh] pl-[8vw] font-bold'>
                      {game[0].score1}
                    </div>
                  </div>
                </Col>
              </>
            )}
          </>
          ))}
        </Grid>
        <div class="w-[80vw] h-[4vh] mx-auto flex justify-center items-center">
          <div class="flex items-center">
            <img class="size-[8vh]" src={matchBlock}/>
            <img class="size-[8vh]" src={matchBlock}/>
            <img class="size-[8vh]" src={blueMatchWonBlock}/>
            <img class="size-[8vh]" src={blueMatchWonBlock}/>
          </div>
          <div class="px-[7.8vw]" textContent={'Mejor de 7'}></div>
          <div class="flex items-center">
            <img class="size-[8vh]" src={orangeMatchWonBlock}/>
            <img class="size-[8vh]" src={orangeMatchWonBlock}/>
            <img class="size-[8vh]" src={orangeMatchWonBlock}/>
            <img class="size-[8vh]" src={matchBlock}/>
          </div>
        </div>
        <Grid cols={7} class="pb-[5vh] pt-[5vh] text-[4vh] font-semibold text-">
          {players.map((player, index) => {
            if (index < 3) {
              return (
                <Col span={1} class='pb-[1vh] pt-[1vh]'>
                  <div class='pb-[1vh] pt-[1vh] bg-gradient-to-b from-transparent from-0% via-transparent via-90% to-blue-500 to-90%'>{player.name}</div>
                  <div class='pb-[1vh] pt-[1vh]'>{player.score}</div>
                  <div class='pb-[1vh] pt-[1vh]'>{player.goals}</div>
                  <div class='pb-[1vh] pt-[1vh]'>{player.assists}</div>
                  <div class='pb-[1vh] pt-[1vh]'>{player.shots}</div>
                  <div class='pb-[1vh] pt-[1vh]'>{player.saves}</div>
                </Col>
              );
            } else if (index === 3) {
              return (
                <>
                  <Col span={1} class='pb-[1vh] pt-[1vh]'>
                    <div class='pb-[1vh] pt-[1vh]'>Jugadores</div>
                    <div class='pb-[1vh] pt-[1vh]'>Puntos</div>
                    <div class='pb-[1vh] pt-[1vh]'>Goles</div>
                    <div class='pb-[1vh] pt-[1vh]'>Asistencias</div>
                    <div class='pb-[1vh] pt-[1vh]'>Tiros</div>
                    <div class='pb-[1vh] pt-[1vh]'>Salvadas</div>
                  </Col>
                  <Col span={1} class='pb-[1vh] pt-[1vh]'>
                    <div class='pb-[1vh] pt-[1vh] bg-gradient-to-b from-transparent from-0% via-transparent via-90% to-orange-500 to-90%'>{player.name}</div>
                    <div class='pb-[1vh] pt-[1vh]'>{player.score}</div>
                    <div class='pb-[1vh] pt-[1vh]'>{player.goals}</div>
                    <div class='pb-[1vh] pt-[1vh]'>{player.assists}</div>
                    <div class='pb-[1vh] pt-[1vh]'>{player.shots}</div>
                    <div class='pb-[1vh] pt-[1vh]'>{player.saves}</div>
                </Col>
                </>
              );
            } else {
              return (
                <Col span={1} class='pb-[1vh] pt-[1vh]'>
                  <div class='pb-[1vh] pt-[1vh] bg-gradient-to-b from-transparent from-0% via-transparent via-90% to-orange-500 to-90%'>{player.name}</div>
                  <div class='pb-[1vh] pt-[1vh]'>{player.score}</div>
                  <div class='pb-[1vh] pt-[1vh]'>{player.goals}</div>
                  <div class='pb-[1vh] pt-[1vh]'>{player.assists}</div>
                  <div class='pb-[1vh] pt-[1vh]'>{player.shots}</div>
                  <div class='pb-[1vh] pt-[1vh]'>{player.saves}</div>
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