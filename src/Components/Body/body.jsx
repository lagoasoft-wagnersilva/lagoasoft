import React from 'react';
import './styleBody.css';

export default function Game() {
  return (
    <div className="game_content">
      <div>
        <button className="startGame_btn" type="submit" aria-label="ola mundo">Start Game</button>
      </div>
      <div className="cardGame_content">
        <h1>o jogo vai rodar aqui</h1>
      </div>
    </div>
  );
}
