// COMPONENTES
import React from 'react';
import Suits from './suits';

// CSS
import './styleHeader.css';

function Header() {
  return (

    <div className="header_content">
      <div className="header_tittle">
        <Suits />
        <h1>Choose the Game</h1>
        <Suits />
      </div>

    </div>

  );
}

export default Header;
