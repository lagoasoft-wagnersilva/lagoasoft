import React from 'react';

import Header from './Components/Header/Header';
import Game from './Components/Body/body';

// CSS
import './styleApp.css';
import Global from './Components/Global/globalCss'; // Global CSS componente

export default function App() {
  return (
    <div className="main_box">
      <div className="gameScreen_1">
        <Global />
        <Header />
      </div>
      <div className="gameScreen_2">
        <Game />
      </div>
    </div>

  );
}
