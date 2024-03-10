"use client"
import Image from 'next/image';
import Logo from '@/public/HPP-Logo.png';
import QrCode from '@/components/QrCode';
import Background_cards_fade from "@/public/hpp_stock_cards-002-Edit.png";
import Background_cards_fade2 from "@/public/hpp_stock_cards-004.jpg";
import { useState } from 'react';

const reference_cardanimation = "https://codepen.io/candroo/pen/NvJZNx";

export default function Home() {

  const [spread, setSpread] = useState(false);

  return (
    <div className="h-screen flex flex-col items-center relative overflow-hidden scroll-m-0 overscroll-auto">
      <div className='absolute w-full h-[40%] top-[60%] bg-gradient-to-b from-transparent to-white black -z-10'></div>
      <Image src={Background_cards_fade2} alt="Card Background" priority className='absolute -z-20 ' />
      <div className='mt-40'>
        <h1 className='p-1 text-4xl text-black font-bold drop-shadow-lg'>Time to Plan</h1>
      </div>
      <div className="mt-32">
        <h1 className="text-2xl w-[7rem] px-1 text-center border border-red-300">Hybrid</h1>
        <h1 className="text-2xl ml-[7rem] w-[7rem] px-1 text-center border border-red-300">Planning</h1>
        <h1 className="text-2xl ml-[14rem] w-[7rem] px-1 text-center border border-red-300">Poker</h1>
        <Image className="absolute bottom-0 left-0 w-[7rem]" src={Logo} alt="Logo" width={1000} height={1000} />
      </div>
      <>
        <div className="perspective" >
          <div className={`card-container ${spread ? 'spread' : ''}`} onClick={() => setSpread(!spread)}>
            <div className='card card-card1'>
              <div className='card__face card__face--top'>
                <span className='card__value'>
                  8
                </span>
              </div>
              <div className='card__face card__face--btm'>
                <span className='card__value'>
                  8
                </span>

              </div>
            </div>
            <div className='card card-card2'>
              <div className='card__face card__face--top'>
                <span className='card__value'>
                  13
                </span>
              </div>
              <div className='card__face card__face--btm'>
                <span className='card__value'>
                  13
                </span>
              </div>
            </div>
            <div className='card card-card3'>
              <div className='card__face card__face--top'>
                <span className='card__value'>
                  ?
                </span>
              </div>
              <div className='card__face card__face--btm'>
                <span className='card__value'>
                  ?
                </span>
              </div>
            </div>
            <div className='card card-card4'>
              <div className='card__face card__face--top'>
                <span className='card__value'>
                  HPP
                </span>
              </div>
              <div className='h-full flex flex-col items-center justify-center gap-2'>
                <button className='p-1 bg-red-600 rounded-md' onClick={() =>  push }>Test1 </button>
                <button className='p-1 bg-red-600 rounded-md'>Test2 </button>
              </div>
              <div className='card__face card__face--btm'>
                <span className='card__value'>
                  HPP
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
      <p>A hybrid planning poker app for remote teams</p>
    </div>
  );
}
