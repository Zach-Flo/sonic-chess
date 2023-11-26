import { useState } from 'react';

const RandomColorDivs = () => {
  const numberOfBars =100;

  
  const bars = Array.from({ length: numberOfBars }, (_, index) => ({
    id: index,
  }));

  return (
    <div className='absolute flex flex-wrap-reverse bottom-0 h-64 w-screen shadow-inner'>
      {bars.map((bar) => (
        <div key={bar.id} className={`bar w-1/100 h-0 inline-block`}></div>
      ))}
    </div>
  );
};

export default RandomColorDivs;