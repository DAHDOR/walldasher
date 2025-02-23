import { Component } from 'solid-js';
import { Col, Grid } from "@components/ui/grid";
import wallpaperImage from './assets/Wallpaper.jpg';
import bg from './assets/PostGameBG.png';
import tableBG from './assets/roundRobin.svg'

const PostGame: Component = () => {
  interface TeamData {
    id: number;
    name: string;
    pfp: string;
    players: number;
  }

  const teams: TeamData[] = [
    {
      id: 1,
      name: "Equipo Exagerado A",
      pfp: wallpaperImage,
      players: 27
    },
    {
      id: 2,
      name: "Equipo Exagerado B",
      pfp: wallpaperImage,
      players: 22
    },
    {
      id: 3,
      name: "Equipo Exagerado C",
      pfp: wallpaperImage,
      players: 18
    },
    {
      id: 4,
      name: "Equipo Exagerado D",
      pfp: wallpaperImage,
      players: 17
    },
    {
      id: 5,
      name: "Equipo Exagerado E",
      pfp: wallpaperImage,
      players: 10
    },
    {
      id: 6,
      name: "Equipo Exagerado F",
      pfp: wallpaperImage,
      players: 9
    },
    {
      id: 7,
      name: "Equipo Exagerado G",
      pfp: wallpaperImage,
      players: 8
    },
    {
      id: 8,
      name: "Equipo Exagerado H",
      pfp: wallpaperImage,
      players: 7
    },
    {
      id: 9,
      name: "Equipo Exagerado I",
      pfp: wallpaperImage,
      players: 6
    },
    {
      id: 10,
      name: "Equipo Exagerado J",
      pfp: wallpaperImage,
      players: 5
    },
    {
      id: 11,
      name: "Equipo Exagerado K",
      pfp: wallpaperImage,
      players: 4
    }
  ]

  return (
    // <div class="w-screen h-screen" style={{ background: `url(${bg})` , "background-size": 'cover', "background-position": 'center' }}>
    <div class="w-screen h-screen">
      <div class="w-[75vw] text-center z-10 mx-auto pt-[5vw]">
        <Col class="relative">
          <img src={tableBG} class="w-[60vw] h-auto object-cover absolute inset-0 z-0 mx-auto pt-[5vw]"/>
          <div class="absolute inset-0 z-10">
            <div class="text-white text-center text-[2.5vw] text-nowrap px-[10vw] mx-auto leading-none" style={{ top: '50%', left: '50%', transform: 'translate(0%,-5%)'}}>
              <div class='pt-[8vw] text-[3vw] font-semibold text-left text-[color:#22b0ff]'>
                {"LIGA BLA BLA BLA"}
              </div>
              <Grid cols={2}>
                <Col span={1}>
                  <div class='pt-[0vw] text-[2.5vw] text-left text-[color:#22b0ff]'>
                    {"WEEK 8"}
                  </div>
                </Col>
                <Col span={1}>
                  <div class='pt-[1vw] pr-[6.5vw] text-[1.5vw] font-semibold text-right text-[color:#22b0ff]'>
                    {"POINTS"}
                  </div>
                </Col>
              </Grid>
              <Grid cols={3} class="pb-[1vw] pt-[1vw] text-[1.5vw] font-semibold leading-[2vw]">
                {teams.map((team, index) => {
                  if (index > 0 && index < 10) {
                    return (
                      <>
                        <Col span={1} class=''>
                          <div class=''>{team.id}</div>
                        </Col>
                        <Col span={1} class='text-left'>
                          <div class=''>{team.name}</div>
                        </Col>
                        <Col span={1} class=''>
                          <div class=''>{team.players}</div>
                        </Col>
                      </>
                    );
                  } else if (index == 0){
                    return(
                      <>
                        <Col span={1} class=''>
                          <div class='bg-white text-black'>{team.id}</div>
                        </Col>                      
                        <Col span={1} class='text-left'>
                          <div class='bg-white text-black'>{team.name}</div>
                        </Col>
                        <Col span={1} class=''>
                          <div class='bg-white text-black'>{team.players}</div>
                        </Col>
                      </>
                    );
                  }else {
                    return (
                      <>
                        {/* <Col span={1} class='pb-[1vw] pt-[1vw]'>
                          <div class='pb-[1vw] pt-[1vw] bg-gradient-to-b from-transparent from-0% via-transparent via-90% to-orange-500 to-90%'>{team.name}</div>
                        </Col>
                        <Col span={1} class='pb-[1vw] pt-[1vw]'>
                          <div class='pb-[1vw] pt-[1vw] bg-gradient-to-b from-transparent from-0% via-transparent via-90% to-orange-500 to-90%'>{team.name}</div>
                        </Col>
                        <Col span={1} class='pb-[1vw] pt-[1vw]'>
                          <div class='pb-[1vw] pt-[1vw] bg-gradient-to-b from-transparent from-0% via-transparent via-90% to-orange-500 to-90%'>{team.name}</div>
                        </Col> */}
                      </>
                    );
                  }
                })}
              </Grid>
            </div>
          </div>
        </Col>
      </div>
    </div>
  );
};

export default PostGame;