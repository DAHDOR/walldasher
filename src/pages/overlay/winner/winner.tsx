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
  )
}

const LineBtoRight: Component<AnimatedSVGProps> = ({ setRef }) => {
  return (
    <svg ref={setRef} width="300" height="1080" style="position: absolute;">
      <g>
        <path
          style={`fill:#${ColorB};stroke-width:20;stroke-linecap:square;stroke-miterlimit:5.8;fill-opacity:1`}
          d="M 0,0 150,540 0,1080 H 150 L 300,540 150,0 Z"
          id="path1"
        />
      </g>
    </svg>
  )
}

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
  )
}

const LineBtoLeft: Component<AnimatedSVGProps> = ({ setRef }) => {
  return (
    <svg ref={setRef} width="300" height="1080" style="position: absolute;">
        <g transform="scale(-1 1) translate(-300 0)">
            <path
                style={`fill:#${ColorB};stroke-width:20;stroke-linecap:square;stroke-miterlimit:5.8;fill-opacity:1`}
                d="M 0,0 150,540 0,1080 H 150 L 300,540 150,0 Z"
                id="path1"
            />
        </g>
    </svg>
  )
}

const PostGame: Component = () => {
  const stats = useSnapshot()
  const length = 20
  const durationSecs = 5
  const extraSpaceMultiplier = 300 * 5
  const [svgElementsAtoRight, setSvgElementsAtoRight] = createSignal<(SVGSVGElement | undefined)[]>([])
  const [svgElementsBtoRight, setSvgElementsBtoRight] = createSignal<(SVGSVGElement | undefined)[]>([])
  const [svgElementsAtoLeft, setSvgElementsAtoLeft] = createSignal<(SVGSVGElement | undefined)[]>([])
  const [svgElementsBtoLeft, setSvgElementsBtoLeft] = createSignal<(SVGSVGElement | undefined)[]>([])
  const [showText, setShowText] = createSignal(false)

  onMount(() => {
    setTimeout(() => {
      setShowText(true)
      setTimeout(() => {
        setShowText(false);
      }, 3000);
    }, 2000)
    enter()
  })

  const start = gsap.timeline({paused: true, repeat: 0})

  const setStart = () => {
    svgElementsAtoRight().forEach((el, i) => {
      gsap.set(el, { x: -300 - 300 * i })
      start.to(el, { x: 960 + extraSpaceMultiplier - 300 * i, duration: durationSecs, ease: 'linear' }, 0)
    })

    svgElementsBtoRight().forEach((el, i) => {
      gsap.set(el, { x: -450 - 300 * i });
      start.to(el, { x: 810 + extraSpaceMultiplier- 300 * i, duration: durationSecs, ease: 'linear' }, 0)
    })

    svgElementsAtoLeft().forEach((el, i) => {
      gsap.set(el, { x: 300 + 300 * i });
      start.to(el, { x: -960 - extraSpaceMultiplier + 300 * i, duration: durationSecs, ease: 'linear' }, 0)
    })

    svgElementsBtoLeft().forEach((el, i) => {
      gsap.set(el, { x: 450 + 300 * i });
      start.to(el, { x: -810 - extraSpaceMultiplier + 300 * i, duration: durationSecs, ease: 'linear' }, 0)
    })

    start.play();
  }

  const enter = () => {
    setStart()
  }

  {if (stats().winner === stats().teams[0].name){
    ColorA = Blue
    ColorB = LightBlue
  } else {
    ColorA = Orange
    ColorB = LightOrange
  }}

  return (
    <>
      <div class="absolute w-[1920px] h-[1080px]">
        <div class="overflow-hidden flex flex-row absolute w-[960px] h-[1080px]">
          {Array.from({ length }, (_, index) => {
            if (index % 2 === 0) {
              return <LineAtoRight setRef={(el) => setSvgElementsAtoRight((prev) => [...prev, el])} />
            } else {
              return <LineBtoRight setRef={(el) => setSvgElementsBtoRight((prev) => [...prev, el])} />
            }
          })}
        </div>
        <div class="overflow-hidden flex flex-row-reverse absolute w-[960px] h-[1080px] translate-x-[960px]">
          {Array.from({ length }, (_, index) => {
            if (index % 2 === 0) {
              return <LineAtoLeft setRef={(el) => setSvgElementsAtoLeft((prev) => [...prev, el])} />
            } else {
              return <LineBtoLeft setRef={(el) => setSvgElementsBtoLeft((prev) => [...prev, el])} />
            }
          })}
        </div>
        <div class="absolute w-[1920px] h-[1080px] flex items-center justify-center text-[100px] font-[chivo] text-center">
          <div class={`text-black transition-opacity duration-1000 ${showText() ? "opacity-100" : "opacity-0"}`}>
            <div class="font-bold uppercase">Ganador</div>
            <div>{stats().winner}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostGame;