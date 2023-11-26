import { useState, useEffect } from 'react';

const RandomColorDivs = (props: any) => {
  
  const [renderAbout, setRenderAbout] = useState(true)

  const triggerInvokedFromParent = () => {
    setRenderAbout(!renderAbout);
  };

  useEffect(() => {
    triggerInvokedFromParent();
  }, [props.trigger]);
  
  const numberOfBars =100;
  const bars = Array.from({ length: numberOfBars }, (_, index) => ({
    id: index,
  }));

  return (
    <>
    <div className='rdivs-container absolute flex flex-wrap-reverse bottom-0 h-64 w-screen '>
      {bars.map((bar) => (
        <div key={bar.id} className={`bar w-1/100 h-0 inline-block shadow-lg shadow-black z-20`}></div>
      ))}
      {renderAbout && 
      <div className='about absolute w-full h-80 z-10 bg-white text-black'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque beatae eum, porro exercitationem deleniti excepturi fuga unde aliquam libero reiciendis expedita mollitia maxime maiores, ipsum consectetur, magni officia tenetur sapiente.
        </div>}
    </div>
        
    </>
  );
};

export default RandomColorDivs;