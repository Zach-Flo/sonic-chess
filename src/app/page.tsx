"use client"
import 'regenerator-runtime/runtime'
import { gsap } from "gsap";
import { useEffect, useState } from 'react'
import './components/randomColorDIvs'
import { useRouter } from 'next/navigation';
import RandomColorDivs from './components/randomColorDIvs'
import { get } from 'http'



export default function App() {
  return (
    <StartUp></StartUp>
  );
}



function StartUp() {
  const [trigger, setTrigger] = useState(false);
  const navigateToAbout = async () => {
    await aboutAnimation()
    setTrigger(trigger => !trigger);
  }

  const aboutAnimation = () => {
    return new Promise((resolve) =>{ 
      let tl = gsap.timeline()
      tl.to('.about-button', {
      rotation: 80, // Rotate 360 degrees (clockwise)
      duration: 1,
      transformOrigin: 'left center', // Set rotation point to the left side
      ease: 'bounce.out', // Use your desired easing function})
      });
      tl.to('.about-button', { y: "2500%", rotation:180, duration:2, ease:"power1.in"});
      tl.to(".bar", {height:"20rem", ease:"power1.out", duration: 1.5, onComplete:resolve})
      tl.to(".bar", {height:"20rem", boxShadow:"none", backgroundColor:"transparent", duration: 3})
      tl.to(".bar", {height:"0rem",zIndex:0, duration: 1})
    });
  };


  const router = useRouter();
  const navigateToPlayPage = async () => {
    await runExitAnimation()
    router.push('/play');
  };

  const runExitAnimation = () => {
    return new Promise((resolve) => {
      // Your GSAP animation code here
      gsap.to(".bar", {
        duration: 2.5,
        height: 2000,
        backgroundColor: 'black',
        ease: "slow(0.7,0.7,false)",
        onComplete: resolve, // Resolve the promise when the animation is complete
      });
    });
  };

  const colors: string[] = [];

    for (let i = 0; i < 100; i++) {
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
        colors.push(randomColor);
    }
  
  useEffect(() => {
    // Animation for the background
    gsap.to(".background", { opacity: 1, duration:2, ease: "slow.out" });
    gsap.to(".title, span", {duration:1, opacity:1})
    let tl = gsap.timeline()
    
    tl.to(".title, span", {
      duration: 1, 
      translateY: 200,
      ease: "power4.in",
      stagger: .1,
    });

    tl.to(".sub-title", {
      duration: 1, 
      translateY: 300
      })
    
    // Function to get a random height value
    function getRandomHeight(): number {
      return Math.random() * 150 + 70; // You can adjust the range as needed
    }

    function getRandomColor(): string {
      return colors[0]
    }

    const bars = document.querySelectorAll('.bar'); // Assuming you have multiple bars with the class 'bar'

      // Update the height dynamically on each repeat for each bar
    bars.forEach((bar) => {
      let tween = gsap.to(bar, { height: getRandomHeight, duration: 1.3, backgroundColor: colors.pop(), ease:'back.in(4)', repeat:-1, repeatRefresh: true });
    });
  
    
    
  }, []); // Empty dependency array ensures the useEffect runs once after the component mounts

  return (
    <>
    <div className= 'bg-black'>
    <div className=' background relative flex min-h-screen bg-slate-500 justify-center items-center opacity-0'>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
        <div className='absolute -top-40 font-mono inline-block text-7xl font-extralight'>
            <div className="title opacity-0 p-2 inline-block">C</div>
            <div className="title opacity-0 p-2 inline-block">h</div>
            <div className="title opacity-0 p-2 inline-block">e</div>
            <div className="title opacity-0 p-2 inline-block">s</div>
            <div className="title opacity-0 p-2 inline-block">s</div>
        </div>
        <div className='flex justify-center items-center '>
          <div className='sub-title absolute -top-40 font-mono text-2xl font-extralight p-2 ml-12'>Use your voice to play!</div>
        </div>
      <nav  className=' nav text-center font-mono'>
        <ul>
          <button onClick={() => navigateToPlayPage()} className=' mb-5'>
            play
          </button>
          <br></br>
          <button onClick={() => navigateToAbout()} className='about-button'>
            about
          </button>
        </ul>
      </nav>
    
        
      


      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}

    </div>
    </div>
    <RandomColorDivs trigger={trigger}/>
    </>
  );
}
