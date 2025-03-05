import { useSnapshot } from '@/contexts/snapshot';
import { Component, createEffect, onMount, createSignal } from 'solid-js';
import orangeVideo from './assets/orangeWinning.webm';

const PostGame: Component = () => {
  const stats = useSnapshot();
  const snapState = () => stats();
  const [videoLoaded, setVideoLoaded] = createSignal(false);

  document.addEventListener('DOMContentLoaded', function() {
    const fadeDiv1 = document.getElementById('fadeDiv1');
    setTimeout(function() {
      fadeDiv1.classList.add('opacity-100');
    }, 1000);
    const fadeDiv2 = document.getElementById('fadeDiv2');
    setTimeout(function() {
      fadeDiv2.classList.add('opacity-100');
    }, 1000);
  });

  createEffect(() => {
    console.log('winner abajo');
    console.log(snapState());
  });
  {
    console.log('winner abajo');
  }
  {
    console.log(snapState());
  }

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  return (
    <>
      <div class="absolute w-[1920px] h-[1080px] flex items-center justify-center overflow-hidden z-0">
        <video
          src={orangeVideo}
          autoplay={true}
          loop
          class="z-10 w-auto min-w-full min-h-full max-w-none"
          onloadeddata={handleVideoLoaded}
          muted
        >
        </video>
      </div>
      <div class='absolute w-[1920px] text-center pt-[380px] text-[100px] z-10'>
        <div id="fadeDiv1" class="opacity-0 transition-opacity delay-1000 duration-250 ease-in-out text-black font-[chivo] uppercase font-bold">
          Winner
        </div>
        <div id="fadeDiv2" class="opacity-0 transition-opacity delay-1000 duration-250 ease-in-out text-black font-[chivo] uppercase">
          hello world
          {/* {stats().winner} */}
        </div>
      </div>
    </>
  );
};

export default PostGame;