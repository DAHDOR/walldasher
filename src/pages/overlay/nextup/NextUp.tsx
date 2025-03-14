import { createSignal, onMount } from "solid-js";
import gsap from "gsap";

const StarBackground = () => {
  const [lightOrangeStar, setLightOrangeStar] = createSignal(`
    <svg
      width="50"
      height="200"
      viewBox="0 0 50 200"
      version="1.1"
      id="svg1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg">
      <defs
        id="defs1" />
      <g
        id="layer1">
        <path
          style="fill:#ffbc00;stroke-width:14.1421;stroke-linecap:square;stroke-miterlimit:5.8;fill-opacity:1"
          d="M 0,200 12.5,100 50,0 37.5,100 0,200"
          id="path2" />
      </g>
    </svg>`
  );
  const [lightBlueStar, setLightBlueStar] = createSignal(`
    <svg
      width="50"
      height="200"
      viewBox="0 0 50 200"
      version="1.1"
      id="svg1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg">
      <defs
        id="defs1" />
      <g
        id="layer1">
        <path
          style="fill:#36d0ff;stroke-width:14.1421;stroke-linecap:square;stroke-miterlimit:5.8;fill-opacity:1"
          d="M 0,200 12.5,100 50,0 37.5,100 0,200"
          id="path2" />
      </g>
    </svg>
    `);
  const [orangeStar, setOrangeStar] = createSignal(`
    <svg
      width="50"
      height="200"
      viewBox="0 0 50 200"
      version="1.1"
      id="svg1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg">
      <defs
        id="defs1" />
      <g
        id="layer1">
        <path
          style="fill:#ff8a15;stroke-width:14.1421;stroke-linecap:square;stroke-miterlimit:5.8;fill-opacity:1"
          d="M 0,200 12.5,100 50,0 37.5,100 0,200"
          id="path2" />
      </g>
    </svg>`
  );
  const [blueStar, setBlueStar] = createSignal(`
    <svg
      width="50"
      height="200"
      viewBox="0 0 50 200"
      version="1.1"
      id="svg1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg">
      <defs
        id="defs1" />
      <g
        id="layer1">
        <path
          style="fill:#22b0ff;stroke-width:14.1421;stroke-linecap:square;stroke-miterlimit:5.8;fill-opacity:1"
          d="M 0,200 12.5,100 50,0 37.5,100 0,200"
          id="path2" />
      </g>
    </svg>`
  );

  onMount(() => {
    const numStars = 50;
    const container = document.getElementById("starry-sky");

    if (!container) return;

    const stars = [lightOrangeStar, lightBlueStar, orangeStar, blueStar];

    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div");
      const randomStar = stars[Math.floor(Math.random() * stars.length)];
      star.innerHTML = randomStar();
      star.style.position = "absolute";
      star.style.pointerEvents = "none";

      const x = Math.random() * 1820;
      const y = Math.random() * 880;
      const opacity = Math.random()/2;

      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      star.style.opacity = opacity.toString();

      container.appendChild(star);

      const flicker = () => {
        const fadeInDuration = Math.random() * 10;
        const fadeOutDuration = Math.random() * 10;
        const delay = Math.random() * 5;

        gsap.to(star, {
          opacity: 0.5,
          duration: fadeInDuration,
          ease: "power1.inOut",
          onComplete: () => {
            gsap.to(star, {
              opacity: 0,
              duration: fadeOutDuration,
              ease: "power1.inOut",
              onComplete: () => {
                setTimeout(flicker, delay * 1000);
              },
            });
          },
        });
      };

      flicker();
    }
  });

  return <div id="starry-sky" class='bg-red-600 fixed top-0 left-0 w-[1920px] h-[1080px] overflow-hidden'></div>;
};

export default StarBackground;

// import blueNextGame from './assets/nextGameBlue.svg'
// import orangeNextGame from './assets/nextGameOrange.svg'
// import logoNextGame from './assets/logoNextGame.svg'
// import { useMatchState } from '@/contexts/matchState'
// import { Component, Show } from 'solid-js'

// const matchState = useMatchState();

// const NextGameComponent: Component<{}> = (props) => {
//   return (
//     <>
//       <div class='relative flex'>
//         <div class="w-[100px] h-[100px] relative flex justify-center items-center">
//           <img src={logoNextGame} class="w-full h-full object-cover absolute inset-0 z-0"></img>
//           <img src={matchState().blue.logo_url} class="w-fit h-fit z-10 text-[50px]"></img>
//         </div>
//         <div class="w-[200px] h-[100px] relative flex justify-center items-center">
//           <img src={blueNextGame} class="w-full h-full object-cover absolute inset-0 z-0" />
//           <div class='w-fit h-fit z-10 text-[25px] text-center'>{'Team A'}</div>
//         </div>
//         <div class='w-[50px] h-[100px]'></div>
//         <div class="w-[200px] h-[100px] relative flex justify-center items-center">
//           <img src={orangeNextGame} class="w-full h-full object-cover absolute inset-0 z-0"/>
//           <div class='w-fit h-fit z-10 text-[25px] text-center'>{'Team B'}</div>
//         </div>
//         <div class="w-[100px] h-[100px] relative flex justify-center items-center">
//           <img src={logoNextGame} class="w-full h-full object-cover absolute inset-0 z-0"></img>
//           <img src={matchState().orange.logo_url} class="w-fit h-fit z-10 text-[50px]"></img>
//         </div>
//       </div>
//     </>
//   )
// }

// const NextUp = () => {
//   return(
//     <div class='w-[1920px] h-[1080px] bg-red-900 flex flex-col items-center justify-center space-y-[25px]'>
//       {Array.from({ length: 4 }, (_, i) => {
//         return <NextGameComponent/>
//       })}
//     </div>
//   )
// }

// export default NextUp;