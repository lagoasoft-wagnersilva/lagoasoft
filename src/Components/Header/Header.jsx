// COMPONENTES
import React from 'react';
import Suits from './suits';

// CSS
import './styleHeader.css';

function Header() {
  return (
    <div className="header_content">
      <div className="header_tittle">
        <div><Suits /></div>
        <div><h1>21 Game</h1></div>
        <div><Suits /></div>
      </div>
    </div>

  );
}

export default Header;
