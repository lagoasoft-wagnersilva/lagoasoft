// COMPONENTES
import React from 'react';
import Suits from './suits';

// CSS
import './styleHeader.css';

function Header() {
  return (
    <div className=" flex justify-center rouded w-full">
      <div className="bg-cyan-50 p-1 rounded flex justify-center items-center flex-row space-x-10 w-ful max-w-2xl min-w-576 min-w-min h-16 min-h-full">
        <div><Suits className="" /></div>
        <div><h1 className=" text-black font-bold whitespace-nowrap">21 GAME</h1></div>
        <div><Suits /></div>
      </div>
    </div>

  );
}

export default Header;
