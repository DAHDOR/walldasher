import { Component } from 'solid-js';
import { Col, Grid } from "@components/ui/grid";
import wallpaperImage from './assets/Wallpaper.jpg';
import bg from './assets/PostGameBG.png';
import tableBG from './assets/roundRobin.svg'
import orangeWinning from './assets/orangeWinning.png'
import winningImage from './assets/lmao.png'

const PostGame: Component = () => {
  return (
    <div class="w-screen h-screen" style={{ background: `url(${orangeWinning})` , "background-size": 'cover', "background-position": 'center' }}>
      <div class="w-[90vw] text-center z-10 mx-auto">
        <div class="relative">
          <img src={winningImage} class="w-[34vw] h-[31vw] object-cover absolute inset-0 z-0 mx-auto pt-[3vw]"/>
        </div>
      </div>
    </div>
  );
};

export default PostGame;