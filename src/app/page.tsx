"use client"
import Link from 'next/link'
import Home from "../../pages/home"
import Play from "../../pages/play"
import 'regenerator-runtime/runtime'
import { gsap } from "gsap";
import { useEffect, useState } from 'react'



export default function App() {
  return (
    <StartUp></StartUp>
  );
}

function StartUp() {
  
  useEffect(() => {
    // Animation for the background
    gsap.to(".background", { opacity: 1, duration:2, ease: "slow.out" });
    gsap.to(".title, span", {duration:2, opacity:1})
    let tl = gsap.timeline()
    
    tl.to(".title, span", {
      duration: 1.5, 
      translateY: 200,
      ease: "power4.in",
      stagger: .1,
    });
   
    let tlSound = gsap.timeline({repeat:-1})
    tlSound.yoyo(true)
    tlSound.to(".bar", {height: '44rem', duration:2})
    
    
  }, []); // Empty dependency array ensures the useEffect runs once after the component mounts

  return (
    <div className=' bg-black'>
    <div className=' background relative flex min-h-screen bg-black justify-center items-center opacity-0'>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
        <div className='absolute -top-40 font-mono inline-block text-7xl font-extralight'>
        <div className="title opacity-0 p-2 inline-block">V</div>
        <div className="title opacity-0 p-2 inline-block">o</div>
        <div className="title opacity-0 p-2 inline-block">i</div>
        <div className="title opacity-0 p-2 inline-block">c</div>
        <div className="title opacity-0 p-2 inline-block">e</div>
        <div className="title opacity-0 p-2 inline-block">&nbsp;</div> 
        <div className="title opacity-0 p-2 inline-block">C</div>
        <div className="title opacity-0 p-2 inline-block">h</div>
        <div className="title opacity-0 p-2 inline-block">e</div>
        <div className="title opacity-0 p-2 inline-block">s</div>
        <div className="title opacity-0 p-2 inline-block">s</div>
        </div>

      <nav  className=' nav text-center '>
        <ul>
        <li>
            <Link href="/play">Play</Link>
          </li>
          <li>
            <Link href="/home">About</Link>
          </li>
        </ul>
      </nav>

      <div className='absolute bottom-0 h-44 w-screen'>
        <div className='bar bg-red-400 w-1/20 h-1/2 inline-block'></div>
        <div className='bar bg-red-500 w-1/20 h-2/5 inline-block'></div>
        <div className='bar bg-blue-500 w-1/20 h-2/6 inline-block'></div>
        <div className='bar bg-red-500 w-1/20 h-1/6 inline-block'></div>
        <div className='bar bg-amber-600 w-1/20 h-1/3 inline-block'></div>
        <div className='bar bg-teal-400 w-1/20 h-3/5 inline-block'></div>
        <div className='bar bg-lime-300 w-1/20 h-4/5 inline-block'></div>
        <div className='bar bg-red-500 w-1/20 h-full inline-block'></div>
        <div className='bar bg-purple-500 w-1/20 h-3/4 inline-block'></div>
        <div className='bar bg-pink-500 w-1/20 h-1/2 inline-block'></div>
        <div className='bar bg-indigo-400 w-1/20 h-3/5 inline-block'></div>
        <div className='bar bg-purple-200 w-1/20 h-5/6 inline-block'></div>
        <div className='bar bg-yellow-500 w-1/20 h-2/3 inline-block'></div>
        <div className='bar bg-cyan-600 w-1/20 h-2/5 inline-block'></div>
        <div className='bar bg-gray-500 w-1/20 h-1/6 inline-block'></div>
        <div className='bar bg-orange-400 w-1/20 h-2/5 inline-block'></div>
        <div className='bar bg-rose-600 w-1/20 h-2/3 inline-block'></div>
        <div className='bar bg-violet-500 w-1/20 h-1/3 inline-block'></div>
        <div className='bar bg-emerald-500 w-1/20 h-3/5 inline-block'></div>
        <div className='bar bg-fuchsia-500 w-1/20 h-full inline-block'></div>
      </div>


      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}

    </div>
    </div>
  );
}
