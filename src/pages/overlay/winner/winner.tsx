import { useSnapshot } from '@/contexts/snapshot';
import { Component, createSignal, onMount } from 'solid-js';
import gsap from 'gsap';

let Blue = '22b0ff';
let LightBlue = '36d0ff';
let Orange = 'ff8a15';
let LightOrange = 'ffbc00';

let ColorA = Blue;
let ColorB = LightBlue;

interface AnimatedSVGProps {
  setRef: (el: SVGSVGElement) => void
}

const LineAtoRight: Component<AnimatedSVGProps> = ({ setRef }) => {
  return (
    <svg ref={setRef} width="300" height="1080" style="position: absolute;">
      <g>
        <path
          style={`fill:#${ColorA};stroke-width:20;stroke-linecap:square;stroke-miterlimit:5.8;fill-opacity:1`}
          d="M 0,0 150,540 0,1080 H 150 L 300,540 150,0 Z"
          id="path1"
        />
      </g>
    </svg>
  );
};

const LineBtoRight: Component<AnimatedSVGProps> = ({ setRef }) => {
  return (
    <svg ref={setRef} width="300" height="1080" style="position: absolute;">
      <g>
        <path
          style={`fill:#${ColorB};stroke-width:20;stroke-linecap:square;stroke-miterlimit:5.8;fill-opacity:1`}
          d="M 0,0 150,540 0,1080 H 150 L 300,540 150,0 Z"
          id="path1"
        />
      </g>\
    </svg>
  );
};

const LineAtoLeft: Component<AnimatedSVGProps> = ({ setRef }) => {
  return (
    <svg ref={setRef} width="300" height="1080" style="position: absolute;">
        <g transform="scale(-1 1) translate(-300 0)">
            <path
                style={`fill:#${ColorA};stroke-width:20;stroke-linecap:square;stroke-miterlimit:5.8;fill-opacity:1`}
                d="M 0,0 150,540 0,1080 H 150 L 300,540 150,0 Z"
                id="path1"
            />
        </g>
    </svg>
  );
};

const LineBtoLeft: Component<AnimatedSVGProps> = ({ setRef }) => {
  return (
    <svg ref={setRef} width={300} height="1080" style="position: absolute;">
        <g transform="scale(-1 1) translate(-300 0)">
            <path
                style={`fill:#${ColorB};stroke-width:20;stroke-linecap:square;stroke-miterlimit:5.8;fill-opacity:1`}
                d="M 0,0 150,540 0,1080 H 150 L 300,540 150,0 Z"
                id="path1"
            />
        </g>
    </svg>
  );
};

const PostGame: Component = () => {
  const stats = useSnapshot();
  const [svgElementAtoRight, setSvgElementAtoRight] = createSignal<SVGSVGElement | undefined>();
  const [svgElementBtoRight, setSvgElementBtoRight] = createSignal<SVGSVGElement | undefined>();
  const [svgElementAtoLeft, setSvgElementAtoLeft] = createSignal<SVGSVGElement | undefined>();
  const [svgElementBtoLeft, setSvgElementBtoLeft] = createSignal<SVGSVGElement | undefined>();

  onMount(() => {
    enter();
  });

  const start = gsap.timeline({ paused: true , repeat: -1});

  const setStart = () => {
    gsap.set(svgElementAtoRight(),{ x: -300})
    gsap.set(svgElementBtoRight(),{ x: -450})
    gsap.set(svgElementAtoLeft(),{ x: 0})
    gsap.set(svgElementBtoLeft(),{ x: 150})
    start.to(svgElementAtoRight(), { x: 960, duration: 5, ease: 'linear' }, 0);
    start.to(svgElementBtoRight(), { x: 810, duration: 5, ease: 'linear' }, 0);
    start.to(svgElementAtoLeft(), { x: -1260, duration: 5, ease: 'linear' }, 0);
    start.to(svgElementBtoLeft(), { x: -1110, duration: 5, ease: 'linear' }, 0);
    start.play();
  };

  const enter = () => {
    setStart();
  };

  return (
    <>
      <div class="absolute w-[1920px] h-[1080px]">
        <div class='overflow-hidden flex flex-row absolute w-[960px] h-[1080px] bg-red-800'>
          {Array.from({ length: 2 }, (_, index) => {
            if (index % 2 === 0){
              return(
                <div>
                  <LineAtoRight setRef={setSvgElementAtoRight}/>
                </div>
              )
            } else {
              return(
                <div>
                  <LineBtoRight setRef={setSvgElementBtoRight}/>
                </div>
              )
            }
          })}
        </div>
        <div class='overflow-hidden flex flex-row-reverse absolute w-[960px] h-[1080px] translate-x-[960px] bg-green-400'>
          {Array.from({ length: 2 }, (_, index) => {
            if (index % 2 === 0){
              return(
                <div>
                  <LineAtoLeft setRef={setSvgElementAtoLeft}/>
                </div>
              )
            } else {
              return(
                <div>
                  <LineBtoLeft setRef={setSvgElementBtoLeft}/>
                </div>
              )
            }
          })}
        </div>
      </div>
    </>
  );
};

export default PostGame;